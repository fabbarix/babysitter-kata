import { TimeFormatError } from './errors/time-format-error';
/**
 * This class contains the logic for the representation
 * of time.
 */
export class Time {
    
    /**
     * @constructor
     * @param {String} strTime Optional. Time representation as string. Expected format: `HH:MM(AM|PM)`
     * @throws {@link TimeFormatError} in case the string is malformed
     */
    constructor(strTime) {
        if (strTime) {
            this._parseTime(strTime);
        }
    }

    /**
     * Sets the time of this instance of {@link Time} to `strTime`.
     * @param {String} strTime The time to set this {@link Time} instance to.
     * @throws {@link TimeFormatError} in case the string is malformed
     */
    setTime(strTime) {
        this._parseTime(strTime);
    }

    /**
     * 
     * @param {Time} otherTime The time to compare against to see if we are before or after.
     */
    isBefore(otherTime) {
        return true;
    }

    /**
     * Parses `strTime` to initialize the {@link Time} instance. The
     * expected format is `HH:MM(AM|PM)`
     * 
     * @param {String} strTime The time format for parse for the hours.
     * @throws {@link TimeFormatError} if the time string is malformed.
     */
    _parseTime(strTime) {
        this._parseHours(strTime)
            ._parseMinutes(strTime)
            ._parseMeridian(strTime);
    }

    /**
     * Parses `strTime` to extract the hours component of it. The
     * expected format is `HH:MM(AM|PM)`
     * 
     * @param {String} strTime The time format for parse for the hours.
     * @returns {Time} A reference to `this` to allow chaining.
     * @throws {@link TimeFormatError} if the time string is malformed.
     */
    _parseHours(strTime) {
        let timeParts = strTime.split(':');
        if (timeParts.length != 2) {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }
        let strHours = timeParts[0];
        let numHours = -1;
        try {
            numHours = parseInt(strHours);
            /* Strings are parsed as `NaN` when no numbers are present. */
            if (isNaN(numHours)) {
                numHours = -1;
            }
        } catch (ex) {
            console.warn(`Failed to parse ${strHours} as hours.`);
        }
        if (numHours < 0 || numHours > 12) {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }
        this.hours = numHours;

        return this;
    }

    /**
     * Parses `strTime` to extract the minutes component of it. The
     * expected format is `HH:MM(AM|PM)`
     * 
     * @param {String} strTime The time format for parse for the minutes.
     * @returns {Time} A reference to `this` to allow chaining.
     * @throws {@link TimeFormatError} if the time string is malformed.
     */
    _parseMinutes(strTime) {
        let minMeridian = this._parseMinsAndMeridian(strTime);
        let strMins = minMeridian.slice(0, -2);
        let numMins = -1;
        try {
            numMins = parseInt(strMins);
            /* Strings are parsed as `NaN` when no numbers are present. */
            if (isNaN(numMins)) {
                numMins = -1;
            }
        } catch (ex) {
            console.warn(`Failed to parse ${strMins} as minutes in ${strTime}.`);
        }
        if (numMins < 0 || numMins > 59) {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }
        this.minutes = numMins;
        return this;
    }

    /**
     * Parses `strTime` to extract the meridian (AM, PM) component of it. The
     * expected format is `HH:MM(AM|PM)`
     * 
     * @param {String} strTime The time format for parse for the meridian.
     * @returns {Time} A reference to `this` to allow chaining.
     * @throws {@link TimeFormatError} if the time string is malformed.
     */
    _parseMeridian(strTime) {
        let minMeridian = this._parseMinsAndMeridian(strTime);
        let meridian = minMeridian.substr(-2).toLocaleUpperCase();
        if (meridian != 'AM' && meridian != 'PM') {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }
        this.meridian = meridian;
        return this;
    }

    /**
     * Parses `strTime` to extract the minutes and the meridian (AM, PM) 
     * component of it. The expected format is `HH:MM(AM|PM)`
     * 
     * @param {String} strTime The time format for parse for the minutes and meridian.
     * @returns {String} The minutes and meridian string extracted from the time.
     * @throws {@link TimeFormatError} if the time string is malformed.
     */
    _parseMinsAndMeridian(strTime) {
        let timeParts = strTime.split(':');

        /*
         * At least two parts should be present when splitting a valid time
         * `HH:MM(AM|PM)` on the `:`.
         * 
         */
        if (timeParts.length != 2) {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }

        let minMeridian = timeParts[1];

        /*
         * The second part of the time should be at least 3 chars long - `N(AM|PM)`
         * and at most 4 - `NN(AM|PM)`.
         * 
         */
        if (minMeridian.length<3 || minMeridian.length>4) {
            throw new TimeFormatError(strTime, `Invalid time format: ${strTime}`);
        }

        return minMeridian;
    }
}