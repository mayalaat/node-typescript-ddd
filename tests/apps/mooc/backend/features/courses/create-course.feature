Feature: Create a new course
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: A valid non existing course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "02b482bf-fbf3-4cee-b705-aff8d7a3ae62",
      "name": "The best course",
      "duration": "5 hours"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A invalid non existing course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "02b482bf-fbf3-4cee-b705-aff8d7a3ae62",
      "name": 5,
      "duration": "5 hours"
    }
    """
    Then the response status code should be 422
