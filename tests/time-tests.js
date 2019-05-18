import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Time } from '../src/modules/time';
import { TimeFormatError } from '../src/modules/errors/time-format-error';

describe('Time', function() {
    describe('#_parseHours', function() {
        it('Should set the `hours` property to 10 when parsing `10:15AM`', function() {
            let time = new Time();
            time._parseHours('10:15AM');
            expect(time.hours).to.equal(10);
        });
        it('Should set the `hours` property to 5 when parsing `05:15AM`', function() {
            let time = new Time();
            time._parseHours('05:15AM');
            expect(time.hours).to.equal(5);
        });
        it('Should set the `hours` property to 5 when parsing `5:15AM`', function() {
            let time = new Time();
            time._parseHours('5:15AM');
            expect(time.hours).to.equal(5);
        });
        it('Should thrown an exception when parsing `a:12AM`', function() {
            let time = new Time();
            expect(() => time._parseHours('a:12AM'))
                .to.throw(TimeFormatError, 'Invalid time format: a:12AM')
                .that.has.property('providedTime').that.equals('a:12AM');
        });
        it('Should thrown an exception when parsing `12AM`', function() {
            let time = new Time();
            expect(() => time._parseHours('12AM'))
                .to.throw(TimeFormatError, 'Invalid time format: 12AM')
                .that.has.property('providedTime').that.equals('12AM');
        });
    });
    describe('#_parseMinutes', function() {
        it('Should set the `minutes` property to 54 when parsing `12:54AM`', function() {
            let time = new Time();
            time._parseMinutes('12:54AM');
            expect(time.minutes).to.equal(54);
        });
        it('Should set the `minutes` property to 4 when parsing `12:04AM`', function() {
            let time = new Time();
            time._parseMinutes('12:04AM');
            expect(time.minutes).to.equal(4);
        });
        it('Should set the `minutes` property to 4 when parsing `12:4AM`', function() {
            let time = new Time();
            time._parseMinutes('12:4AM');
            expect(time.minutes).to.equal(4);
        });
        it('Should thrown an exception when parsing `12:AM`', function() {
            let time = new Time();
            expect(() => time._parseMinutes('12:AM'))
                .to.throw(TimeFormatError, 'Invalid time format: 12:AM')
                .that.has.property('providedTime').that.equals('12:AM');
        });
        it('Should thrown an exception when parsing `12:67AM`', function() {
            let time = new Time();
            expect(() => time._parseMinutes('12:67AM'))
                .to.throw(TimeFormatError, 'Invalid time format: 12:67AM')
                .that.has.property('providedTime').that.equals('12:67AM');
        });
    });
    describe('#_parseMeridian', function() {
        it('Should set the `meridian` property to AM when parsing `12:54AM`', function() {
            let time = new Time();
            time._parseMeridian('12:54AM');
            expect(time.meridian).to.equal('AM');
        });
        it('Should set the `meridian` property to PM when parsing `12:54PM`', function() {
            let time = new Time();
            time._parseMeridian('12:54PM');
            expect(time.meridian).to.equal('PM');
        });
        it('Should set the `meridian` property to AM when parsing `12:54am`', function() {
            let time = new Time();
            time._parseMeridian('12:54AM');
            expect(time.meridian).to.equal('AM');
        });
        it('Should set the `meridian` property to PM when parsing `12:54pm`', function() {
            let time = new Time();
            time._parseMeridian('12:54PM');
            expect(time.meridian).to.equal('PM');
        });
        it('Should thrown an exception when parsing `12:00AZ`', function() {
            let time = new Time();
            expect(() => time._parseMeridian('12:00AZ'))
                .to.throw(TimeFormatError, 'Invalid time format: 12:00AZ')
                .that.has.property('providedTime').that.equals('12:00AZ');
        });
    });
    describe('#isBeforeEnd', function() {
        it('Should validate that 05:00PM comes before a 07:00PM end time', function() {
            let timeBefore = new Time('05:00PM');
            let timeAfter = new Time('07:00PM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(true);
        });
        it('Should validate that 08:00AM comes before a 10:00AM end time', function() {
            let timeBefore = new Time('08:00AM');
            let timeAfter = new Time('10:00AM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(true);
        });
        it('Should validate that 08:00PM comes before a 04:00AM end time', function() {
            let timeBefore = new Time('08:00PM');
            let timeAfter = new Time('04:00AM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(true);
        });
        it('Should validate that 05:00PM comes after a 03:00PM end time', function() {
            let timeBefore = new Time('05:00PM');
            let timeAfter = new Time('03:00PM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(false);
        });
        it('Should validate that 08:00AM comes after a 06:00AM end time', function() {
            let timeBefore = new Time('08:00AM');
            let timeAfter = new Time('06:00AM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(false);
        });
        it('Should validate that 03:00AM comes after a 11:00PM end time', function() {
            let timeBefore = new Time('03:00AM');
            let timeAfter = new Time('11:00PM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(false);
        });
    });
    describe('#isAfterStart', function() {
        it('Should validate that 05:00PM comes before a 07:00PM start time', function() {
            let timeBefore = new Time('05:00PM');
            let timeAfter = new Time('07:00PM');
            expect(timeBefore.isAfterStart(timeAfter)).to.equal(false);
        });
        it('Should validate that 08:00AM comes before a 10:00AM start time', function() {
            let timeBefore = new Time('08:00AM');
            let timeAfter = new Time('10:00AM');
            expect(timeBefore.isAfterStart(timeAfter)).to.equal(false);
        });
        it('Should validate that 08:00PM comes before a 04:00AM start time', function() {
            let timeBefore = new Time('08:00PM');
            let timeAfter = new Time('04:00AM');
            expect(timeBefore.isAfterStart(timeAfter)).to.equal(false);
        });
        it('Should validate that 05:00PM comes after a 03:00PM start time', function() {
            let timeBefore = new Time('05:00PM');
            let timeAfter = new Time('03:00PM');
            expect(timeBefore.isAfterStart(timeAfter)).to.equal(true);
        });
        it('Should validate that 08:00AM comes after a 06:00AM start time', function() {
            let timeBefore = new Time('08:00AM');
            let timeAfter = new Time('06:00AM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(true);
        });
        it('Should validate that 03:00AM comes after a 11:00PM start time', function() {
            let timeBefore = new Time('03:00AM');
            let timeAfter = new Time('11:00PM');
            expect(timeBefore.isBeforeEnd(timeAfter)).to.equal(true);
        });
    });
});
