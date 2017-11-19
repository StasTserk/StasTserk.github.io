var controller = new CombatController();
var koboldController = angular.module('koboldController', []);

koboldController.controller('KoboldController', function($scope) {
    $scope.targetAc = 11;
    $scope.targetHp = 8;
    $scope.attackBonus = 8;
    $scope.damageBonus = "1d6+4";
    $scope.criticalHitDamage = "1d6+0";
    $scope.attacksPerRound = 2;
    $scope.roundsToSim = 10000;

    $scope.simulator = controller;

    $scope.runSimulation = function () {
        controller.targetAc = $scope.targetAc;
        controller.targetHp = $scope.targetHp;
        controller.attackBonus = $scope.attackBonus;
        controller.attacksPerRound = $scope.attacksPerRound;
        controller.roundsToSim = $scope.roundsToSim;

        if (controller.parseDamageString($scope.damageBonus)) {
            controller.runSim();
        }
    }
});