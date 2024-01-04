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
  
  let dataScore = (data.score/300000)
  let dataScoreRank = (dataScore*100);

  const rankDescriptor = (100 - dataScoreRank).toFixed(2);
  
  const lastFetch = data.userStats.lastFetch 
  const fetchLastFetch = lastFetch.replace("T", " ").slice(0, -14);

  const today = new Date();
  const endYear = new Date(2024, 11, 29, 23, 59, 59, 999); // Sets day and month
  endYear.setFullYear(today.getFullYear()); // Sets year to this year
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
  let daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
  daysLeft = Math.round(daysLeft); //returns days left in the year
  
  const dayCount = (365 - (daysLeft));
  
  const calcPercent = ((dayCount/365)*100);

  const calcPercentGraph = ((calcPercent*0.01)*25);

  type ghRank = {
    id?: number;
    name?: string;
    rank?: number;
    rank_percent?: string;
    top_rank_percent?: string;
    score_calc?: string;
    stars?: number;
    commits?: number;
    pull_requests?: number;
    issues?: number;
    contributed_to?: number;
    followers?: number;
    fetch_date_time?: number;
    days_left?: string;
    years_progress?: string;
    years_progress_graph?: string;
    morning_commits?: string;
    lateMorning_commits?: string;
    afternoon_commits?: string;
    evening_commits?: string;
  };

  const obj: ghRank = {};
    obj.rank = data.level;
    obj.rank_percent = dataScoreRank.toFixed(2) + " %";
    obj.top_rank_percent = rankDescriptor + " %";
    obj.score_calc = parseInt(data.score, 10).toLocaleString() + " / 300,000";
    obj.stars = starTotal.toLocaleString();
    obj.commits = data.userStats.commits.toLocaleString();
    obj.pull_requests = data.userStats.pullRequests.toLocaleString();
    obj.issues = data.userStats.issues.toLocaleString();
    obj.contributed_to = data.userStats.contributedTo.toLocaleString();
    obj.followers = data.userStats.followers.toLocaleString();
    obj.fetch_date_time = fetchLastFetch;
    obj.days_left = dayCount + ":" + daysLeft;
    obj.years_progress = calcPercent.toFixed(2) + " %";
    obj.years_progress_graph = calcPercentGraph.toFixed(0) + " (25)";
    obj.morning_commits = parseInt(getMorningCommits, 10).toLocaleString();
    obj.lateMorning_commits = parseInt(getLateMorningCommits, 10).toLocaleString();
    obj.afternoon_commits = parseInt(getAfternoonCommits, 10).toLocaleString();
    obj.evening_commits = parseInt(getEveningCommits, 10).toLocaleString();

  document.getElementById("json")!.innerHTML = JSON.stringify(obj, undefined, 2);

}

loadRankStats();