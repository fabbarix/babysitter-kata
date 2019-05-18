import { TimeValidationError } from './errors/time-validation-error';
import { TimeFormatError } from './errors/time-format-error';
import { Time } from './time';

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
     * @throws {@link TimeFormatError} if `startTime` or `endTime` are not properly formatted.
     * @throws {@link TimeValidationError} if `startTime` is after `endTime`.
     */
    constructor(startTime, endTime) {
        if (this._isGreater())
        this._startTime = new Time(startTime);
        this._endTime = new Time(endTime);
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