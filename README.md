# api-testrail

[![npm version](https://badge.fury.io/js/api-testrail.svg)](https://badge.fury.io/js/api-testrail)
[![Build Status](https://travis-ci.org/stepanchaparyan/testrailapi.svg?branch=master)](https://travis-ci.org/stepanchaparyan/testrailapi)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi?ref=badge_shield)
[![Known Vulnerabilities](https://snyk.io/test/npm/api-testrail/badge.svg)](https://snyk.io/test/npm/api-testrail)
![David](https://img.shields.io/david/stepanchaparyan/testrailapi.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/stepanchaparyan/testrailapi.svg)
![npm](https://img.shields.io/npm/dw/api-testrail.svg)
[![Coverage Status](https://coveralls.io/repos/github/stepanchaparyan/testrailapi/badge.svg?branch=master)](https://coveralls.io/github/stepanchaparyan/testrailapi?branch=master)
### An API wrapper for TestRail with error handling

> The TestRail API is described [here](http://docs.gurock.com/testrail-api2/start)

## Usage

Of cource, you need to setup the API wrapper :

```javascript
import ApiTestRail from 'api-testrail';

const apitestrail = new ApiTestRail(
  host, 
  username,
  password
);
```

## Cases
#### Below see the list of cases

> Returns an existing test case
```javascript
testrail.getCase (caseId) {
    return /*testCase Data*/;
}
```

> Returns a list of test cases for a project
```javascript
testrail.getAllCases(projectId) {
    return /*All testCases Data*/;
}
```
> Returns a list of test cases IDs for a project and case type
```javascript
testrail.getCasesIDsByType (projectId, typeId) {
    return /*list of IDs*/;
}
```
> Return all tests for a test run
```javascript
testrail.getTests (runId) {
    return /*tests data*/;
}
```

> Returns a list of test results for a test run (except untested tests)
```javascript
testrail.getResultsForRun (runId) {
    return /*tests data*/;
}
```

> Returns a status of case
```javascript
testrail.getResultForCase (runId, caseId) {
    return /*statusId of case*/;
}
```

> Creates a new test run and returns run ID
```javascript
testrail.addRun (projectId, suiteId = 1) {
    return /*runId*/;
}
```

> Creates a new test run for specific case type and returns run ID
```javascript
testrail.addRunWithType (project_id, type_id, suite_id = 1) {
    return /*runId*/;
}
```

> Adds a new test result and comment for a test
```javascript
testrail.addResult (testId, statusId, comment = '') {
    return /*test data*/;
}
```

> Adds a new test result and comment for a case
```javascript
testrail.addResultForCase (runId, caseId, status_id, comment = '') {
    return /*case data*/;
}
```

> Returns a list of users
```javascript
testrail.getUsers () {
    return /*users data*/;
}
```

# FYI
#### STATUS_IDs
```javascript
Passed - 1
Blocked - 2
Untested - 3
Retested - 4
Failed - 5
```
#### TYPE_IDs
```javascript
Acceptance - 1
Accessibility - 2
Automated - 3
Compatibility - 4
Destructive - 5
Functional - 6
Other (Default) - 7
Performance - 8
Regression - 9
Security - 10
Smoke & Sanity - 11
Usability - 12

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi?ref=badge_large)