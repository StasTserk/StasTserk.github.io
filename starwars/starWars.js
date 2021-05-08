var starWarsController = angular.module('starWarsController', []);
const yellow = [
    new Result(0, 0, 0, 1 / 12),
    new Result(1, 0, 0, 1 / 6),
    new Result(2, 0, 0, 1 / 6),
    new Result(0, 1, 0, 1 / 12),
    new Result(1, 1, 0, 1 / 4),
    new Result(0, 2, 0, 1 / 6),
    new Result(1, 0, 1, 1 / 12)
];
const red = [
    new Result(0, 0, 0, 1 / 12),
    new Result(-1, 0, 0, 1 / 6),
    new Result(-2, 0, 0, 1 / 6),
    new Result(0, -1, 0, 1 / 6),
    new Result(-1, -1, 0, 1 / 6),
    new Result(0, -2, 0, 1 / 6),
    new Result(-1, 0, -1, 1 / 12)
];
const green = [
    new Result(0, 0, 0, .125),
    new Result(1, 0, 0, .25),
    new Result(2, 0, 0, .125),
    new Result(0, 1, 0, .25),
    new Result(1, 1, 0, .125),
    new Result(0, 2, 0, .125),
];
const purple = [
    new Result(0, 0, 0, .125),
    new Result(-1, 0, 0, .125),
    new Result(-2, 0, 0, .125),
    new Result(0, -1, 0, .375),
    new Result(-1, -1, 0, .125),
    new Result(0, -2, 0, .125),
];
const blue = [
    new Result(0, 0, 0, 1 / 3),
    new Result(1, 0, 0, 1 / 6),
    new Result(0, 1, 0, 1 / 6),
    new Result(1, 1, 0, 1 / 6),
    new Result(0, 2, 0, 1 / 6),
];
const black = [
    new Result(0, 0, 0, 1 / 3),
    new Result(-1, 0, 0, 1 / 3),
    new Result(0, -1, 0, 1 / 3)
];
starWarsController.controller('StarWarsController', function ($scope) {
    $scope.yellow = 1;
    $scope.purple = 2;
    $scope.green = 2;
    $scope.black = 0;
    $scope.blue = 1;
    $scope.red = 0;
    $scope.trigger = 2;
    $scope.success = 0;
    $scope.abilityTriggered = 0;
    $scope.results = [];
    $scope.avgSuccess = 0;
    $scope.avgSuccessAdv = 0;
    $scope.gridResult = [];
    $scope.advLabel = 0;
    $scope.maxAdvantage = 0;
    $scope.bonusSuccesses = 0;
    $scope.bonusAdvantages = 0;
    $scope.calculate = function () {
        const resultRange = new ResultRange([new Result($scope.bonusSuccesses, $scope.bonusAdvantages, 0, 1.0)]);
        let final = resultRange.multiplyByDie(yellow, $scope.yellow);
        final = final.multiplyByDie(green, $scope.green);
        final = final.multiplyByDie(blue, $scope.blue);
        final = final.multiplyByDie(red, $scope.red);
        final = final.multiplyByDie(purple, $scope.purple);
        final = final.multiplyByDie(black, $scope.black);
        let r;
        $scope.success = 0;
        $scope.abilityTriggered = 0;
        $scope.avgSuccess = 0;
        $scope.avgSuccessAdv = 0;
        for (r of final.results) {
            $scope.avgSuccess += r.success * r.probability;
            if (r.success > 0) {
                $scope.success += r.probability * 100;
                $scope.avgSuccessAdv += r.advantage * r.probability;
            }
        }
        if ($scope.success !== 0) {
            $scope.avgSuccessAdv /= ($scope.success / 100);
        }
        $scope.results = final.results.sort(function (a, b) {
            if (a.success !== b.success) {
                return b.success - a.success;
            }
            if (a.advantage !== b.advantage) {
                return b.advantage - a.advantage;
            }
            return b.triumph - a.triumph;
        });
        $scope.calculateTrigger();
    };
    $scope.calculateTrigger = function () {
        let triggerProb = 0;
        for (r of $scope.results) {
            if (r.success > 0 && r.advantage >= $scope.trigger || (r.triumph > 0)) {
                triggerProb += r.probability * 100;
            }
        }
        $scope.abilityTriggered = triggerProb;
        var result = new ResultGrid(this.results);
        $scope.advLabel = Array(result.maxAdvantage - result.minAdvantage + 1).fill(result.maxAdvantage);
        $scope.maxSuccess = result.maxSuccess;
        this.gridResult = result.gridResult;
    };
});
