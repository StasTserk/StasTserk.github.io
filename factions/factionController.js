"use strict";

var factionController = angular.module('factionController', []);

factionController.controller('FactionController', function($scope) {
    
    $scope.factions = [ faction1, faction2, faction3 ];
    $scope.eventLog = [];

    // ===============================================================
    //         faction contested roll functionality
    $scope.contestData = new ContestPopupViewmodel();
    $scope.openContestPopup = function () {
        $scope.contestData.clear();
        $scope.contestData.open();

    };

    $scope.closeContestPopup = function () {
        $scope.contestData.close();
    };

    $scope.updateAttackerFeatures = function () {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.attacker );
        
        if (newFaction) {
            $scope.contestData.attackerFeatures = newFaction.features;
        }
        else {
            $scope.contestData.attackerFeatures = [];
        }
    };

    $scope.updateDefenderFeatures = function() {
        const newFaction = $scope.factions.find(faction => 
            faction === $scope.contestData.defender );
        
        if (newFaction) {
            $scope.contestData.defenderFeatures = newFaction.features;
        }
        else {
            $scope.contestData.defenderFeatures = [];
        }
    };

    $scope.doContest = function() {
        var result = $scope.contestData.doContest();
        console.log(result);
        this.eventLog.push(result);
        $scope.closeContestPopup();
    };

    // ===============================================================
    //          new faction related functionality
    $scope.newFactionData = new NewFactionPopupViewmodel();
    $scope.openNewFactionPopup = function () {
        $scope.newFactionData.open();
        $scope.newFactionData.clear();
        $scope.newFactionData.onAccept = function () {
            var faction = $scope.newFactionData.submit();
            $scope.factions.push(faction);
            $scope.closeNewFactionPopup();
        };
    };
    
    $scope.closeNewFactionPopup = function () {
        $scope.newFactionData.close();
    };
    $scope.acceptNewFactionPopup = function () {
        $scope.newFactionData.onAccept();
    };
    /**
     * @param {Faction} f faction to edit
     */
    $scope.editFaction = function(f) {
        const d = $scope.newFactionData;
        const index = $scope.factions.indexOf(f);
        d.name = f.name;
        d.power = f.power;
        d.description = f.description;
        d.dominion = f.dominion;
        d.problems = f.problems;
        d.features = f.features;
        d.cohesion = f.cohesion;

        d.emblemClass = f.emblemClass;
        d.emblemColour = f.emblemColour;
        d.symbolClass = f.symbolClass;
        d.symbolColour = f.symbolColour;

        d.acceptLabel = "Update Faction";
        $scope.newFactionData.open();
        d.onAccept = function () {
            $scope.factions[index] = d.submit();
            $scope.newFactionData.close();
        };
    };

    // ===========================================================
    //          faction turn functionality
    $scope.factionTurnPopup = $("#turnModal");
    $scope.factionTurnData = new FactionTurnViewModel();

    $scope.openFactionTurnPopup = function () {
        $scope.factionTurnData.clear();
        $scope.factionTurnData.open();
    };

    $scope.closeFactionTurnPopup = function() {
        $scope.factionTurnData.close();
    };

    $scope.startFactionTurn = function() {
        $("#turnModal").css("display", "none");
        $scope.factionTurnData.startFactionTurn();
    };


    // ============================================================
    //            faction turn action delegates
    $scope.internalActions = [
        {
            name: "Restore Cohesion", 
            action: function () {
                console.log("Restoring Cohesion");
                const faction = $scope.factionTurnData.faction;
                const cost = Math.pow(2, faction.power);
                if (faction.dominion < cost) {
                    $scope.messageTitle = "Not enough dominion to restore cohesion!";
                    $scope.messageBody = faction.name + " only has " + faction.dominion
                        + " dominion but the action would require " + cost;
                    $("#messageModal").css("display", "block");
                    $scope.onMessageAccept =
                        $scope.factionTurnData.doNextAction.bind($scope.factionTurnData);
                } else {
                    faction.dominion -= cost;
                    const roll = faction.getRoll();
                    if (faction.trouble < roll) {
                        faction.cohesion ++;
                        if (faction.cohesion > faction.cohesionMax) {
                            faction.cohesion = faction.cohesionMax;
                        }
                        $scope.log(faction.name + " tries to restore cohesion.",
                            "They roll " + roll + " with a trouble score of " + faction.trouble
                            + " and succeed.");
                    }
                    else {
                        $scope.log(faction.name + " tries to restore cohesion.",
                            "They roll " + roll + " with a trouble score of " + faction.trouble
                            + " and fail.");
                    }
                    $scope.factionTurnData.doNextAction();
                }
            }
        },
        {
            name: "Build Strength",
            action: function () {
                console.log("Creating Dominion");
                const faction = $scope.factionTurnData.faction;
                const roll = faction.getRoll();
                $scope.messageTitle = "Build Strength Outcome";
                $scope.onMessageAccept = $scope.factionTurnData.doNextAction.bind($scope.factionTurnData);
                if (roll > faction.trouble) {
                    faction.dominion += Math.ceil(faction.power / 2);
                    $scope.messageBody = "Dominion successfuly generated!\nRolled " + roll + " with trouble at " + faction.trouble;
                    $("#messageModal").css("display", "block");
                    $scope.log(faction.name + " successfully generated dominion",
                        "they rolled " + roll + " with a trouble score of " + faction.trouble);
                } else {
                    $scope.messageBody = "Dominion generation Failed!";
                    $("#messageModal").css("display", "block");
                    $scope.log(faction.name + " failed to generate dominion!",
                        "They rolled " + roll + " with a trouble score of " + faction.trouble);
                }
            }
        },
        {
            name: "Enact Change (New feature)",
            action: function () {
                console.log("Making new feature");
                $scope.newFeatureCost = 0;
                $scope.newFeatureName = "";
                $scope.newProblemName = "";
                $scope.addFeatureAccept = $scope.factionTurnData.doNextAction.bind($scope.factionTurnData);
                $("#newFeatureModal").css("display", "block");
            }
        },
        {
            name: "Enact Change (Solve Problem)",
            action: function () {
                console.log("Solving problem");
                $scope.targetProblem = "";
                $scope.onFixProblem = function () {
                    const faction = $scope.factionTurnData.faction;
                    const roll = faction.getRoll();
                    if (roll <= faction.trouble) {
                        // problem is reduced
                        $scope.log(faction.name + " attempts to reduce their trouble.",
                            "They target " + $scope.targetProblem.text,
                            "The roll of " + roll + " comapred to their trouble of " + faction.trouble
                            + " results in success!");
                        faction.reduceProblem($scope.targetProblem);

                    } else {
                        $scope.log(faction.name + " attempts to reduce their trouble.",
                        "They target " + $scope.targetProblem.text,
                        "The roll of " + roll + " comapred to their trouble of " + faction.trouble
                        + " results in failure!");
                    }

                    $scope.factionTurnData.doNextAction();
                };
                $('#solveProblemModal').css('display', 'block');
                
            }
        }
    ];

    $scope.externalActions = [
        {
            name: "Aid an Ally",
            action: function () {
                console.log("Helping an Ally");
                $scope.helpAllyDominion = 0;
                $scope.helpAllyTarget = {};
                $scope.onHelpAlly = $scope.factionTurnData.doNextAction.bind($scope.factionTurnData);
                $("#helpAllyModal").css("display", "block");
            }
        },
        {
            name: "Attack Rival",
            action: function () {
                console.log("Attacking rival");
                $scope.factionTurnData.doNextAction();
            }
        },
        {
            name: "Extend Interest",
            action: function () {
                console.log("Extending Interest");
                $scope.factionTurnData.doNextAction();
            }
        },
        {
            name: "Remove Interest",
            action: function () {
                console.log("Removing Interest");
                $scope.factionTurnData.doNextAction();
            }
        },
    ];

    $scope.onMessageAccept = function () { };
    $scope.messageTitle = "Message Form";
    $scope.messageBody = "Message Body";
    $scope.dismissMessage = function () {
        $("#messageModal").css("display", "none");
        $scope.onMessageAccept();
    };

    $scope.onHelpAlly = function() {};
    $scope.helpAllyDominion = 0;
    $scope.helpAllyTarget = {};
    $scope.helpAlly = function () {
        var faction = $scope.factionTurnData.faction;
        var roll = faction.getRoll();
        if (faction.dominion < $scope.helpAllyDominion) {
            $scope.messageTitle = "Invalid action!";
            $scope.messageBody = "Faction posesses only " + faction.dominion + " dominion, while the help costs " + $scope.helpAllyDominion;
            $scope.onMessageAccept = function () { };
            $("#messageModal").css("display", "block");
            return;
        }
        faction.dominion -= $scope.helpAllyDominion;
        if (roll > faction.trouble) {
            $scope.log(faction.name + " sends aid to " + $scope.helpAllyTarget.name,
                "They roll " + roll + " with a trouble score of " + faction.trouble,
                $scope.helpAllyDominion + " dominion is transferred");
                $scope.helpAllyTarget.dominion += $scope.helpAllyDominion;
        } else {
            $scope.log(faction.name + " sends aid to " + $scope.helpAllyTarget.name,
                "They roll " + roll + " with a trouble score of " + faction.trouble,
                $scope.helpAllyDominion + " dominion is lost");
        }
        $("#helpAllyModal").css("display", "none");
        $scope.onHelpAlly();
    };

    $scope.onFixProblem = function () { };
    $scope.targetProblem = "";
    $scope.fixProblem = function () {
        $('#solveProblemModal').css('display', 'none');
        $scope.onFixProblem();
    };

    $scope.newFeatureName = "";
    $scope.newFeatureCost = 1;
    $scope.newProblemName = "";
    $scope.addFeatureAccept = function () {};
    $scope.addFeature = function() {
        var faction = $scope.factionTurnData.faction;
        var roll = faction.getRoll();
        if (faction.dominion < $scope.newFeatureCost) {
            $scope.messageTitle = "Invalid action!";
            $scope.messageBody = "Faction posesses only " + faction.dominion + " dominion, while the feature costs " + $scope.newFeatureCost;
            $scope.onMessageAccept = function () { };
            $("#messageModal").css("display", "block");
            return;
        }
        else if (roll <= faction.trouble) {
            $scope.log(faction.name + " attempted to create a new feature but failed.",
               "They rolled " + roll + " but the trouble score is at " + faction.trouble);
            faction.dominion -= $scope.newFeatureCost;
        }
        else if (faction.dominion >= $scope.newFeatureCost) {
            faction.features.push($scope.newFeatureName);
            faction.dominion -= $scope.newFeatureCost;
            faction.addProblem($scope.newProblemName, 1);
            $scope.log(faction.name + " successfully added a new feature.",
                "They gain the feature \"" + $scope.newFeatureName + "\"",
                "They also gain a 1 pt problem in \"" + $scope.newProblemName + "\"");
        }
        $("#newFeatureModal").css("display", "none");
        $scope.addFeatureAccept();
    }

    $scope.log = function (title, ...details) {
        $scope.eventLog.push({
            headerText: title,
            subItems: details
        });
    }
});