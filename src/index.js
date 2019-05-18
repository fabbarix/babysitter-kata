import { FamilyPaymentSchedule } from './modules/family-schedule';
import { TimeValidation } from './modules/time-validation';
import { Time } from './modules/time';
import inquirer from 'inquirer';

let schedule = new TimeValidation('5:00PM', '4:00AM');

let familyA = new FamilyPaymentSchedule('Family A', 15);
familyA.addRate('11:00PM', 20);
let familyB = new FamilyPaymentSchedule('Family B', 12);
familyB.addRate('10:00PM', 8);
familyB.addRate('01:00AM', 16);
let familyC = new FamilyPaymentSchedule('Family C', 21);
familyC.addRate('09:00PM', 15);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'family',
      message: 'Which family did you work for?',
      choices: [
        { name: 'Family A', value: familyA },
        { name: 'Family B', value: familyB },
        { name: 'Family C', value: familyC }
      ]
    },
    {
        type: 'input',
        name: 'startTime',
        message: 'Time your shift started [HH:MM(AM|PM)]: ',
        validate: (value) => {
            let valid = false;
            try {
                new Time(value);
                return true;
            } catch (ex) {
                return ex.message;
            }
        }
    },
    {
        type: 'input',
        name: 'endTime',
        message: 'Time your shift ended [HH:MM(AM|PM)]: ',
        validate: (value) => {
            try {
                new Time(value);
                return true;
            } catch (ex) {
                return ex.message;
            }
        }
    },
]).then( answers => {
    console.log(`You selected:  ${answers.family._familyName}`);
    console.log(`Shift started: ${answers.startTime}`);
    console.log(`Shift ended:   ${answers.endTime}`);
    try {
        /* In hindsight this should have been called `validateShift` */
        schedule.isShiftValid(answers.startTime, answers.endTime);
        let payment = answers.family.calculatePayment(answers.startTime, answers.endTime);
        console.log(`Your payment is $${payment}`);
    } catch (ex) {
        console.log(`Could not calculate payment, invalid shift: ${ex.message}`);
    }
});

