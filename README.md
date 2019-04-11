# testrail-api


### An API wrapper for TestRail with error handling

The TestRail API is described [here](http://docs.gurock.com/testrail-api2/start)

## Usage

import * as TestRailApi from '@stepanchaparyan/testrailapi'

const testrail = new TestRailApi(host, username, password)

###### STATUS_ID
* Passed - 1
* Blocked - 2
* Untested - 3
* Retested - 4
* Failed - 5
###### TYPE_ID
* automated = 3

## Cases

testrail.getCase(caseId) {
  return case;
});
