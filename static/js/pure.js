var currentState = null;
var btnPlay = document.getElementById('btnPlay');
var statusDiv = document.getElementById('status');
var themeToggleBtn = document.getElementById('themeToggle');
var isLightTheme = false;

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
}

function sendCommand(action) {
    ajaxRequest('POST', '/api/command', {action: action});
}

function updateState(partialState) {
    for(var key in partialState) currentState[key] = partialState[key];
    updateUI();
    ajaxRequest('POST', '/api/update_state', partialState);
}

btnPlay.onclick = function() {
    if (!currentState) return;
    updateState({ isPlaying: !currentState.isPlaying });
};

document.getElementById('btnUp').onclick = function() { sendCommand('SCROLL_UP'); };
document.getElementById('btnFastForward').onclick = function() { sendCommand('FAST_FORWARD'); };

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
};
