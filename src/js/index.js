async function loadRankStats() {
  const response = await fetch(
    "https://awesome-github-stats.azurewebsites.net/user-stats/guylepage3/rank"
  );
  const data = await response.json();
  const starTotal = data.userStats.directStars + data.userStats.indirectStars;
  const getMorningCommits = (
    (30.78250863061 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const getLateMorningCommits = (
    (45.265493999671 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const getAfternoonCommits = (
    (21.477889199408 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const getEveningCommits = (
    (2.4741081703107 / 100) *
    data.userStats.commits
  ).toFixed(0);
  const dataScoreRank = ((data.score / 300000) * 100).toFixed(2);
  const rankDescriptor = (100 - dataScoreRank).toFixed(2);
  
  const lastFetch = data.userStats.lastFetch 
  const fetchLastFetch = lastFetch.replace("T", " ").slice(0, -14);

  var obj = {};
  obj.rank = data.level;
  obj.rankPercent = dataScoreRank + " %";
  obj.topRankPercent = rankDescriptor + " %";
  obj.score = parseInt(data.score, 10).toLocaleString();
  obj.scoreCalc = parseInt(data.score, 10).toLocaleString() + " / 300,000";
  obj.scorePercent = dataScoreRank + " %";
  obj.stars = starTotal.toLocaleString();
  obj.commits = data.userStats.commits.toLocaleString();
  obj.pullRequests = data.userStats.pullRequests.toLocaleString();
  obj.issues = data.userStats.issues.toLocaleString();
  obj.contributedTo = data.userStats.contributedTo.toLocaleString();
  obj.followers = data.userStats.followers.toLocaleString();
  obj.fetchDateTime = fetchLastFetch;
  obj.morningCommits = parseInt(getMorningCommits, 10).toLocaleString();
  obj.lateMorningCommits = parseInt(getLateMorningCommits, 10).toLocaleString();
  obj.afternoonCommits = parseInt(getAfternoonCommits, 10).toLocaleString();
  obj.eveningCommits = parseInt(getEveningCommits, 10).toLocaleString();

  document.getElementById("json").innerHTML = JSON.stringify(obj, undefined, 2);
}

loadRankStats();
