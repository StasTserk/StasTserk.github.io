class Result {
    /**
     * @param {number} success Number of successes, negative for failures
     * @param {number} advantage Number for advantage, negative for threat
     * @param {number} triumph Number of triumph, negative for dispair
     * @param {number} probability Probability of event.
     */
    constructor(success, advantage, triumph, probability) {
        this.success = success;
        this.advantage = advantage;
        this.triumph = triumph;
        this.probability = probability;
    }
    /**
     * Gets the dictionary label for this entry
     * @returns {string} label representing this result entry
     */
    get key() {
        let label = 'R:' + ((this.success > 0) ? 's'.repeat(this.success) : 'f'.repeat(-this.success));
        label = label + ((this.advantage > 0) ? 'a'.repeat(this.advantage) : 'r'.repeat(-this.advantage));
        label = label + ((this.triumph > 0) ? 't'.repeat(this.triumph) : 'd'.repeat(-this.triumph));
        return label;
    }
    /**
     * Returns copy of the result
     * @returns {Result} Memberwise copy of the result
     */
    get copy() {
        return new Result(this.success, this.advantage, this.triumph, this.probability);
    }
    /**
     * @returns {string} Readable label for the result
     */
    get label() {
        if (this.success === 0 && this.advantage === 0 && this.triumph === 0) {
            return "Nothing";
        }
        let label = ((this.success >= 0) ? this.success + 'Su' : (-this.success) + 'Fa');
        label = label + ' ' + ((this.advantage >= 0) ? this.advantage + 'Ad' : (-this.advantage) + 'Se');
        label = label + ' ' + ((this.triumph >= 0) ? this.triumph + 'Tr' : (-this.triumph) + 'De');
        return label;
    }
    /**
     * Combines the outcome and probability of two results.
     * @param {Result} result Result to combine with this one
     * @returns {Result} New result with modified success/advantage and combined probabilities
     */
    combine(result) {
        return new Result(this.success + result.success, this.advantage + result.advantage, this.triumph + result.triumph, this.probability * result.probability);
    }
}
class ResultRange {
    /**
     * @param {Result[]} seedRange Range to copy to seed array
     */
    constructor(seedRange = []) {
        /** @type {Result[]} */
        this.range = [];
        let r;
        for (r of seedRange) {
            this.addResult(r);
        }
    }
    /**
     * @returns {Result[]} Array of results represented by this range, minus any indexes
     */
    get results() {
        return Object.values(this.range);
    }
    /**
     * Adds a result to the range. If an existing result is already there,
     * it adds their probabilities together.
     * @param {Result} result to be added to the range.
     */
    addResult(result) {
        if (this.range[result.key]) {
            this.range[result.key].probability += result.probability;
        }
        else {
            this.range[result.key] = result.copy;
        }
    }
    /**
     * Joins this range to another given range, adding the probabilities.
     * Returns a new collection without modifying in place.
     * @param {ResultRange} newRange Range to be joined to this one.
     * @returns {ResultRange} new range after joining both probability ranges.
     */
    joinRange(newRange) {
        const joinedRange = new ResultRange(this.results);
        let r;
        for (r of newRange.results) {
            joinedRange.addResult(r);
        }
        return joinedRange;
    }
    /**
     * Transforms range by a given change in result and probability
     * @param {Result} result Result to be transformed by
     * @returns {ResultRange} New transformed range.
     */
    multiplyRange(result) {
        const transform = new ResultRange();
        let r;
        for (r of this.results) {
            transform.addResult(r.combine(result));
        }
        return transform;
    }
    /**
     * Adjusts the range of possible results by a given set of die face outcomes.
     * @param {Result[]} dieResults Set of possible results and their probabilities of a given die
     * @param {number} times Number of times to apply the result.
     * @returns {ResultRange} modified set of new possible outcomes of the dice.
     */
    multiplyByDie(dieResults, times = 1) {
        if (times <= 0) {
            return new ResultRange(this.results);
        }
        let finalRange = new ResultRange();
        let dieResult;
        for (dieResult of dieResults) {
            finalRange = finalRange.joinRange(this.multiplyRange(dieResult));
        }
        return finalRange.multiplyByDie(dieResults, times - 1);
    }
}
