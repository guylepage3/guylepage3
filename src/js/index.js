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

  const today = new Date();
  const endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
    endYear.setFullYear(today.getFullYear()); // Set year to this year
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
    let dayCount = (today.getTime() - endYear.getTime()) / msPerDay;
    dayCount = Math.round(dayCount); // returns days
  
  const calcPercent = (((365-(Math.round(dayCount)))/365)*100).toFixed(2);

  var obj = {};
  obj.rank = data.level;
  obj.rank_percent = dataScoreRank + " %";
  obj.top_rank_percent = rankDescriptor + " %";
  obj.score = parseInt(data.score, 10).toLocaleString();
  obj.score_calc = parseInt(data.score, 10).toLocaleString() + " / 300,000";
  obj.score_percent = dataScoreRank + " %";
  obj.stars = starTotal.toLocaleString();
  obj.commits = data.userStats.commits.toLocaleString();
  obj.pull_requests = data.userStats.pullRequests.toLocaleString();
  obj.issues = data.userStats.issues.toLocaleString();
  obj.contributed_to = data.userStats.contributedTo.toLocaleString();
  obj.followers = data.userStats.followers.toLocaleString();
  obj.days_left = (365-(Math.round(dayCount))) + ":" + Math.round(dayCount);
  obj.years_progress = calcPercent + " %";
  obj.fetch_date_time = fetchLastFetch;
  obj.morning_commits = parseInt(getMorningCommits, 10).toLocaleString();
  obj.lateMorning_commits = parseInt(getLateMorningCommits, 10).toLocaleString();
  obj.afternoon_commits = parseInt(getAfternoonCommits, 10).toLocaleString();
  obj.evening_commits = parseInt(getEveningCommits, 10).toLocaleString();

  document.getElementById("json").innerHTML = JSON.stringify(obj, undefined, 2);
}

loadRankStats();
