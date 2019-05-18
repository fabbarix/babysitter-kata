/**
 * Custom error for time validation errors.
 */
export class TimeValidationError extends Error {
    
    startTime;
    endTime;

    /**
     * Creates and instance of `TimeValidationError` that will
     * be populated with the time range properties.
     * 
     * @constructor
     * @param {String} startTime Provided working hours start time
     * @param {String} endTime Provided working hours end time
     * @param {String} errorMessage Error message to be displayed
     */
    constructor(startTime, endTime, errorMessage) {
        super(errorMessage);
        this.startTime = startTime;
        this.endTime = endTime;
    }

}