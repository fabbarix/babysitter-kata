Feature: Time validation
  In order to prevent the babysitter from entering
  invalid working hours these need to be validated.

# Happy path
  Scenario: Regular hours
    Given a starting time of <start>
    And an end time of <end>
    When I run the validation
    Then I expect the hours to be valid

      | start     | end     |
      | 5:00PM    | 4:00AM  |
      | 5:30PM    | 3:00AM  |
      | 8:45PM    | 11:00PM |

# Bad formatting
  Scenario: Badly formatted hours
    Given a wrongly formatted start time of <start>
    And a correctly formatted end time of <end>
    When I run the validation
    Then I expect the hours to be rejected with <message>

      | start      | end      | message |
      | 27:00PM    | 6:00PM   | The start time 27:00PM is not in the correct format  |
      | ag:103PM   | 6:00PM   | The start time ag:103PM is not in the correct format |
      | :00AM      | 6:00PM   | The start time :00AM is not in the correct format    |
      | 12:00      | 6:00PM   | The start time 12:00 is not in the correct format    |

# Time validation errors
  Scenario: Wrong order start and end times
    Given a starting time of <start>
    And an end time of <end>
    When I run the validation
    Then I expect the hours to be rejected with <message>.

      | start     | end     | message |
      | 8:00PM    | 6:00PM  | The start time 8:00PM is later than the end time 6:00PM  |
      | 11:00PM   | 3:00PM  | The start time 11:00PM is later than the end time 3:00AM |
      | 4:00AM    | 11:00PM | The start time 4:00AM is later than the end time 11:00PM |

# Working hours errors
  Scenario: Times submitted outside the allowed range
    Given a starting time of <start>
    And an end time of <end>
    When I run the validation
    Then I expect the hours to be rejected with <message>

      | start     | end      | message |
      | 3:00PM    | 10:00PM  | The start time 3:00PM is earlier than the allowed time 5:00PM |
      | 5:00PM    | 4:15AM   | The end time 4:15AM is later than the allowed time 4:00AM     |
      | 3:45PM    | 4:30AM   | The start and end time - 3:45PM to 4:30AM - are outside the allowed hours: 5:00PM to $:00AM |

