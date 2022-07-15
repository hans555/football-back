const format = require("pg-format");

function getPostTeamQuery(teams) {
  return format("INSERT INTO teams VALUES %L", teams);
}

function getTeamRankingQuery() {
  return "SELECT * FROM teams";
}

function getDeleteTeamQuery() {
  return "TRUNCATE TABLE teams";
}

module.exports = {
  getPostTeamQuery,
  getTeamRankingQuery,
  getDeleteTeamQuery,
};
