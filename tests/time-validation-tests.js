import { expect } from 'chai';
import { describe, it } from 'mocha';
import { TimeValidation } from '../src/modules/time-validation';
import { TimeValidationError } from '../src/modules/errors/time-validation-error';

/* JSHint doesn't like Chai's oddly formed expressions. */
/* See: https://github.com/chaijs/chai/issues/41        */

/* jshint expr:true */

describe('TimeValidation', function() {
    describe('#constructor', function() {
        it('Should accept 3:00AM as a start time and 8:15AM as an end time', function() {
            let timeValidation = new TimeValidation('3:00AM', '8:15AM');
            expect(timeValidation).not.to.be.undefined;
        });
        it('Should accept 5:00PM as a start time and 4:00AM as an end time', function() {
            let timeValidation = new TimeValidation('5:00PM', '4:00AM');
            expect(timeValidation).not.to.be.undefined;
        });
        it('Should reject 5:00PM as a start time and 3:00PM as an end time', function() {
            expect(() => new TimeValidation('5:00PM', '3:00PM')).to.throw(TimeValidationError, 'Provided end time [3:00PM] is before the provided start time [5:00PM].');
        });
    });
    describe('#isShiftValid', function() {
        it('Should accept 6:12PM to 9:25PM as valid, with working hours between 5:00PM and 4:00AM', function() {
            let timeValidation = new TimeValidation('5:00PM', '4:00AM');
            expect(timeValidation.isShiftValid('6:12PM', '9:25PM')).to.be.true;
        });
        it('Should accept 6:12PM to 3:00AM as valid, with working hours between 5:00PM and 4:00AM', function() {
            let timeValidation = new TimeValidation('5:00PM', '4:00AM');
            expect(timeValidation.isShiftValid('6:12PM', '3:00PM')).to.be.true;
        });
    });
});
