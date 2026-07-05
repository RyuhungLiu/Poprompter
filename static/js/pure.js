var currentState = null;
var btnPlay = document.getElementById('btnPlay');
var statusDiv = document.getElementById('status');
var themeToggleBtn = document.getElementById('themeToggle');
var speedLabel = document.getElementById('speedLabel');
var isLightTheme = false;
var SPEED_MIN = 1;
var SPEED_MAX = 5;
var SPEED_STEP = 0.1;

themeToggleBtn.onclick = function() {
    isLightTheme = !isLightTheme;
    if (isLightTheme) {
        document.body.className = 'theme-light';
        themeToggleBtn.innerText = '🌓 典雅白';
    } else {
        document.body.className = '';
        themeToggleBtn.innerText = '🌓 科技黑';
    }
};

function ajaxRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (callback) {
                    try { callback(JSON.parse(xhr.responseText)); } catch(e) {}
                }
            } else {
                statusDiv.innerText = '连接异常: ' + xhr.status;
            }
        }
    };
    if (data) xhr.send(JSON.stringify(data));
    else xhr.send();
}

function pollState() {
    ajaxRequest('GET', '/api/state', null, function(res) {
        currentState = res;
        updateUI();
        statusDiv.innerText = '● 已连接 (高兼容模式)';
    });
}

setInterval(pollState, 1500);
pollState();

function updateUI() {
    if (!currentState) return;
    if (currentState.isPlaying) {
        btnPlay.className = 'btn-play playing';
        btnPlay.innerText = '⏸ 暂停';
    } else {
        btnPlay.className = 'btn-play';
        btnPlay.innerText = '▶ 开始';
    }
    speedLabel.innerText = '速度 ' + formatSpeed(currentState.speed);
}

function sendCommand(action) {
    ajaxRequest('POST', '/api/command', {action: action});
}

function updateState(partialState) {
    for(var key in partialState) currentState[key] = partialState[key];
    updateUI();
    ajaxRequest('POST', '/api/update_state', partialState);
}

function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function roundSpeed(value) {
    return Math.round(value * 10) / 10;
}

function formatSpeed(value) {
    return roundSpeed(parseFloat(value) || SPEED_MIN).toFixed(1);
}

function adjustSpeed(delta) {
    if (!currentState) return;
    var currentSpeed = parseFloat(currentState.speed) || SPEED_MIN;
    var nextSpeed = roundSpeed(clamp(currentSpeed + delta, SPEED_MIN, SPEED_MAX));
    updateState({ speed: nextSpeed });
}

btnPlay.onclick = function() {
    if (!currentState) return;
    updateState({ isPlaying: !currentState.isPlaying });
};

document.getElementById('btnUp').onclick = function() { sendCommand('SCROLL_UP'); };
document.getElementById('btnFastForward').onclick = function() { sendCommand('FAST_FORWARD'); };
document.getElementById('btnSlower').onclick = function() { adjustSpeed(-SPEED_STEP); };
document.getElementById('btnFaster').onclick = function() { adjustSpeed(SPEED_STEP); };

document.getElementById('btnReset').onclick = function() { 
    sendCommand('RESET_SCROLL'); 
    if (currentState) updateState({ isPlaying: false });
};

document.onkeydown = function(e) {
    var event = e || window.event;
    var key = event.key || event.keyCode;
    if (key === 'F3' || key === 114) { 
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        btnPlay.onclick(); 
    }
    if (key === 'F4' || key === 115) { 
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        sendCommand('SCROLL_UP'); 
    }
    if (key === 'F7' || key === 118) { 
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        document.getElementById('btnReset').onclick(); 
    }
    if (key === 'F5' || key === 116) {
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        adjustSpeed(-SPEED_STEP);
    }
    if (key === 'F6' || key === 117) {
        if(event.preventDefault) event.preventDefault(); else event.returnValue = false;
        adjustSpeed(SPEED_STEP);
    }
};
