const format = require("pg-format");

function getPostTeamQuery(teams) {
  return format("INSERT INTO teams VALUES %L", teams);
}

function getTeamRankingQuery() {
  return "SELECT * FROM teams ORDER BY total_match_point DESC, total_match_goal DESC, alternate_total_match_point DESC, registration_date ASC";
}

function getDeleteTeamQuery() {
  return "TRUNCATE TABLE teams";
}

module.exports = {
  getPostTeamQuery,
  getTeamRankingQuery,
  getDeleteTeamQuery,
};
