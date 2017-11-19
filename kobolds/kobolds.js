var controller = new CombatController();
var koboldController = angular.module('koboldController', []);

koboldController.controller('KoboldController', function($scope) {
    $scope.targetAc = 12;
    $scope.targetHp = 5;
    $scope.player1 = new Player();
    $scope.player2 = new Player();
    $scope.roundsToSim = 10000;

    $scope.controller1 = new CombatController();
    $scope.controller2 = new CombatController();

    $scope.runSimulation = function () {
        $scope.controller1.targetAc = $scope.targetAc;
        $scope.controller1.targetHp = $scope.targetHp;
        $scope.controller1.roundsToSim = $scope.roundsToSim;

        $scope.controller2.targetAc = $scope.targetAc;
        $scope.controller2.targetHp = $scope.targetHp;
        $scope.controller2.roundsToSim = $scope.roundsToSim;
        
        if (loadPlayerStats($scope.player1, $scope.controller1) &&
            loadPlayerStats($scope.player2, $scope.controller2)) {
            $scope.controller1.runSim();
            $scope.controller2.runSim();
        }
    }
});

function loadPlayerStats(player, controller)
{
    controller.attackBonus = player.attackBonus;
    controller.attacksPerRound = player.attacksPerRound;

    return controller.parseDamageString(player.damage) &&
        controller.parseCritString(player.criticalHitDamage);
}