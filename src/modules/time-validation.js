import { TimeValidationError } from './errors/time-validation-error';

/**
 * This class provides the data validation logic.
 */
export class TimeValidation {

    
    /**
     * Creates an instance of the time validation class
     * initialized to verify times between `startTime` and
     * `endTime` as valid working hours. The expected format
     * of these times is `HH:MM(AM|PM)`.
     * 
     * @constructor
     * @param {String} startTime 
     *  This is the minimum allowed valid starting time.
     * @param {String} endTime 
     *  This is the maximum allowed ending time.
     * @throws {@link TimeValidationError} if `startTime` is after `endTime`.
     */
    constructor(startTime, endTime) {
        if (this._isGreater())
        this._startTime = startTime;
        this._endTime = endTime;
    }

    /**
     * Returns a truthy value if `time` is correctly formatted. The expected
     * format of the time string is: `HH:MM(AM|PM)`.
     * 
     * @param {String} time The string representing a time we need to check.
     */
    _isFormatCorrect(time) {

    }

    /**
     * Compares `timeA` and `timeB` and
     * returns a truthy value if `timeA` is
     * greater than `timeB`.
     * 
     * @param {String} timeA First time to compare
     * @param {String} timeB Second time to compare
     */
    _isGreater(timeA, timeB) {

    }
}