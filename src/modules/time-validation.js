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
            throw new TimeValidationError(startTime, endTime, 
                `Provided working hours end time [${endTime}] is before the provided start time [${startTime}].`);
        }
    }

    /**
     * Checks if the times provided as start and end of a shift
     * are valid for the working hours setup for this {@link TimeValidation} instance.
     * 
     * @param {String} startTime Shift start time
     * @param {String} endTime Shift end time
     * @returns {boolean} `true` if the shift is correct
     * @throws TimeFormatError If either shift start or end time are not formatted.
     */
    isShiftValid(startTime, endTime) {
        let timeStart = new Time(startTime);
        if (!timeStart.isAfterStart(this._startTime)) {
            throw new TimeValidationError(startTime, endTime, 
                `Provided Start Time [${startTime}] is before shift start time [${this._startTime.strTime}].`);
        }

        let timeEnd = new Time(endTime);
        if (!timeEnd.isBeforeEnd(this._endTime)) {
            throw new TimeValidationError(startTime, endTime, 
                `Provided End Time [${endTime}] is after shift end time [${this._endTime.strTime}].`);
        }

        if (!timeEnd.isAfterStart(timeStart)) {
            throw new TimeValidationError(startTime, endTime, 
                `Provided End Time [${endTime}] is before provided start time [${startTime}].`);
        }

        return true;
    }
}