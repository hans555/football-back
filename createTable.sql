CREATE TABLE teams (
	name VARCHAR(50) PRIMARY KEY,
	registration_date DATE NOT NULL,
	group_number INT NOT NULL,
  total_match_point INT DEFAULT 0,
  total_match_goal INT DEFAULT 0,
  alternate_total_match_point INT DEFAULT 0
);