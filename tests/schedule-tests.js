import { expect } from 'chai';
import { describe, it } from 'mocha';
import { FamilyPaymentSchedule } from '../src/modules/family-schedule';

/* JSHint doesn't like Chai's oddly formed expressions. */
/* See: https://github.com/chaijs/chai/issues/41        */

/* jshint expr:true */

describe('FamilyPaymentSchedule', function() {
    describe('#rateFor', function() {
        /**
         * Setup the schedules for the families from the specs.
         */
        let familyA = new FamilyPaymentSchedule('Family A', 15);
        familyA.addRate('11:00PM', 20);
        let familyB = new FamilyPaymentSchedule('Family B', 12);
        familyB.addRate('10:00PM', 8);
        familyB.addRate('01:00AM', 16);
        let familyC = new FamilyPaymentSchedule('Family C', 21);
        familyC.addRate('09:00PM', 15);

        /**
         * Extra family - edge case test
         */
        let familyD = new FamilyPaymentSchedule('Family D', 20);
        familyD.addRate('01:00AM', 25);

        /**
         * Test the specs
         */
        it('Should return a rate of $15 for Family A at 7PM', function() {
            expect(familyA.rateFor(19)).to.equal(15);
        });
        it('Should return a rate of $20 for Family A at 11PM', function() {
            expect(familyA.rateFor(23)).to.equal(20);
        });
        it('Should return a rate of $20 for Family A at 12AM', function() {
            expect(familyA.rateFor(0)).to.equal(20);
        });
        it('Should return a rate of $12 for Family B at 7PM', function() {
            expect(familyB.rateFor(19)).to.equal(12);
        });
        it('Should return a rate of $8 for Family B at 11PM', function() {
            expect(familyB.rateFor(23)).to.equal(8);
        });
        it('Should return a rate of $16 for Family B at 03AM', function() {
            expect(familyB.rateFor(3)).to.equal(16);
        });
        it('Should return a rate of $21 for Family C at 8PM', function() {
            expect(familyC.rateFor(20)).to.equal(21);
        });
        it('Should return a rate of $15 for Family C at 9PM', function() {
            expect(familyC.rateFor(21)).to.equal(15);
        });
        it('Should return a rate of $15 for Family C at 2AM', function() {
            expect(familyC.rateFor(2)).to.equal(15);
        });
        it('Should return a rate of $20 for Family D at 12AM', function() {
            expect(familyD.rateFor(0)).to.equal(20);
        });
        it('Should return a rate of $25 for Family D at 1AM', function() {
            expect(familyD.rateFor(1)).to.equal(25);
        });
    });
});