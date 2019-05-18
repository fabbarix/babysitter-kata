import { setWorldConstructor } from  "cucumber";
import {FamilyPaymentSchedule} from '../src/modules/family-schedule';
import { Time } from '../src/modules/time';

class ScheduleWorld {

  constructor() {
  }

  createFamily(name, rate) {
      this.family = new FamilyPaymentSchedule(name, rate);
  }

  addRates(rates) {
      rates.forEach(rate => {
        this.family.addRate(rate.start, parseInt(rate.rate));    
      });
  }

  calculatePayment(strStart, strEnd) {
    let startTime = new Time(strStart);
    let endTime = new Time(strEnd);
    this._payment = startTime
        .hoursTo(endTime)
        .reduce((total, hour) => this.family.rateFor(hour) + total, 0);
  }

  get payment() { return this._payment; }

}

setWorldConstructor(ScheduleWorld);