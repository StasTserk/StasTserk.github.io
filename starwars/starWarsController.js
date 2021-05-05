var Result = /** @class */ (function () {
    /**
     * @param {number} success Number of successes, negative for failures
     * @param {number} advantage Number for advantage, negative for threat
     * @param {number} triumph Number of triumph, negative for dispair
     * @param {number} probability Probability of event.
     */
    function Result(success, advantage, triumph, probability) {
        this.success = success;
        this.advantage = advantage;
        this.triumph = triumph;
        this.probability = probability;
    }
    Object.defineProperty(Result.prototype, "key", {
        /**
         * Gets the dictionary label for this entry
         * @returns {string} label representing this result entry
         */
        get: function () {
            var label = 'R:' + ((this.success > 0) ? 's'.repeat(this.success) : 'f'.repeat(-this.success));
            label = label + ((this.advantage > 0) ? 'a'.repeat(this.advantage) : 'r'.repeat(-this.advantage));
            label = label + ((this.triumph > 0) ? 't'.repeat(this.triumph) : 'd'.repeat(-this.triumph));
            return label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "copy", {
        /**
         * Returns copy of the result
         * @returns {Result} Memberwise copy of the result
         */
        get: function () {
            return new Result(this.success, this.advantage, this.triumph, this.probability);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "label", {
        /**
         * @returns {string} Readable label for the result
         */
        get: function () {
            if (this.success === 0 && this.advantage === 0 && this.triumph === 0) {
                return "Nothing";
            }
            var label = ((this.success >= 0) ? this.success + 'Su' : (-this.success) + 'Fa');
            label = label + ' ' + ((this.advantage >= 0) ? this.advantage + 'Ad' : (-this.advantage) + 'Se');
            label = label + ' ' + ((this.triumph >= 0) ? this.triumph + 'Tr' : (-this.triumph) + 'De');
            return label;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Combines the outcome and probability of two results.
     * @param {Result} result Result to combine with this one
     * @returns {Result} New result with modified success/advantage and combined probabilities
     */
    Result.prototype.combine = function (result) {
        return new Result(this.success + result.success, this.advantage + result.advantage, this.triumph + result.triumph, this.probability * result.probability);
    };
    return Result;
}());
var ResultRange = /** @class */ (function () {
    /**
     * @param {Result[]} seedRange Range to copy to seed array
     */
    function ResultRange(seedRange) {
        if (seedRange === void 0) { seedRange = []; }
        /** @type {Result[]} */
        this.range = [];
        var r;
        for (var _i = 0, seedRange_1 = seedRange; _i < seedRange_1.length; _i++) {
            r = seedRange_1[_i];
            this.addResult(r);
        }
    }
    Object.defineProperty(ResultRange.prototype, "results", {
        /**
         * @returns {Result[]} Array of results represented by this range, minus any indexes
         */
        get: function () {
            return Object.values(this.range);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a result to the range. If an existing result is already there,
     * it adds their probabilities together.
     * @param {Result} result to be added to the range.
     */
    ResultRange.prototype.addResult = function (result) {
        if (this.range[result.key]) {
            this.range[result.key].probability += result.probability;
        }
        else {
            this.range[result.key] = result.copy;
        }
    };
    /**
     * Joins this range to another given range, adding the probabilities.
     * Returns a new collection without modifying in place.
     * @param {ResultRange} newRange Range to be joined to this one.
     * @returns {ResultRange} new range after joining both probability ranges.
     */
    ResultRange.prototype.joinRange = function (newRange) {
        var joinedRange = new ResultRange(this.results);
        var r;
        for (var _i = 0, _a = newRange.results; _i < _a.length; _i++) {
            r = _a[_i];
            joinedRange.addResult(r);
        }
        return joinedRange;
    };
    /**
     * Transforms range by a given change in result and probability
     * @param {Result} result Result to be transformed by
     * @returns {ResultRange} New transformed range.
     */
    ResultRange.prototype.multiplyRange = function (result) {
        var transform = new ResultRange();
        var r;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            r = _a[_i];
            transform.addResult(r.combine(result));
        }
        return transform;
    };
    /**
     * Adjusts the range of possible results by a given set of die face outcomes.
     * @param {Result[]} dieResults Set of possible results and their probabilities of a given die
     * @param {number} times Number of times to apply the result.
     * @returns {ResultRange} modified set of new possible outcomes of the dice.
     */
    ResultRange.prototype.multiplyByDie = function (dieResults, times) {
        if (times === void 0) { times = 1; }
        if (times <= 0) {
            return new ResultRange(this.results);
        }
        var finalRange = new ResultRange();
        var dieResult;
        for (var _i = 0, dieResults_1 = dieResults; _i < dieResults_1.length; _i++) {
            dieResult = dieResults_1[_i];
            finalRange = finalRange.joinRange(this.multiplyRange(dieResult));
        }
        return finalRange.multiplyByDie(dieResults, times - 1);
    };
    return ResultRange;
}());
