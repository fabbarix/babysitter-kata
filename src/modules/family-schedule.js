/**
 * This class handles the payment schedule for a
 * family.
 */
export class FamilyPaymentSchedule {

    /**
     * Create an instance of a family schedule.
     * 
     * @param {String} familyName The name of the family
     * @param {number} defaultRate The default rate for this family
     */
    constructor(familyName, defaultRate) {
        this._familyName = familyName;
        this._defaultRate = defaultRate;
        this._extraRates = [];
    }

    /**
     * Sets a new rate for this family starting at the provided time.
     * 
     * @param {String} startingHour The hour at which this rate starts. Format `HH:MM(AM|PM)`.
     * @param {number} rate The hourly rate starting at this hour.
     * @throws {@link TimeFormatException} in case the provided format is invalid.
     */
    addRate(startingHour, rate) {

    }

    /**
     * Will return a rate for the hour of work at a given
     * hour of the day.
     * 
     * @param {number} hour Hour expressed in euro format (24Hrs).
     */
    rateFor(hour) {
        return 0;
    }
}