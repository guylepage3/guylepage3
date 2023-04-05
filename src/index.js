// Takes devRanking.json and reconfigures the JSON data

async function loadRankStats() {
  const response = await fetch(
    "https://awesome-github-stats.azurewebsites.net/user-stats/guylepage3/rank"
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
  
  const lastFetch = data.userStats.lastFetch 
  const fetchDateTime = lastFetch.replace("T", " ").slice(0, -14);

  var obj = {};
  obj.rank = data.level;
  obj.rank_percent = dataScoreRank + " %";
  obj.rank_descriptor = rankDescriptor + " %";
  obj.score = parseInt(data.score, 10).toLocaleString();
  obj.score_num = parseInt(data.score, 10).toLocaleString() + " / 300,000";
  obj.score_percent = dataScoreRank + " %";
  obj.stars = starTotal.toLocaleString();
  obj.commits = data.userStats.commits.toLocaleString();
  obj.pull_requests = data.userStats.pullRequests.toLocaleString();
  obj.issues = data.userStats.issues.toLocaleString();
  obj.contributed_to = data.userStats.contributedTo.toLocaleString();
  obj.followers = data.userStats.followers.toLocaleString();
  obj.date_time_fetch = fetchDateTime;
  obj.morning = parseInt(morningCommits, 10).toLocaleString();
  obj.late_morning = parseInt(lateMorningCommits, 10).toLocaleString();
  obj.afternoon = parseInt(afternoonCommits, 10).toLocaleString();
  obj.evening = parseInt(eveningCommits, 10).toLocaleString();

  document.getElementById("json").innerHTML = JSON.stringify(obj, undefined, 2);
}

loadRankStats();
