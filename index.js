var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function loadRankStats() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, starTotal, getMorningCommits, getLateMorningCommits, getAfternoonCommits, getEveningCommits, dataScore, dataScoreRank, rankDescriptor, lastFetch, fetchLastFetch, today, endYear, msPerDay, daysLeft, dayCount, calcPercent, calcPercentGraph, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://awesome-github-stats.azurewebsites.net/user-stats/guylepage3/rank")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    starTotal = data.userStats.directStars + data.userStats.indirectStars;
                    getMorningCommits = ((30.78250863061 / 100) *
                        data.userStats.commits).toFixed(0);
                    getLateMorningCommits = ((45.265493999671 / 100) *
                        data.userStats.commits).toFixed(0);
                    getAfternoonCommits = ((21.477889199408 / 100) *
                        data.userStats.commits).toFixed(0);
                    getEveningCommits = ((2.4741081703107 / 100) *
                        data.userStats.commits).toFixed(0);
                    dataScore = (data.score / 300000);
                    dataScoreRank = (dataScore * 100);
                    rankDescriptor = (100 - dataScoreRank).toFixed(2);
                    lastFetch = data.userStats.lastFetch;
                    fetchLastFetch = lastFetch.replace("T", " ").slice(0, -14);
                    today = new Date();
                    endYear = new Date(2024, 11, 29, 23, 59, 59, 999);
                    endYear.setFullYear(today.getFullYear()); // Sets year to this year
                    msPerDay = 24 * 60 * 60 * 1000;
                    daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
                    daysLeft = Math.round(daysLeft); //returns days left in the year
                    dayCount = (365 - (daysLeft));
                    calcPercent = ((dayCount / 365) * 100);
                    calcPercentGraph = ((calcPercent * 0.01) * 25);
                    obj = {};
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
                    document.getElementById("json").innerHTML = JSON.stringify(obj, undefined, 2);
                    return [2 /*return*/];
            }
        });
    });
}
loadRankStats();
