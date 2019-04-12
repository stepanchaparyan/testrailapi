# testrail-api


### An API wrapper for TestRail with error handling

> The TestRail API is described [here](http://docs.gurock.com/testrail-api2/start)

## Usage

> import TestRailAPI from '@stepanchaparyan/testrailapi'

> const testrail = new TestRailApi(host, username, password)

###### STATUS_ID
* Passed - 1
* Blocked - 2
* Untested - 3
* Retested - 4
* Failed - 5
###### TYPE_ID
* automated = 3

## Cases

* testrail.getCase(caseId) // Returns an existing test case
>
* testrail.getAllCases(projectId)	// Returns a list of test cases for a project
>
* testrail.getCasesIDsByType (projectId, typeId) // Returns a list of test cases for a roject and case type
>	
*	testrail.getTests (runId) // Return all tests for a test run
>
* testrail.getResultsForRun (runId) // Returns a list of test results for a test run (except untested tests)
>
* testrail.getResultForCase (runId, caseId) // Returns a status of case
>
* testrail.addRun (projectId, suiteId = 1) // Creates a new test run and returns run ID
> 
* testrail.addRunWithType (project_id, type_id, suite_id = 1) // Creates a new test run for specific case type and returns run ID
> 
* testrail.addResult (testId, statusId, comment = '') // Adds a new test result or comment for a test
>
* testrail.addResultForCase (runId, caseId, status_id, comment = '') // Adds a new test result or comment for a case
> 
* testrail.getUsers () // Returns a list of users
