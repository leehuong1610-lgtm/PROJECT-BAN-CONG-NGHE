

let skillsRadarChartWebRating; 
let skillsRadarChartInteractionDemo;
let averageTrendChart;

const initialSkillsData = [4.2, 3.8, 4.5, 4.0, 2.8]; 
const industryDemand = [4.5, 4.0, 4.7, 4.2, 3.5]; 
const skillsLabels = [ 'Leadership', 'Communication', 'ProblemSolving', 'Teamwork', 'CriticalThinking' ];
const trendLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
const trendData = [3.5, 3.7, 3.8, 3.9, 4.0, 4.1]; 

const skillDisplayNames = {
    'Leadership': 'Lãnh đạo',
    'Communication': 'Giao tiếp',
    'ProblemSolving': 'Giải quyết Vấn đề',
    'Teamwork': 'Teamwork',
    'CriticalThinking': 'Tư duy Phản biện'
};

/**
 * Kiểm tra xem có dữ liệu hoạt động nào được ghi nhận không.
 * @returns {boolean}
 */
function hasActivityData() {
    const activitiesJson = localStorage.getItem('userActivities');
    if (!activitiesJson) return false;
    
    try {
        const activities = JSON.parse(activitiesJson);
        return activities.length > 0; 
    } catch (e) {
        return false;
    }
}

/**
 * Khởi tạo hoặc cập nhật trạng thái hoạt động trong localStorage.
 * @param {string} userName
 * @param {boolean} isNewUser - Nếu là người dùng mới, thiết lập mảng rỗng.
 */
function saveActivityData(userName, isNewUser = false) {
    if (isNewUser) {
        localStorage.setItem('userActivities', JSON.stringify([]));
    } else {
        const activitiesJson = localStorage.getItem('userActivities');
        if (!activitiesJson) {
            localStorage.setItem('userActivities', JSON.stringify([]));
        }
    }
}

/**
 * Tính điểm trung bình (trên thang 5.0) cho từng kỹ năng từ các hoạt động đã ghi nhận.
 * @returns {object} { scores: [4.2, 3.8, ...], summary: { weakest: 'SkillA', strongest: 'SkillB', avgTotal: 4.0 } }
 */
function aggregateSkillScores(activities) {
    const scores = {}; 
    const initialScores = {};
    let totalScoreSum = 0;
    let totalScoreCount = 0;

    skillsLabels.forEach(skill => {
        initialScores[skill] = { total: 0, count: 0 };
    });

    activities.forEach(activity => {
        const skill = activity.skill;
        if (initialScores.hasOwnProperty(skill)) {
            const score5pt = (activity.points / 100) * 5.0;
            if (!scores[skill]) {
                scores[skill] = { total: 0, count: 0 };
            }
            scores[skill].total += score5pt;
            scores[skill].count += 1;
            totalScoreSum += score5pt;
            totalScoreCount += 1;
        }
    });

    let weakestSkill = null;
    let strongestSkill = null;
    let minScore = 5.1;
    let maxScore = -0.1;
    let finalScoresArray = [];

    skillsLabels.forEach((skill, index) => {
        const data = scores[skill];
        const avg = data ? data.total / data.count : 0;
        finalScoresArray.push(avg);

        if (avg > 0) {
            if (avg < minScore) {
                minScore = avg;
                weakestSkill = skill;
            }
            if (avg > maxScore) {
                maxScore = avg;
                strongestSkill = skill;
            }
        } else if (activities.length > 0 && !weakestSkill) {
             weakestSkill = skill;
             minScore = 0;
        }
    });
    
    if (totalScoreCount === 0) {
        weakestSkill = null;
        strongestSkill = null;
    }

    return {
        scores: finalScoresArray,
        summary: {
            weakest: weakestSkill,
            strongest: strongestSkill,
            avgTotal: totalScoreCount > 0 ? totalScoreSum / totalScoreCount : 0
        }
    };
}


function handleGoogleLogin() {
    const mockUserName = "Sinh viên Google";
    localStorage.setItem('currentUser', mockUserName);
    saveActivityData(mockUserName, true); 
    window.location.href = 'dashboard.html';
}

function handleAuthSubmit(event, flow) {
    event.preventDefault();
    
    if (flow === 'login') {
        const userName = document.getElementById('login-email')?.value || 'Sinh viên Tích cực';
        localStorage.setItem('currentUser', userName);
        saveActivityData(userName, false); 
        window.location.href = 'dashboard.html';
    } else if (flow === 'register') {
         const userName = document.getElementById('reg-name')?.value || 'Sinh viên Tích cực';
        localStorage.setItem('currentUser', userName);
        saveActivityData(userName, true); 
        window.location.href = 'dashboard.html';
    } else if (flow === 'forgot') {
        renderFrame('reset');
    } else if (flow === 'reset') {
        renderFrame('login');
    }
}


function initializeAuthPage() {
    const hash = window.location.hash.substring(1);
    if (hash === 'register') {
         renderFrame('register');
    } else {
         renderFrame('login');
    }
}

function loadUserDashboardData() {
    const activitiesJson = localStorage.getItem('userActivities');
    const activities = activitiesJson ? JSON.parse(activitiesJson) : [];
    
    const { scores: skillScores, summary } = aggregateSkillScores(activities);

    const activityCount = summary.totalScoreCount || activities.length;
    const avgScore = summary.avgTotal;
    document.getElementById('stat-avg-score-value').textContent = avgScore.toFixed(2) === '0.00' ? 'N/A' : avgScore.toFixed(2);
    document.getElementById('stat-logged-activity-count-value').textContent = activityCount;
    if (activityCount >= 1 && avgScore > 3.0) { 
        document.getElementById('stat-badges-value').textContent = '1';
        document.querySelector('#stat-badges p.stat-sub-text').textContent = 'Chiến Binh Sơ Cấp';
    } else {
         document.getElementById('stat-badges-value').textContent = '0';
         document.querySelector('#stat-badges p.stat-sub-text').textContent = 'Bắt đầu ghi nhận';
    }

    if (summary.strongest && skillScores[skillsLabels.indexOf('Leadership')] > 4.0) {
        document.getElementById('stat-goal-value').textContent = '80%';
        document.querySelector('#stat-goal-progress p.stat-sub-text').textContent = `Leadership ${skillScores[0].toFixed(1)} / 5.0`;
    } else {
         document.getElementById('stat-goal-value').textContent = '0%';
         document.querySelector('#stat-goal-progress p.stat-sub-text').textContent = 'Chưa thiết lập mục tiêu';
    }
    
    const weakestScore = summary.weakest ? skillScores[skillsLabels.indexOf(summary.weakest)] : 0;
    const weakestName = summary.weakest ? skillDisplayNames[summary.weakest] : 'Kỹ năng';

    document.getElementById('reco-priority-value').textContent = `Ưu tiên: ${weakestName} (${weakestScore.toFixed(1)})`;
    document.getElementById('reco-strongest-value').textContent = `Mạnh nhất: ${skillDisplayNames[summary.strongest]} (${skillScores[skillsLabels.indexOf(summary.strongest)].toFixed(1)})`;
    
    return { dynamicSkillScores: skillScores };
}

function initializeChartsAndApplyLanguage() {
    const hasDataFlag = hasActivityData();
    let dynamicData = { dynamicSkillScores: initialSkillsData }; 

    if (hasDataFlag) {
        dynamicData = loadUserDashboardData(); 

        document.getElementById('data-content-area').classList.remove('chart-container-hidden');
        document.getElementById('empty-state-message').classList.add('chart-container-hidden');
        
    } else {
        document.getElementById('data-content-area').classList.add('chart-container-hidden');
        document.getElementById('empty-state-message').classList.remove('chart-container-hidden');
        updateEmptyStats();
    }
    
    const currentScores = dynamicData.dynamicSkillScores;
    
    const webRatingDynamicData = {
        labels: skillsLabels.map((label, i) => `${skillDisplayNames[label]} (${currentScores[i].toFixed(1)})`),
        datasets: [{
            label: 'Điểm Của Bạn (Web Rating)',
            data: currentScores,
            fill: true,
            backgroundColor: 'rgba(90, 24, 154, 0.4)', 
            borderColor: 'var(--color-primary)',
            pointBackgroundColor: 'var(--color-primary)', 
            pointBorderColor: '#fff',
        },
        { 
            label: 'Mức Yêu cầu Ngành',
            data: industryDemand,
            fill: false,
            borderColor: 'rgba(255, 215, 0, 0.7)', 
            pointRadius: 0, borderDash: [5, 5], borderWidth: 1
        }]
    };
    
    var webRatingCtx = document.getElementById('skillsRadarChartWebRating').getContext('2d');
    skillsRadarChartWebRating = new Chart(webRatingCtx, getRadarChartConfig(webRatingDynamicData, 'var(--color-text-dark)', 0.4)); 

    var trendCtx = document.getElementById('averageTrendChart').getContext('2d');
    averageTrendChart = new Chart(trendCtx, trendConfig);
    
    const interactionDemoDynamicData = {
        labels: skillsLabels.slice(0, 4).map((label, i) => `${skillDisplayNames[label]} (${initialSkillsData[i].toFixed(1)})`),
        datasets: [{
            label: 'Điểm Tương tác (Demo)',
            data: initialSkillsData.slice(0, 4),
            fill: true,
            backgroundColor: 'rgba(79, 154, 255, 0.5)', 
            borderColor: 'var(--color-accent)', pointBackgroundColor: 'var(--color-accent)', pointBorderColor: '#fff', borderWidth: 2
        }]
    };
    var demoCtx = document.getElementById('skillsRadarChartInteractionDemo').getContext('2d');
    skillsRadarChartInteractionDemo = new Chart(demoCtx, getRadarChartConfig(interactionDemoDynamicData, 'var(--color-text-dark)', 0.5)); 
    
    resetChartData(); 
    applyLanguageDashboard();
}

const DashboardTranslations = {  };
function updateChartLabels(lang) {  }
const getRadarChartConfig = (data, labelColor, fillAlpha) => ({});
const trendConfig = { };
function updateChartData(index, rawValue) {  }
function resetChartData() { }
function updateEmptyStats() {  }
function applyLanguageDashboard() {  }

document.addEventListener('DOMContentLoaded', () => {

    if (document.body.classList.contains('auth-page')) {
        initializeAuthPage();
    }
});