const format = require("pg-format");

function getPostTeamQuery(teams) {
  return format("INSERT INTO teams VALUES %L", teams);
}

function getTeamRankingQuery(group_number) {
  return format("SELECT * FROM teams WHERE group_number = %L ORDER BY total_match_point DESC, total_match_goal DESC, alternate_total_match_point DESC, registration_date ASC", group_number);
}

function getDeleteTeamQuery() {
  return "TRUNCATE TABLE teams";
}

module.exports = {
  getPostTeamQuery,
  getTeamRankingQuery,
  getDeleteTeamQuery,
};
