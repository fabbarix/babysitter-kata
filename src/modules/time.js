import { TimeFormatError } from './errors/time-format-error';
/**
 * This class contains the logic for the representation
 * of time.
 */
export class Time {
    
    get strTime() {
        return `${`0${this.hours}`.slice(-2)}:${`0${this.minutes}`.slice(-2)}${this.meridian}`;
    }

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
     * Compare our instance of {@link Time} to `endTime` to see we are before
     * the other time, assuming the other time is a `check-out` time for the
     * babysitter.
     * 
     * @param {Time} endTime The shift end time to compare against.
     * @returns {Boolean} `true` if we are before the provided shift `endTime`.
     */
    isBeforeEnd(endTime) {
        /**
         * A bit of logic here: this is made to compare times across a 24 hours period,
         * assumtion is that a babysitter will not work more than 24 hours in a row.
         * 
         * If we are an `AM` time we are before the end time if that time is a `PM`
         * time value or if we are `<` the other `AM` time.
         *  IE: 
         *     - `10:00AM` is always before an end time of `12:00PM-11:59PM`
         *     - `10:00AM` is always after an end time of `12:00AM-09:59AM`
         *     - `10:00AM` is always before an end time of `10:01AM-11:59AM`
         * 
         * If we are a `PM` time we are before the end time if that time is a `AM`
         * time value or if we are `<` the other `PM` time.
         *  IE: 
         *     - `10:00PM` is always before an end time of `12:00AM-11:59AM`
         *     - `10:00PM` is always after an end time of `12:00PM-09:59PM`
         *     - `10:00PM` is always before an end time of `10:01PM-11:59PM`
         */
        if (this.isAM() && endTime.isAM() || this.isPM() && endTime.isPM() ) {
            return this._numValue() < endTime._numValue();
        }
        if (this.isAM() && endTime.isPM()) {
            return false;
        }
        return true;
    }

    /**
     * Compare our instance of {@link Time} to `startTime` to see we are after
     * the other time, assuming the other time is a `check-in` time for the
     * babysitter.
     * 
     * @param {Time} startTime The shift start time to compare against.
     * @returns {Boolean} `true` if we are after the provided shift `startTime`.
     */
    isAfterStart(startTime) {
        /**
         * Same assumptions, but the reverse of the logic applied above is applied in this case.
         */
        if (this.isAM() && startTime.isAM() || this.isPM() && startTime.isPM() ) {
            return this._numValue() > startTime._numValue();
        }
        if (this.isAM() && startTime.isPM()) {
            return true;
        }
        return false;
    }

    /**
     * Returns a numeric value for this instance of {@link Time}.
     * 
     * @returns {number} A numeric value for this {@link Time} instance.
     */
    _numValue() {
        return parseInt(`${this.hours}${this.minutes}`);
    }

    /**
     * Returns true is this instance of {@link Time} is PM.
     * 
     * @returns {boolean} True is this instance of {@link Time} is PM.
     */
    isPM() {
        return this.meridian == 'PM';
    }

    /**
     * Returns true is this instance of {@link Time} is AM.
     * 
     * @returns {boolean} True is this instance of {@link Time} is AM.
     */
    isAM() {
        return !this.isPM();
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