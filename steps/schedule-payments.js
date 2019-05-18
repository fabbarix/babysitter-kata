import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

Given('that {string} has a default rate of ${int}', function (familyName, rate) {
    this.createFamily(familyName, rate);
});

Given('the following other rates:', function (familyRates) {
    this.addRates(familyRates.hashes());
});

Given('the babysitter works from {string} to {string}', function (strStart, strEnd) {
    this.calculatePayment(strStart, strEnd);
});

When('the babysitter calculates the payments', function () {
});

Then('I expect the payment to be {string}', function (payment) {
    expect(eval(payment)).to.equal(this.payment);
});
