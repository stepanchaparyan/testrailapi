const base64 = require('base-64');
const axios = require('axios');

module.exports = class TestRailAPIs {
	constructor (host, username, password) {
		this.host = `https://${host}.testrail.io//index.php?/api/v2/`;
		this.username = username;
		this.password = password;
		axios.defaults.baseURL = this.host;
		this.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + base64.encode(username + ':' + password)
		};
	}

	// Returns an existing test case
	async getCase (caseID) {
		const method = 'get_case/';
		const url = method + caseID;
		const data = await axios({
			method: 'get',
			url,
			headers: this.headers
		});
		return data.data;
	}
	// Negative case with wrong host
	async getCaseWithError (caseId) {
		const method = 'get_case/';
		const url = 'https://stepanerror.testrail.io//index.php?/api/v2/' + method + caseId;

		await axios({
			method: 'get',
			url,
			headers: this.headers
		});
	}
	// Negative case with bad request
	async getCaseWithBadRequest (caseId) {
		const method = 'get_case/';
		const url = method + caseId;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			return err.response.status;
		});

		return res;
	}
	// Returns a list of test cases for a project
	async getCases (projectID) {
		const method = 'get_cases/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided projectId is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns a list of test cases IDs for a project and case type
	async getCasesIDsByType (projectID, typeID) {
		const method = 'get_cases/';
		const suiteID = '&suite_id=1&type_id=';
		const url = method + projectID + suiteID + typeID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID or type ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Creates a new test case
	// Please provide sectionID(required), title(not required), prioretyID(not required), typeID (not required)
	async addCase (sectionID, title = 'AutoCreatedTest', prioretyID = 2, typeID = 7) {
		const method = 'add_case/';
		const url = method + sectionID;
		const data = {
			title: title,
			type_id: typeID,
			priority_id: prioretyID
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID or status Id is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Updates an existing test case (partial updates are supported, you can update only title, priority and type)
	async updateCase (caseID, title = 'AutoCreatedTest', priorityID = 2, typeID = 7) {
		const method = 'update_case/';
		const url = method + caseID;
		const data = {
			title: title,
			type_id: typeID,
			priority_id: priorityID
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID or status Id is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Deletes an existing test case
	async deleteCase (caseID) {
		const method = 'delete_case/';
		const url = method + caseID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided case ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of available test case custom fields.
	async getCaseFields () {
		const method = 'get_case_fields/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error(`Cannot get the list of available test case due to ${err.message}`);
		});

		return res.data;
	}

	// Returns a list of available case types.
	async getCaseTypes () {
		const method = 'get_case_types/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error(`Cannot get the list of available test case due to ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing milestone.
	async getMilestone (milestoneID) {
		const method = 'get_milestone/';
		const url = method + milestoneID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided milestoneID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns the list of milestones for a project.
	async getMilestones (projectID) {
		const method = 'get_milestones/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Creates a new milestone
	// The following POST fields are supported - milestone's name and description
	async addMilestone (projectID, name = 'Milestone', description = '') {
		const method = 'add_milestone/';
		const url = method + projectID;
		const data = {
			'name': name,
			'description': description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Updates an existing milestone (partial updates are supported, you can submit and update only - is_completed field)
	async updateMilestone (milestoneID, isCompleted) {
		const method = 'update_milestone/';
		const url = method + milestoneID;
		const data = {
			'is_completed': isCompleted
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided milestone ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes an existing milestone
	async deleteMilestone (milestoneID) {
		const method = 'delete_milestone/';
		const url = method + milestoneID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided milestone ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns an existing test plan
	async getPlan (planID) {
		const method = 'get_plan/';
		const url = method + planID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided plan ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns a list of test plans for a project
	async getPlans (projectID) {
		const method = 'get_plans/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Creates a new test plan
	// The following POST fields are supported - plan's name and description
	async addPlan (projectID, name = 'Plan', description = '') {
		const method = 'add_plan/';
		const url = method + projectID;
		const data = {
			'name': name,
			'description': description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Adds one or more new test runs to a test plan
	// The following POST fields are supported - planID(required), suiteID(required), name, configIds, runs
	async addPlanEntry (planID, suiteID, runName, configIds, runs) {
		const method = 'add_plan_entry/';
		const url = method + planID;
		const data = {
			'plan_id': planID,
			'suite_id': suiteID,
			'name': runName,
			'config_ids': configIds,
			'runs': runs
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided plan ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Updates an existing test plan
	// Following fields are supported - plan's name and description
	async updatePlan (planID, name, description) {
		const method = 'update_plan/';
		const url = method + planID;
		const data = {
			'name': name,
			'description': description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided plan ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Closes an existing test plan and archives its test runs & results.
	async closePlan (planID) {
		const method = 'close_plan/';
		const url = method + planID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided plan ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes an existing test plan.
	async deletePlan (planID) {
		const method = 'delete_plan/';
		const url = method + planID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided plan ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of available configurations, grouped by configuration groups
	async getConfigs (projectID) {
		const method = 'get_configs/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Creates a new configuration group
	async addConfigGroup (projectID, name) {
		const method = 'add_config_group/';
		const url = method + projectID;
		const data = {
			'name': name
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Creates a new configuration
	async addConfig (configGroupID, name) {
		const method = 'add_config/';
		const url = method + configGroupID;
		const data = {
			'name': name
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided configGroup ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Updates an existing configuration group
	async updateConfigGroup (configGroupID, name) {
		const method = 'update_config_group/';
		const url = method + configGroupID;
		const data = {
			'name': name
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided configGroup ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;

	}

	// Updates an existing configuration
	async updateConfig (configID, name) {
		const method = 'update_config/';
		const url = method + configID;
		const data = {
			'name': name
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided config ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes an existing configuration group and its configurations
	async deleteConfigGroup (configGroupID) {
		const method = 'delete_config_group/';
		const url = method + configGroupID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided configGroup ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}
	// Deletes an existing configuration
	async deleteConfig (configID) {
		const method = 'delete_config/';
		const url = method + configID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided config ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of available priorities.
	async getPriorities () {
		const method = 'get_priorities/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error(`Bad request. Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing project
	async getProject (projectID) {
		const method = 'get_project/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing projects
	// The following filters can be applied: 1 to return completed projects only. 0 to return active projects only.
	async getProjects (isCompleted = '') {
		const method = 'get_projects&is_completed=';
		const url = method + isCompleted;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Creates a new project (admin status required)
	// The following POST fields are supported: name, announcement, showAnnouncement, suiteMode
	async addProject (name, announcement = '', showAnnouncement = true, suiteMode = 1) {
		const method = 'add_project/';
		const url = method;
		const data = {
			'name': name,
			'announcement': announcement,
			'show_announcement': showAnnouncement,
			'suite_mode': suiteMode
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Updates an existing project (admin status required)
	// Only the following updates are supported - is_completed
	async updateProject (projectID, isCompleted) {
		const method = 'update_project/';
		const url = method + projectID;
		const data = {
			'is_completed': isCompleted
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes an existing project (admin status required)
	async deleteProject (projectID) {
		const method = 'delete_project/';
		const url = method + projectID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of test results for a test
	async getResults (testID) {
		const method = 'get_results/';
		const url = method + testID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runID) {
		const method = 'get_results_for_run/';
		const url = method + runID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	//Returns a status of case
	async getResultForCase (runID, caseID) {
		const method = 'get_results_for_case/';
		const url = method + runID + '/' + caseID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID or case ID is not valid. ' + `Here is more info ${err.message}`);
		});

		if (res.data.length === 0) {
			return undefined;
		}
		return res.data[0].status_id;
	}

	// Adds a new test result or comment for a test
	async addResult (testID, statusID, comment = ' ') {
		const method = 'add_result/';
		const url = method + testID;
		const data = {
			status_id: statusID,
			comment: comment
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID or status ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Adds a new test result or comment for a case
	async addResultForCase (runID, caseID, statusID, comment = '') {
		const method = 'add_result_for_case/';
		const url = method + runID + '/' + caseID;
		const data = {
			status_id: statusID,
			comment: comment
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID, case ID or status ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns a list of available test result custom fields
	async getResultFields () {
		const method = 'get_result_fields/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing test run
	async getRun (runID) {
		const method = 'get_run/';
		const url = method + runID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns a list of test runs for a project. Only returns those test runs that are not part of a test plan
	// The following filters can be applied: 1: 1 to return completed projects only. 0 to return active projects only.
	// The following filters also can be applied: 2: limit, 3: milestoneID, 4:suiteID
	async getRuns (projectID,isCompleted='',limit='',milestoneID='', suiteID='') {
		const method = 'get_runs/';
		const filters = `&is_completed=${isCompleted}`+`&limit=${limit}`+`&milestone_id=${milestoneID}`+`&suite_id=${suiteID}`;
		const url = method + projectID + filters;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns run name with time
	async getRunName () {
		const date = new Date();
		const days = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
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
	// Creates a new test run
	async addRun (projectID, suiteID = 1) {
		const method = 'add_run/';
		const url = method + projectID;
		const data = {
			name: await this.getRunName(),
			suite_id: suiteID,
			include_all: true
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Creates a new test run for specific case type and returns run ID
	async addRunWithType (projectID, typeID, suiteID = 1) {
		const method = 'add_run/';
		const url = method + projectID;
		const data = {
			name: await this.getRunName(),
			suite_id: suiteID,
			include_all: false,
			case_ids: await this.getCasesIDsByType(projectID, typeID)
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID or type ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data.id;
	}

	// Updates an existing test run (partial updates are supported: runName and description)
	async updateRun (runID, name, description) {
		const method = 'update_run/';
		const url = method + runID;
		const data = {
			name: name,
			description: description
		};
		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Closes an existing test run and archives its tests & results.
	async closeRun (runID) {
		const method = 'close_run/';
		const url = method + runID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes an existing test run
	async deleteRun (runID) {
		const method = 'delete_run/';
		const url = method + runID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided run ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns an existing section
	async getSection (sectionID) {
		const method = 'get_section/';
		const url = method + sectionID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided section ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns a list of sections for a project and test suite
	// The ID of the test suite (optional if the project is operating in single suite mode, default is 1)
	async getSections (projectID, suiteID = 1) {
		const method = 'get_sections/';
		const param = '&suite_id=';
		const url = method + projectID + param + suiteID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Creates a new section
	// The ID of the test suite is optional (default is 1) if the project is operating in single suite mode, required otherwise)
	async addSection (projectID, name, suiteID = 1, description) {
		const method = 'add_section/';
		const url = method + projectID;
		const data = {
			name: name,
			suite_id: suiteID,
			description: description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided section ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Updates an existing section (partial updates are supported, i.e. you can submit and update specific fields only)
	async updateSection (sectionID, name, description) {
		const method = 'update_section/';
		const url = method + sectionID;
		const data = {
			name: name,
			description: description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Deletes an existing section
	async deleteSection (sectionID) {
		const method = 'delete_section/';
		const url = method + sectionID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided section ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of available test statuses
	async getStatuses () {
		const method = 'get_statuses/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing test suite
	async getSuite (suiteID) {
		const method = 'get_suite/';
		const url = method + suiteID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided suite ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Returns a list of test suites for a project
	async getSuites (projectID) {
		const method = 'get_suites/';
		const url = method + projectID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Creates a new test suite
	async addSuite (projectID, name, description) {
		const method = 'add_suite/';
		const url = method + projectID;
		const data = {
			name: name,
			description: description
		};

		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Updates an existing test suite
	async updateSuite (suiteID, name, description) {
		const method = 'update_suite/';
		const url = method + suiteID;
		const data = {
			name: name,
			description: description
		};
		const res = await axios({
			method: 'post',
			url,
			data,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided suite ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Deletes an existing test suite
	async deleteSuite (suiteID) {
		const method = 'delete_suite/';
		const url = method + suiteID;
		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided suite ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}

	// Returns a list of available templates (requires TestRail 5.2 or later)
	async getTemplates (projectId) {
		const method = 'get_templates/';
		const url = method + projectId;
		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided project ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing test
	async getTest (testID) {
		const method = 'get_test/';
		const url = method + testID;
		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}
	// Return all tests for a test run
	// Optional: Also a comma-separated list of status IDs to filter by
	async getTests (runID, typeID = [1,2,3,4,5]) {
		const method = 'get_tests/';
		const param = '&status_id=';
		const url = method + runID + param + typeID;
		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided data is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing user
	async getUser (userID) {
		const method = 'get_user/';
		const url = method + userID;
		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided user ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns a list of users
	async getUsers () {
		const method = 'get_users/';
		const url = method;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error(`Cannot get users due to ${err.message}`);
		});

		return res.data;
	}

	// Returns an existing user by his/her email address
	async getUserByEmail (email) {
		const method = 'get_user_by_email&email=';
		const url = method + email;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided email is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Adds attachment to a result based on the result ID. The maximum allowable upload size is set to 256mb.
	async addAttachmentToResult(resultId, imageFile) {
		const FormData = require('form-data');
		const fs = require('fs');
		let form = new FormData();
		form.append('attachment', fs.createReadStream(imageFile));

		const res = axios({
			method: 'post',
			data: form,
			url: 'add_attachment_to_result/' + resultId,
			auth: {
				username: this.user,
				password: this.password
			},
			headers: form.getHeaders()
		}).catch(err => {
			throw Error(`Cannot attach file due to ${err.message}`);
		});

		return res;
	}

	// Returns a list of attachments for a test case.
	async getAttachmentsForCase (caseID) {
		const method = 'get_attachments_for_case/';
		const url = method + caseID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided case ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns a list of attachments for test results.
	async getAttachmentsForTest (testID) {
		const method = 'get_attachments_for_test/';
		const url = method + testID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided test ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Returns the requested attachment identified by :attachmentID.
	async getAttachment (attachmentID) {
		const method = 'get_attachment/';
		const url = method + attachmentID;

		const res = await axios({
			method: 'get',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided attachmentID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.data;
	}

	// Deletes the specified attachment identified by :attachmentID.
	async deleteAttachment (attachmentID) {
		const method = 'delete_attachment/';
		const url = method + attachmentID;

		const res = await axios({
			method: 'post',
			url,
			headers: this.headers
		}).catch(err => {
			throw Error('Provided attachment ID is not valid. ' + `Here is more info ${err.message}`);
		});

		return res.status;
	}
};