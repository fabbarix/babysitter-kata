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
    this._payment = this.family.calculatePayment(strStart, strEnd);
  }

  get payment() { return this._payment; }

}

setWorldConstructor(ScheduleWorld);