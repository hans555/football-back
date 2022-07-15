const { pool } = require("./database");
const jsonic = require("jsonic");
const { getTeamRankingQuery, getPostTeamQuery } = require("./footballQueries");
require("dotenv").config();

async function handlePostMatch(req, res) {
  const body = jsonic(req.body);
  const { teams, matches } = body;

  const client = await pool.connect();
  try {
    matches.forEach((match) => {
      const {team1, team2, score1, score2 } = match;
      teams.team1.total_match_goal += score1
      teams.team2.total_match_goal += score2
      if (score1 > score2) {
        teams[team1].total_match_point += 3
        teams[team1].alternate_total_match_point += 5
        teams[team2].alternate_total_match_point += 1
      } else if (match.score1 < match.score2) {
        teams[team2].total_match_point += 3
        teams[team2].alternate_total_match_point += 5
        teams[team1].alternate_total_match_point += 1
      } else {
        teams[team1].total_match_point += 1
        teams[team2].total_match_point += 1
        teams[team1].alternate_total_match_point += 3
        teams[team2].alternate_total_match_point += 3
      }
    });
    
    console.log(teams);
    await client.query("BEGIN");
    insertTeamQueryString = getPostTeamQuery(teams);

    res.status(200).json({});
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    res.status(400).end();
  } finally {
    client.release();
  }
}

module.exports = {
  handlePostMatch,
};
