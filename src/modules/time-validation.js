import { TimeValidationError } from './errors/time-validation-error';
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
        this._startTime = new Time(startTime);
        this._endTime = new Time(endTime);
        if (!this._endTime.isAfterStart(this._startTime)) {
            throw new TimeValidationError(startTime, endTime, `Provided end time [${endTime}] is before the provided start time [${startTime}].`);
        }
    }

}