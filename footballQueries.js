const format = require("pg-format");

function getPostTeamQuery(teams) {
	return format("INSERT INTO teams VALUES %L", teams)
}

function getTeamRankingQuery() {
	return "SELECT * FROM teams"
}

module.exports = {
	getPostTeamQuery,
  getTeamRankingQuery
}
