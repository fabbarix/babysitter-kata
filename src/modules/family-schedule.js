import { Time } from "./time";

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
     * Calculates the payment for a shift provided to this
     * family.
     * 
     * @param {String} strStart Shift start time
     * @param {String} strEnd Shift end time
     */
    calculatePayment(strStart, strEnd) {
        let startTime = new Time(strStart);
        let endTime = new Time(strEnd);
        return startTime
            .hoursTo(endTime)
            .reduce((total, hour) => this.rateFor(hour) + total, 0);
    }

    /**
     * Sets a new rate for this family starting at the provided time.
     * 
     * @param {String} startingHour The hour at which this rate starts. Format `HH:MM(AM|PM)`.
     * @param {number} rate The hourly rate starting at this hour.
     * @throws {@link TimeFormatException} in case the provided format is invalid.
     */
    addRate(startingHour, rate) {
        let startTime = new Time(startingHour).euroHours;
        if (startTime<12) {
            startTime +=24;
        }
        this._extraRates.push({startTime, rate});
    }

    /**
     * Will return a rate for the hour of work at a given
     * hour of the day.
     * 
     * @param {number} hour Hour expressed in euro format (24Hrs).
     */
    rateFor(hour) {
        /* Early morning is really the next day */
        if (hour<12) {
            hour+=24;
        }
        let rate = this._defaultRate;
        if (this._extraRates.length > 0) {
            let nextRate = this._extraRates
                .reduce((prev, rate) => {
                    return hour>=rate.startTime ? rate : prev;
                } ,{startTime: 0, rate: this._defaultRate});
            rate = nextRate.rate;
        }
        return rate;
    }
}