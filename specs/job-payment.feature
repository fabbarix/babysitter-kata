Feature: Job payment calculation feature
  This feature allows the definition of family payment
  schedules and the calculation of fees due for a 
  babysitter shift for each of these families.

  Scenario Outline: Family A
    Given that "Family A" has a default rate of $15
    And the following other rates:
      | start   | rate |
      | 11:00PM | 20   |
    And the babysitter works from "<start>" to "<end>"
    When the babysitter calculates the payments
    Then I expect the payment to be "<payment>"
    Examples:
      | start    | end      | payment     |
      |  5:30PM  | 11:25PM  | 6*15 + 1*20 |
      |  5:00PM  | 10:25PM  | 6*15        |
      
  Scenario Outline: Family B
    Given that "Family B" has a default rate of $12
    And the following other rates:
      | start   | rate |
      | 10:00PM | 8    |
      | 12:00AM | 16   |
    And the babysitter works from "<start>" to "<end>"
    When the babysitter calculates the payments
    Then I expect the payment to be "<payment>"
    Examples:
      | start    | end      | payment           |
      |  5:30PM  | 11:25PM  | 5*12 + 2*8        |
      |  5:00PM  | 02:10AM  | 5*12 + 2*8 + 3*16 |
      
  Scenario Outline: Family C
    Given that "Family C" has a default rate of $21
    And the following other rates:
      | start   | rate |
      | 09:00PM | 15   |
    And the babysitter works from "<start>" to "<end>"
    When the babysitter calculates the payments
    Then I expect the payment to be "<payment>"
    Examples:
      | start    | end      | payment     |
      |  5:30PM  | 08:25PM  | 4*21        |
      |  5:00PM  | 11:10PM  | 4*21 + 3*15 |
      