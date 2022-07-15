const { pool } = require("./database");
const jsonic = require("jsonic");
const { getTeamRankingQuery, getPostTeamQuery, getDeleteTeamQuery } = require("./footballQueries");
require("dotenv").config();

async function handlePostMatch(req, res) {
  const body = jsonic(req.body);
  let { teams, matches } = body;
  
  // Update Score
  matches.forEach((match) => {
    const {team1, team2, score1, score2 } = match;
    teams[team1].total_match_goal += score1
    teams[team2].total_match_goal += score2
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
  teams = Object.keys(teams).map(team => {
    return Object.values(teams[team])
  });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    insertTeamQueryString = getPostTeamQuery(teams);
    await client.query(insertTeamQueryString);
    getTeamRankingQueryString = getTeamRankingQuery(1);
    let data =  await client.query(getTeamRankingQueryString);
    let first_group_rank = data.rows
    getTeamRankingQueryString = getTeamRankingQuery(2);
    data =  await client.query(getTeamRankingQueryString);
    let second_group_rank = data.rows
    res.status(200).json({
      first_group_rank,
      second_group_rank
    });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    res.status(400).end();
  } finally {
    client.release();
  }
}

async function handleResetMatch(req, res) {
  const client = await pool.connect();
  try {
    resetTeamQueryString = getDeleteTeamQuery();
    await client.query(resetTeamQueryString);    
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).end();
  } finally {
    client.release();
  }
}

module.exports = {
  handlePostMatch,
  handleResetMatch
};
