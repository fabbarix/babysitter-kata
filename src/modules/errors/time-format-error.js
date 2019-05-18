/**
 * Custom error for time format errors.
 */
export class TimeFormatError extends Error {
    
    /**
     * Creates and instance of `TimeFormatError` that will
     * be populated with the provided invalid time.
     * 
     * @constructor
     * @param {String} providedTime Provided time that has the wrong format
     * @param {String} errorMessage Error message to be displayed
     */
    constructor(providedTime, errorMessage) {
        super(errorMessage);
        this.providedTime = providedTime;
    }

}