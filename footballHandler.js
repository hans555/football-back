const { pool } = require("./database");
const jsonic = require("jsonic");
require("dotenv").config();

async function handlePostMatch(req, res) {
  const body = jsonic(req.body);
  const { teams, matches } = body;

  const client = await pool.connect();
  try {

    res.status(200).json({
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  } finally {
    client.release();
  }
}

module.exports = {
  handlePostMatch
};