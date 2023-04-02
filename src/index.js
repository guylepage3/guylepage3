//Takes yesterday's devRanking.json file and outputs new data

async function loadCommits() {
  const response = await fetch(
    "https://raw.githubusercontent.com/guylepage3/guylepage3/main/devRanking.json"
  );
  const data = await response.json();
  const starTotal = data.userStats.directStars + data.userStats.indirectStars;
  const morningCommits = (
    (30.78250863061 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const lateMorningCommits = (
    (45.265493999671 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const afternoonCommits = (
    (21.477889199408 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const eveningCommits = (
    (2.4741081703107 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const dataScoreRank = ((data.score / 300000) * 100).toFixed(2);
  const rankDescriptor = (100 - dataScoreRank).toFixed(2);

  var obj = {};
  obj.rank = data.level;
  obj.rank_percent = dataScoreRank + " %";
  obj.rank_descriptor = rankDescriptor + " %";
  obj.score = parseInt(data.score, 10).toLocaleString();
  obj.score_num = parseInt(data.score, 10).toLocaleString() + " / 300,000";
  obj.score_percent = dataScoreRank + " %";
  obj.stars = starTotal.toLocaleString();
  obj.commits = data.userStats.commits.toLocaleString();
  obj.prs = data.userStats.pullRequests.toLocaleString();
  obj.issues = data.userStats.issues.toLocaleString();
  obj.contributed_to = data.userStats.contributedTo.toLocaleString();
  obj.followers = data.userStats.followers.toLocaleString();
  obj.morning = morningCommits.toLocaleString();
  obj.late_morning = lateMorningCommits.toLocaleString();
  obj.afternoon = afternoonCommits.toLocaleString();
  obj.evening = eveningCommits.toLocaleString();

  document.getElementById("json").innerHTML = JSON.stringify(obj, undefined, 2);
}

loadCommits();
