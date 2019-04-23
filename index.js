const fetch = require('node-fetch');
const base64 = require('base-64');
const jsonpath = require('jsonpath');
const path = require('path');

module.exports = class TestRailAPIs {
	constructor (host, username, password) {
	this.host = `https://${host}.testrail.io//index.php?/api/v2/`;
		this.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + base64.encode(username + ':' + password)
		};
	}

	async myFetch (url, options, message = '') {
		let data = await fetch(url, options);
		await this.handleErrors(data, message);
		let main = await data.json();
		return main;
	}

	handleErrors (response, message) {
		if (!response.ok) {
			if (response.statusText === 'Bad Request') {
				throw Error(message);
			} else {
				throw Error(response.statusText);
			}
		} else {
			return response;
		}
	}

	// Returns an existing test case
	async getCase (caseID) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided case id is not valid');
		return await data;
	}
	// Negative case with wrong host
	async getCaseWithError (caseId) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseId}`);
		const url = 'https://stepanerror.testrail.io//index.php?/api/v2/' + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		await fetch(url, options);
	}
	// Negative case with bad request
	async getCaseWithBadRequest (caseId) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		return await data.status;
	}
	// Returns a list of test cases for a project
	async getAllCases (projectID) {
		const method = 'get_cases/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Returns a list of test cases IDs for a project and case type
	async getCasesIDsByType (projectID, typeID) {
		const method = 'get_cases/';
		const suiteID = '&suite_id=1&type_id=';
		const pathname = path.join(`${method}`, `${projectID}`, `${suiteID}`);
		const url = this.host + pathname + typeID;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		const IDs = jsonpath.query(data, '$..id');
		return await IDs;
	}
	// Creates a new test case
	// Please provide sectionID(required), title(not required), prioretyID(not required), typeID (not required)
	async addCase (sectionID, title = 'AutoCreatedTest', prioretyID = 2, typeID = 7) {
		const method = 'add_case/';
		const pathname = path.join(`${method}`, `${sectionID}`);
		const url = this.host + pathname;
		const body = {
			title: title,
			type_id: typeID,
			priority_id: prioretyID
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}
	// Updates an existing test case (partial updates are supported, you can update only title, priority and type)
	async updateCase (caseID, title = 'AutoCreatedTest', priorityID = 2, typeID = 7) {
		const method = 'update_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const body = {
			title: title,
			type_id: typeID,
			priority_id: priorityID
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}
	// Deletes an existing test case
	async deleteCase (caseID) {
		const method = 'delete_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		let data = await fetch(url, options);
		await this.handleErrors(data, 'Provided case ID is not valid');
		return await data.status;
	}

	// Returns a list of available test case custom fields.
	async getCaseFields () {
		const method = 'get_case_fields/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}

	// Returns a list of available case types.
	async getCaseTypes () {
		const method = 'get_case_types/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}

	// Returns a list of available configurations, grouped by configuration groups
	async getMilestone (milestoneID) {
		const method = 'get_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided milestoneID is not valid');
		return await data;
	}
	// Returns the list of milestones for a project.
	async getMilestones (projectID) {
		const method = 'get_milestones/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new milestone
	// The following POST fields are supported - milestone's name and description
	async addMilestone (projectID, name = 'Milestone', description = '') {
		const method = 'add_milestone/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'name': name,
			'description': description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Updates an existing milestone (partial updates are supported, you can submit and update only - is_completed field)
	async updateMilestone (milestoneID, isCompleted) {
		const method = 'update_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const body = {
			'is_completed': isCompleted
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided milestone ID is not valid');
		return await data;
	}
	// Deletes an existing milestone
	async deleteMilestone (milestoneID) {
		const method = 'delete_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		let data = await fetch(url, options);
		await this.handleErrors(data, 'Provided milestone ID is not valid');
		return await data.status;
	}

	// Returns an existing test plan
	async getPlan (planID) {
		const method = 'get_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Returns a list of test plans for a project
	async getPlans (projectID) {
		const method = 'get_plans/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new test plan
	// The following POST fields are supported - plan's name and description
	async addPlan (projectID, name = 'Plan', description = '') {
		const method = 'add_plan/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'name': name,
			'description': description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Adds one or more new test runs to a test plan
	// The following POST fields are supported - planID(required), suiteID(required), name
	async addPlanEntry (planID, suiteID, runName) {
		const method = 'add_plan_entry/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const body = {
			'plan_id': planID,
			'suite_id': suiteID,
			'name': runName
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Updates an existing test plan
	// Following fields are supported - plan's name and description
	async updatePlan (planID, name, description) {
		const method = 'update_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const body = {
			'name': name,
			'description': description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Closes an existing test plan and archives its test runs & results.
	async closePlan (planID) {
		const method = 'close_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Deletes an existing test plan.
	async deletePlan (planID) {
		const method = 'delete_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided plan ID is not valid');
		return await data.status;
	}

	// Returns a list of available configurations, grouped by configuration groups
	async getConfigs (projectID) {
		const method = 'get_configs/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new configuration group
	async addConfigGroup (projectID, name) {
		const method = 'add_config_group/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new configuration
	async addConfig (configGroupID, name) {
		const method = 'add_config/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Updates an existing configuration group
	async updateConfigGroup (configGroupID, name) {
		const method = 'update_config_group/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided configGroup ID is not valid');
		return await data;
	}
	// Updates an existing configuration
	async updateConfig (configID, name) {
		const method = 'update_config/';
		const pathname = path.join(`${method}`, `${configID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided config ID is not valid');
		return await data;
	}
	// Deletes an existing configuration group and its configurations
	async deleteConfigGroup (configGroupID) {
		const method = 'delete_config_group/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided configGroup ID is not valid');
		return await data.status;
	}
	// Deletes an existing configuration
	async deleteConfig (configID) {
		const method = 'delete_config/';
		const pathname = path.join(`${method}`, `${configID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided config ID is not valid');
		return await data.status;
	}

	// Returns a list of available priorities.
	async getPriorities () {
		const method = 'get_priorities/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Bad Request');
		return await data;
	}

	// Returns an existing project
	async getProject (projectID) {
		const method = 'get_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Returns an existing projects
	// The following filters can be applied: 1 to return completed projects only. 0 to return active projects only.
	async getProjects (isCompleted = '') {
		const method = 'get_projects&is_completed=';
		const url = this.host + method + isCompleted;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Creates a new project (admin status required)
	// The following POST fields are supported: name, announcement, showAnnouncement, suiteMode
	async addProject (name, announcement = '', showAnnouncement = true, suiteMode = 1) {
		const method = 'add_project/';
		const url = this.host + method;
		const body = {
			'name': name,
			'announcement': announcement,
			'show_announcement': showAnnouncement,
			'suite_mode': suiteMode
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Updates an existing project (admin status required)
	// Only the following updates are supported - is_completed ).
	async updateProject (projectID, isCompleted) {
		const method = 'update_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'is_completed': isCompleted
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Deletes an existing project (admin status required)
	async deleteProject (projectID) {
		const method = 'delete_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided project ID is not valid');
		return await data.status;
	}

	// Returns a list of test results for a test
	async getResults (testID) {
		const method = 'get_results/';
		const pathname = path.join(`${method}`, `${testID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided test ID is not valid');
		return await data;
	}
	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runID) {
		const method = 'get_results_for_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}
	//Returns a status of case
	async getResultForCase (runID, caseID) {
		const method = 'get_results_for_case/';
		const pathname = path.join(`${method}`, `${runID}/`, `${caseID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID or case ID is not valid');
		if (data.length === 0) {
			return undefined;
		}
		return await data[0].status_id;
	}
	// Adds a new test result or comment for a test
	async addResult (testID, statusID, comment = '') {
		const method = 'add_result/';
		const pathname = path.join(`${method}`, `${testID}`);
		const url = this.host + pathname;
		const body = {
			statusID: statusID,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}
	// Adds a new test result or comment for a case
	async addResultForCase (runID, caseID, statusID, comment = '') {
		const method = 'add_result_for_case/';
		const pathname = path.join(`${method}`, `${runID}/`, `${caseID}`);
		const url = this.host + pathname;
		const body = {
			status_id: statusID,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided run ID, case ID or status ID is not valid');
		return await data;
	}

	// Returns a list of available test result custom fields
	async getResultFields () {
		const method = 'get_result_fields/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided test ID is not valid');
		return await data;
	}

	// Returns run name with time
	async getRunName () {
		const date = new Date();
		const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
		let day = days[date.getDate()];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let month = months[new Date().getMonth()];
		const year = date.getFullYear();
		const hour = date.getHours();
		const minutes = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42','43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
		let minute = minutes[date.getMinutes()];
		const fullTime = month + ' ' + day + ' ' + year + ', ' + hour + ':' + minute;
		const runName = `Automated test run - ${fullTime}`;
		return await runName;
	}

	// Creates a new test run and returns run ID
	async addRun (projectID, suiteID = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suiteID,
			include_all: true
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data.id;
	}
	// Creates a new test run for specific case type and returns run ID
	async addRunWithType (projectID, typeID, suiteID = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suiteID,
			include_all: false,
			case_ids: await this.getCasesIDsByType(projectID, typeID)
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		return await data.id;
	}
	// Updates an existing test run (partial updates are supported: runName and description)
	async updateRun (runID, name, description ) {
		const method = 'update_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Closes an existing test run and archives its tests & results.
	async closeRun (runID) {
		const method = 'close_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}
	// Deletes an existing test run
	async deleteRun (runID) {
		const method = 'delete_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided run ID is not valid');
		return await data.status;
	}

	// Returns an existing section
	async getSection (sectionID) {
		const method = 'get_section/';
		const pathname = path.join(`${method}`, `${sectionID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided section ID is not valid');
		return await data;
	}
	// Returns a list of sections for a project and test suite
	// The ID of the test suite (optional if the project is operating in single suite mode, default is 1)
	async getSections (projectID, suiteID = 1) {
		const method = 'get_sections/';
		const param = '&suite_id=';
		const pathname = path.join(`${method}`, `${projectID}`, `${param}`);
		const url = this.host + pathname + suiteID;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Creates a new section
	// The ID of the test suite is optional (default is 1) if the project is operating in single suite mode, required otherwise)
	async addSection (projectID, name, suiteID = 1, description) {
		const method = 'add_section/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			suite_id: suiteID,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Updates an existing section (partial updates are supported, i.e. you can submit and update specific fields only)
	async updateSection (sectionID, name, description) {
		const method = 'update_section/';
		const pathname = path.join(`${method}`, `${sectionID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Deletes an existing section
	async deleteSection (sectionID) {
		const method = 'delete_section/';
		const pathname = path.join(`${method}`, `${sectionID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided section ID is not valid');
		return await data.status;
	}

	// Returns a list of available test statuses
	async getStatuses () {
		const method = 'get_statuses/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}

	// Returns an existing test suite
	async getSuite (suiteID) {
		const method = 'get_suite/';
		const pathname = path.join(`${method}`, `${suiteID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided suite ID is not valid');
		return await data;
	}
	// Returns a list of test suites for a project
	async getSuites (projectID) {
		const method = 'get_suites/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new test suite
	async addSuite (projectID, name, description) {
		const method = 'add_suite/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Updates an existing test suite
	async updateSuite (suiteID, name, description) {
		const method = 'update_suite/';
		const pathname = path.join(`${method}`, `${suiteID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided suite ID is not valid');
		return await data;
	}
	// Deletes an existing test suite
	async deleteSuite (suiteID) {
		const method = 'delete_suite/';
		const pathname = path.join(`${method}`, `${suiteID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided suite ID is not valid');
		return await data.status;
	}

	// Returns a list of available templates (requires TestRail 5.2 or later)
	async getTemplates (projectId) {
		const method = 'get_templates/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}

	// Returns an existing test
	async getTest (testID) {
		const method = 'get_test/';
		const pathname = path.join(`${method}`, `${testID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided test ID is not valid');
		return await data;
	}
	// Return all tests for a test run
	// Optional: Also a comma-separated list of status IDs to filter by
	async getTests (runID, typeID = [1,2,3,4,5]) {
		const method = 'get_tests/';
		const param = '&status_id=';
		const url = this.host + method + runID + param + typeID;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}

	// Returns an existing user
	async getUser (userID) {
		const method = 'get_user/';
		const pathname = path.join(`${method}`, `${userID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided user ID is not valid');
		return await data;
	}
	// Returns a list of users
	async getUsers () {
		const method = 'get_users/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}
	// Returns an existing user by his/her email address
	async getUserByEmail (email) {
		const method = 'get_user_by_email&email=';
		const url = this.host + method + email;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided email is not valid');
		return await data;
	}
};
