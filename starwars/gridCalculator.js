class ResultGrid {
    /**
     * @param {Result[]} range
     */
    constructor(range) {
        this.range = range;
        this.maxProbability = 0.0;
        this.maxSuccess = 0;
        this.minSuccess = 0;
        this.maxAdvantage = 0;
        this.minAdvantage = 0;
        this.calculateParameters(range);
        this.gridResult = this.createResultArray();
        let i, x, y, roll;
        var maxX = this.maxSuccess - this.minSuccess;
        var maxY = this.maxAdvantage - this.minAdvantage;
        for (i in range) {
            roll = range[i];
            x = maxX - (roll.success - this.minSuccess);
            y = maxY - (roll.advantage - this.minAdvantage);
            console.log(x);
            this.gridResult[x][y] += roll.probability;
            if (this.gridResult[x][y] > this.maxProbability) {
                this.maxProbability = this.gridResult[x][y];
            }
        }
        this.convertResultToColour();
        return true;
    }
    convertResultToColour() {
        var x = this.maxSuccess - this.minSuccess + 1;
        var y = this.maxAdvantage - this.minAdvantage + 1;
        let i, j, p, rgbNumber, rgbString;
        for (i = 0; i < x; i++) {
            for (j = 0; j < y; j++) {
                p = this.gridResult[i][j] / this.maxProbability;
                rgbNumber = Math.floor(p * 255).toString(16);
                rgbString = i - this.maxSuccess < 0 ? "#00" + pad(rgbNumber, 2, '0') + "00" : "#" + pad(rgbNumber, 2, '0') + "0000";
                this.gridResult[i][j] = rgbString;
            }
        }
    }
    createResultArray() {
        var x = this.maxSuccess - this.minSuccess + 1;
        var y = this.maxAdvantage - this.minAdvantage + 1;
        var array = Array(x);
        for (var i = 0; i < x; i++) {
            array[i] = Array(y).fill(0);
        }
        return array;
    }
    calculateParameters(range) {
        var maxS = 0, minS = 0, maxV = 0, minV = 0;
        let i;
        for (i in range) {
            if (maxS < range[i].success) {
                maxS = range[i].success;
            }
            else if (minS > range[i].success) {
                minS = range[i].success;
            }
            if (maxV < range[i].advantage) {
                maxV = range[i].advantage;
            }
            if (minV > range[i].advantage) {
                minV = range[i].advantage;
            }
        }
        this.maxSuccess = maxS;
        this.minSuccess = minS;
        this.maxAdvantage = maxV;
        this.minAdvantage = minV;
    }
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
