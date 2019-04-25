# api-testrail

[![npm version](https://badge.fury.io/js/api-testrail.svg)](https://badge.fury.io/js/api-testrail)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/stepanchaparyan/testrailapi/master.svg)
[![Build Status](https://travis-ci.org/stepanchaparyan/testrailapi.svg?branch=master)](https://travis-ci.org/stepanchaparyan/testrailapi)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fstepanchaparyan%2Ftestrailapi?ref=badge_shield)
![David](https://img.shields.io/david/stepanchaparyan/testrailapi.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/stepanchaparyan/testrailapi.svg)
![npm](https://img.shields.io/npm/dw/api-testrail.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/api-testrail/badge.svg)](https://snyk.io/test/npm/api-testrail)
![GitHub last commit](https://img.shields.io/github/last-commit/stepanchaparyan/testrailapi.svg)
![GitHub pull request check state](https://img.shields.io/github/status/s/pulls/stepanchaparyan/testrailapi/2.svg)
![GitHub pull request check contexts](https://img.shields.io/github/status/contexts/pulls/stepanchaparyan/testrailapi/2.svg)
![GitHub language count](https://img.shields.io/github/languages/count/stepanchaparyan/testrailapi.svg)
![GitHub top language](https://img.shields.io/github/languages/top/stepanchaparyan/testrailapi.svg)
[![Coverage Status](https://coveralls.io/repos/github/stepanchaparyan/testrailapi/badge.svg?branch=master)](https://coveralls.io/github/stepanchaparyan/testrailapi?branch=master)
![Greenkeeper](https://badges.greenkeeper.io/stepanchaparyan/testrailapi.svg?style=flat)

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

### Cases

> Returns an existing test case
```javascript
testrail.getCase (caseId) {
    return /*case data*/;
}
```

> Returns a list of test cases for a project
```javascript
testrail.getCases(projectId) {
    return /*all cases' data*/;
}
```

> Returns a list of test cases IDs for a project and case type
```javascript
testrail.getCasesIDsByType (projectId, typeId) {
    return /*list of IDs*/;
}
```

> Creates a new test case
> The following POST fields are supported: sectionID(required), title, prioretyID, typeID
```javascript
testrail.addCase(sectionID, title = 'AutoCreatedTest', prioretyID = 2, typeID = 7) {
    return /*added case's data*/;
}
```

> Updates an existing test case (partial updates are supported, you can update only title, priority and type)
```javascript
testrail.updateCase (caseID, title = 'AutoCreatedTest', priorityID = 2, typeID = 7) {
    return /*updated case's data*/;
}
```

> Deletes an existing test case
```javascript
testrail.deleteCase (caseID) {
    return /*statusID, i.e. 200*/;
}
```

### Case Fields

> Returns a list of available test case custom fields
```javascript
testrail.getCaseFields () {
    return /*case fields' list*/;
}
```

### Case Types

> Returns a list of available case types
```javascript
testrail.getCaseTypes () {
    return /*case types' list*/;
}
```

### Milestones

> Returns an existing milestone
```javascript
testrail.getMilestone (milestoneID) {
    return /*milestone's data*/;
}
```

> Returns the list of milestones for a project
```javascript
testrail.getMilestones (projectID) {
    return /*list of milestones' data*/;
}
```

> Creates a new milestone
> The following POST fields are supported - milestone's name and description
```javascript
testrail.addMilestone (projectID, name = 'Milestone', description = '') {
    return /*added milestone's data*/;
}
```

> Updates an existing milestone (partial updates are supported, you can submit and update only - is_completed field)
```javascript
testrail.updateMilestone (milestoneID, isCompleted) {
    return /*updated milestone's data*/;
}
```

> Deletes an existing milestone
```javascript
testrail.deleteMilestone (milestoneID) {
    return /*statusID, i.e. 200*/;
}
```

### Plans

> Returns an existing test plan
```javascript
testrail.getPlan (planID) {
    return /*test plan's data*/;
}
```

> Returns the list of test plans for a project
```javascript
testrail.getPlans (projectID) {
    return /*list of test plans' data*/;
}
```

> Creates a new test plan
> The following POST fields are supported - plan's name and description
```javascript
testrail.addPlan (projectID, name = 'Plan', description = '') {
    return /*added test plan's data*/;
}
```

> Adds new test run to a test plan
> The following POST fields are supported - planID(required), suiteID(required), name
```javascript
testrail.addPlanEntry (planID, suiteID, runName) {
    return /*added test plan entry's data*/;
}
```

> Updates an existing test plan
> Following fields are supported - plan's name and description
```javascript
testrail.updatePlan (planID, name, description) {
    return /*updated test plan's data*/;
}
```

> Closes an existing test plan and archives its test runs & results
```javascript
testrail.closePlan (planID) {
    return /*closed test plan's data*/;
}
```

> Deletes an existing test plan
```javascript
testrail.deletePlan (planID) {
    return /*statusID, i.e. 200*/;
}
```

### Configurations

> Returns a list of available configurations, grouped by configuration groups
```javascript
testrail.getConfigs (projectID) {
    return /*list of configs*/;
}
```

> Creates a new configuration group
```javascript
testrail.addConfigGroup (projectID, name) {
    return /*added configGroup data*/;
}
```

> Creates a new configuration
```javascript
testrail.addConfig (configGroupID, name) {
    return /*added config data*/;
}
```

> Updates an existing configuration group
```javascript
testrail.updateConfigGroup (configGroupID, name) {
    return /*updated configGroup data*/;
}
```

> Updates an existing configuration
```javascript
testrail.updateConfig (configID, name) {
    return /*updated config data*/;
}
```

> Deletes an existing configuration group and its configurations
```javascript
testrail.deleteConfigGroup (configGroupID) {
    return /*statusID, i.e. 200*/;
}
```

> Deletes an existing configuration
```javascript
testrail.deleteConfig (configID) {
    return /*statusID, i.e. 200*/;
}
```

### Priorities

> Returns a list of available priorities
```javascript
testrail.getPriorities () {
    return /*list of priorities*/;
}
```

### Projects

> Returns an existing project
```javascript
testrail.getProject (projectID) {
    return /*project's data*/;
}
```

> Returns an existing projects
> The following filters can be applied: 1 to return completed projects only. 0 to return active projects only
```javascript
testrail.getProjects (isCompleted = '') {
    return /*projects' data*/;
}
```

> Creates a new project (admin status required)
> The following POST fields are supported: name, announcement, showAnnouncement, suiteMode
```javascript
testrail.addProject (name, announcement = '', showAnnouncement = true, suiteMode = 1) {
    return /*added project's data*/;
}
```

> Updates an existing project (admin status required)
> Only the following updates are supported - is_completed (true, false)
```javascript
testrail.updateProject (projectID, isCompleted) {
    return /*updated project's data*/;
}
```

> Deletes an existing project (admin status required)
```javascript
testrail.deleteProject (projectID) {
    return /*statusID, i.e. 200*/;
}
```

### Results

> Returns a list of test results for a test
```javascript
testrail.getResults (testID) {
    return /*list of test results for a test*/;
}
```

> Returns a list of test results for a test run (except untested tests)
```javascript
testrail.getResultsForRun (runID) {
    return /*list of test results for a test run*/;
}
```

> Returns a status of case
```javascript
testrail.getResultForCase (runID, caseID) {
    return /*status_id of test case*/;
}
```

> Adds a new test result and/or comment for a test
```javascript
testrail.addResult (testID, statusID, comment = ' ') {
    return /*added result's data */;
}
```

> Adds a new test result or comment for a case
```javascript
testrail.addResultForCase (runID, caseID, statusID, comment = '') {
    return /*added result's data */;
}
```

### Result Fields

> Returns a list of available test result custom fields
```javascript
testrail.getResultFields () {
    return /*list of test result fields*/;
}
``` 

### Runs

> Returns an existing test run
```javascript
testrail.getRun (runID) {
    return /*run's data*/;
}
``` 

> Returns a list of test runs for a project. Only returns those test runs that are not part of a test plan
> The following filters can be applied: 
> 1: 1 to return completed projects only. 0 to return active projects only
> 2: limit, 3: milestoneID, 4: suiteID
```javascript
testrail.getRuns (projectID, isCompleted = '',limit = '', milestoneID = '', suiteID = '') {
    return /*list of runs' data*/;
}
``` 

> Creates a new test run
```javascript
testrail.addRun (projectID, suiteID = 1) {
    return /*added run's data*/;
}
``` 

> Creates a new test run for specific case type and returns run ID
```javascript
testrail.addRunWithType (projectID, typeID, suiteID = 1) {
    return /*added run's id*/;
}
``` 

> Updates an existing test run (partial updates are supported: runName and description)
```javascript
testrail.updateRun (runID, name, description) {
    return /*updated run's data*/;
}
``` 

> Closes an existing test run and archives its tests & results
```javascript
testrail.closeRun (runID) {
    return /*closed run's data*/;
}
``` 

> Deletes an existing test run
```javascript
testrail.deleteRun (runID) {
    return /*statusID, i.e. 200*/;
}
``` 

### Sections

> Returns an existing section
```javascript
testrail.getSection (sectionID) {
    return /*section's data*/;
}
``` 

> Returns a list of sections for a project and test suite
> The ID of the test suite (optional if the project is operating in single suite mode, default is 1)
```javascript
testrail.getSections (projectID, suiteID = 1) {
    return /*lits of section's data*/;
}
``` 

> Creates a new section
> The ID of the test suite is optional (default is 1) if the project is operating in single suite mode, required otherwise)	
```javascript
testrail.addSection (projectID, name, suiteID = 1, description) {
    return /*added section's data*/;
}
``` 

> Updates an existing section (partial updates are supported, i.e. you can submit and update specific fields only)
```javascript
testrail.updateSection (sectionID, name, description) {
    return /*updated section's data*/;
}
``` 

> Deletes an existing section
```javascript
testrail.deleteSection (sectionID) {
    return /*statusID, i.e. 200*/;
}
``` 

### Statuses

> Returns a list of available test statuses
```javascript
testrail.getStatuses () {
    return /*statuses list*/;
}
``` 

### Suites

> Returns an existing test suite
```javascript
testrail.getSuite (suiteID) {
    return /*suite's data*/;
}
``` 

> Returns a list of test suites for a project
```javascript
testrail.getSuites (projectID) {
    return /*list of test suite's*/;
}
``` 

> Creates a new test suite
```javascript
testrail.addSuite (projectID, name, description) {
    return /*added test suite's data*/;
}
``` 

> Updates an existing test suite
```javascript
testrail.updateSuite (suiteID, name, description) {
    return /*updated test suite's data*/;
}
``` 

> Deletes an existing test suite
```javascript
testrail.deleteSuite (suiteID) {
    return /*statusID, i.e. 200*/;
}
``` 

### Templates

> Returns a list of available templates
```javascript
testrail.getTemplates (projectID) {
    return /*list of templates*/;
}
``` 

### Tests

> Returns an existing test
```javascript
testrail.getTest (testID) {
    return /*test's data*/;
}
``` 

> Return all tests for a test run
> Optional: Also a comma-separated list of status IDs to filter by
```javascript
testrail.getTests (runId, typeID = [1,2,3,4,5]) {
    return /*tests data*/;
}
```

### Users

> Returns an existing user
```javascript
testrail.getUser (userID) {
    return /*user's data*/;
}
```

> Returns a list of users
```javascript
testrail.getUsers () {
    return /*list of users*/;
}
```

> Returns an existing user by his/her email address
```javascript
testrail.getUserByEmail (email) {
    return /*user's data*/;
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
```