const { useState, useEffect, useRef, useCallback } = React;

const IconPlay = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>;
const IconPause = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>;
const IconSmartphone = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IconMonitor = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconSettings = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconAlignCenter = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>;
const IconFlipHorizontal = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8 3 8 21 4 12 8 3"/><polyline points="16 3 16 21 20 12 16 3"/><line x1="12" y1="3" x2="12" y2="21"/></svg>;
const IconRotateCcw = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>;
const IconChevronUp = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>;
const IconRemote = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><circle cx="12" cy="18" r="1"/><path d="M12 6v6"/></svg>;
const IconFastForward = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9 0l8.5-6-8.5-6v12z"/></svg>;

function App() {
    const [mode, setMode] = useState(() => {
        const path = window.location.pathname;
        if (path === '/s') return 'controller';
        if (path === '/d') return 'display';
        return 'select';
    });
    
    if (mode === 'select') return <RoleSelection setMode={setMode} />;
    if (mode === 'controller') return <ControllerView onExit={() => setMode('select')} />;
    if (mode === 'display') return <DisplayView onExit={() => setMode('select')} />;
    return null;
}

function RoleSelection({ setMode }) {
    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6">
            <div className="text-center max-w-4xl w-full">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Poprompter</h1>
                <p className="text-neutral-400 mb-12 text-lg">支持多级调控、快捷指令直达及跨设备无缝同步。</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <button onClick={() => setMode('controller')} className="flex flex-col items-center p-8 bg-neutral-800 hover:bg-blue-600 rounded-2xl transition-all duration-300 group border border-neutral-700">
                        <IconSmartphone className="w-16 h-16 mb-6 text-blue-400 group-hover:text-white transition-colors" />
                        <h2 className="text-xl font-semibold mb-2">标准控制端</h2>
                        <p className="text-sm text-neutral-400 group-hover:text-blue-100 text-center">输入文本、调整外观 (快捷路径 /s)</p>
                    </button>
                    
                    <button onClick={() => window.location.href='/k'} className="flex flex-col items-center p-8 bg-neutral-800 hover:bg-purple-600 rounded-2xl transition-all duration-300 group border border-neutral-700">
                        <IconRemote className="w-16 h-16 mb-6 text-purple-400 group-hover:text-white transition-colors" />
                        <h2 className="text-xl font-semibold mb-2">纯净控制器</h2>
                        <p className="text-sm text-neutral-400 group-hover:text-purple-100 text-center">兼容老设备极简遥控 (快捷路径 /k)</p>
                    </button>

                    <button onClick={() => setMode('display')} className="flex flex-col items-center p-8 bg-neutral-800 hover:bg-green-600 rounded-2xl transition-all duration-300 group border border-neutral-700">
                        <IconMonitor className="w-16 h-16 mb-6 text-green-400 group-hover:text-white transition-colors" />
                        <h2 className="text-xl font-semibold mb-2">提词器屏幕</h2>
                        <p className="text-sm text-neutral-400 group-hover:text-green-100 text-center">在此屏幕显示画面 (快捷路径 /d)</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

const getWsUrl = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
};

const createClientId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const SPEED_MIN = 1;
const SPEED_MAX = 5;
const SPEED_STEP = 0.1;

const roundSpeed = (value) => Math.round(value * 10) / 10;
const formatSpeed = (value) => roundSpeed(parseFloat(value) || SPEED_MIN).toFixed(1);

const formatDuration = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${rest}`;
};

function ControllerView({ onExit }) {
    const [config, setConfig] = useState(null);
    const [logs, setLogs] = useState([]);
    const [displayStatus, setDisplayStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');
    const wsRef = useRef(null);
    const clientIdRef = useRef(createClientId('controller'));
    const scriptPreviewRef = useRef(null);

    useEffect(() => {
        let reconnectTimer = null;
        let closedByUnmount = false;

        const connect = () => {
            const socket = new WebSocket(getWsUrl());
            wsRef.current = socket;

            socket.onopen = () => {
                socket.send(JSON.stringify({ type: 'REGISTER_ROLE', role: 'controller', clientId: clientIdRef.current }));
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'SYNC_STATE') setConfig(data.payload);
                if (data.type === 'SYNC_LOGS') setLogs(data.payload);
                if (data.type === 'DISPLAY_STATUS') setDisplayStatus(data.payload);
            };

            socket.onclose = () => {
                if (!closedByUnmount) {
                    reconnectTimer = setTimeout(connect, 1000);
                }
            };

            socket.onerror = () => {
                socket.close();
            };
        };

        connect();

        return () => {
            closedByUnmount = true;
            clearTimeout(reconnectTimer);
            if (wsRef.current) wsRef.current.close();
        };
    }, []);

    const broadcastState = (newState) => {
        setConfig(newState);
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'SYNC_STATE', payload: newState }));
        }
    };

    const updateConfig = (key, value) => {
        if(!config) return;
        broadcastState({ ...config, [key]: value });
    };

    const sendCommand = (action, extraParams = {}) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'COMMAND', action, ...extraParams }));
        }
    };

    const togglePlay = () => { if (config) updateConfig('isPlaying', !config.isPlaying); };
    const resetScroll = () => { sendCommand('RESET_SCROLL'); updateConfig('isPlaying', false); };
    const scrollUp = () => sendCommand('SCROLL_UP');
    const fastForward = () => sendCommand('FAST_FORWARD');
    const forceFullscreen = () => sendCommand('FULLSCREEN');
    const preventSleep = () => sendCommand('WAKE_LOCK');
    const adjustSpeed = (delta) => {
        if (!config) return;
        updateConfig('speed', roundSpeed(clamp((parseFloat(config.speed) || SPEED_MIN) + delta, SPEED_MIN, SPEED_MAX)));
    };

    const progressPercent = displayStatus ? Math.round(displayStatus.progress * 100) : 0;
    const remainingTime = displayStatus ? formatDuration(displayStatus.remainingSeconds) : '--:--';
    const strictSyncEnabled = config ? config.strictSync !== false : true;
    const textLocked = Boolean(config && config.isPlaying);
    const visibleLineSet = new Set(displayStatus && displayStatus.visibleLineIndexes ? displayStatus.visibleLineIndexes : []);
    const currentLineIndex = displayStatus && Number.isFinite(displayStatus.currentLineIndex) ? displayStatus.currentLineIndex : -1;
    const currentRowText = displayStatus && displayStatus.currentRowText ? displayStatus.currentRowText : '';
    const currentRowStart = displayStatus && Number.isFinite(displayStatus.currentRowStart) ? displayStatus.currentRowStart : -1;
    const currentRowEnd = displayStatus && Number.isFinite(displayStatus.currentRowEnd) ? displayStatus.currentRowEnd : -1;
    const scriptLines = config ? config.text.split('\n') : [];
    const currentTextNeedle = currentRowText.trim();
    const currentTextLineIndex = currentTextNeedle
        ? scriptLines.findIndex(line => line.includes(currentTextNeedle))
        : -1;
    const effectiveCurrentLineIndex = currentTextNeedle && !((scriptLines[currentLineIndex] || '').includes(currentTextNeedle))
        ? currentTextLineIndex
        : currentLineIndex;

    const renderHighlightedLine = (line, lineIndex) => {
        const rows = displayStatus && displayStatus.visibleRows
            ? displayStatus.visibleRows
                .filter(row => row.lineIndex === lineIndex && Number.isFinite(row.start) && Number.isFinite(row.end))
                .sort((a, b) => a.start - b.start || a.end - b.end)
            : [];
        if (!line) return ' ';

        const currentNeedleIndex = lineIndex === effectiveCurrentLineIndex && currentTextNeedle
            ? line.indexOf(currentTextNeedle)
            : -1;
        const currentNeedleRange = currentNeedleIndex >= 0
            ? { start: currentNeedleIndex, end: currentNeedleIndex + currentTextNeedle.length }
            : null;
        if (!rows.length && !currentNeedleRange) return line || ' ';

        const boundaries = new Set([0, line.length]);
        rows.forEach(row => {
            boundaries.add(clamp(row.start, 0, line.length));
            boundaries.add(clamp(row.end, 0, line.length));
        });
        if (currentNeedleRange) {
            boundaries.add(currentNeedleRange.start);
            boundaries.add(currentNeedleRange.end);
        }
        const points = Array.from(boundaries).sort((a, b) => a - b);
        let cursor = 0;

        const segments = [];
        points.forEach((point) => {
            if (point <= cursor) return;
            const start = cursor;
            const end = point;
            const isCurrent = lineIndex === effectiveCurrentLineIndex && (
                (lineIndex === currentLineIndex && start < currentRowEnd && end > currentRowStart) ||
                (currentNeedleRange && start < currentNeedleRange.end && end > currentNeedleRange.start) ||
                (currentTextNeedle && line.slice(start, end).includes(currentTextNeedle)) ||
                (currentTextNeedle && currentTextNeedle.includes(line.slice(start, end).trim()))
            );
            const isVisible = rows.some(row => start < row.end && end > row.start);
            segments.push({
                text: line.slice(start, end),
                tone: isCurrent ? 'current' : isVisible ? 'visible' : 'normal'
            });
            cursor = point;
        });

        if (!segments.length) return line || ' ';

        return segments.map((segment, index) => {
            if (segment.tone === 'current') {
                return <mark key={index} data-current-row="true" className="bg-neutral-500/60 text-white font-bold px-1 rounded">{segment.text}</mark>;
            }
            if (segment.tone === 'visible') {
                return <mark key={index} className="bg-neutral-700/35 text-neutral-100 px-1 rounded">{segment.text}</mark>;
            }
            return <React.Fragment key={index}>{segment.text}</React.Fragment>;
        });
    };

    const renderScriptPreview = () => {
        const lines = scriptLines;
        return (
            <div ref={scriptPreviewRef} className="flex-1 overflow-y-auto bg-neutral-950 p-6 text-lg leading-relaxed whitespace-pre-wrap">
                {lines.map((line, index) => {
                    const isCurrentLine = index === effectiveCurrentLineIndex;
                    const isVisibleLine = visibleLineSet.has(index);
                    const classes = [
                        'block min-h-[1.7em] px-2 py-1 rounded transition-colors',
                        isCurrentLine ? 'bg-neutral-500/45 text-white font-bold' : '',
                        !isCurrentLine && isVisibleLine ? 'bg-neutral-700/25 text-neutral-100' : '',
                        !isCurrentLine && !isVisibleLine ? 'text-neutral-400' : ''
                    ].filter(Boolean).join(' ');
                    return <span key={index} data-controller-line-index={index} className={classes}>{renderHighlightedLine(line, index)}</span>;
                })}
            </div>
        );
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F3') { e.preventDefault(); togglePlay(); }
            else if (e.key === 'F4') { e.preventDefault(); scrollUp(); }
            else if (e.key === 'F5') { e.preventDefault(); adjustSpeed(-SPEED_STEP); }
            else if (e.key === 'F6') { e.preventDefault(); adjustSpeed(SPEED_STEP); }
            else if (e.key === 'F7') { e.preventDefault(); resetScroll(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [config]);

    useEffect(() => {
        if (!textLocked || effectiveCurrentLineIndex < 0 || !scriptPreviewRef.current) return;
        const lineEl = scriptPreviewRef.current.querySelector(`[data-controller-line-index="${effectiveCurrentLineIndex}"]`);
        const currentMark = scriptPreviewRef.current.querySelector('[data-current-row="true"]');
        const targetEl = currentMark || lineEl;
        if (!targetEl) return;
        const container = scriptPreviewRef.current;
        const targetTop = targetEl.offsetTop - container.clientHeight * 0.35;
        container.scrollTo({ top: Math.max(0, targetTop), behavior: config.lowPerformance ? 'auto' : 'smooth' });
    }, [textLocked, effectiveCurrentLineIndex, currentRowStart, currentRowText, config && config.lowPerformance]);

    if (!config) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">连接服务器中...</div>;

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col border-r border-neutral-800">
                <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><IconSmartphone className="w-5 h-5 text-blue-400" /> 控制端</h2>
                    <button onClick={onExit} className="text-sm text-neutral-400 hover:text-white">退出</button>
                </div>
                {textLocked && (
                    <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-400 flex items-center justify-between gap-3">
                        <span>{strictSyncEnabled ? '严格同步播放中，稿件已锁定' : '播放中，稿件已锁定'}</span>
                        <span className="truncate">{currentRowText ? `参考线当前行：${currentRowText}` : '等待显示端行数据'}</span>
                    </div>
                )}
                {textLocked ? (
                    renderScriptPreview()
                ) : (
                    <textarea
                        className="flex-1 w-full p-6 bg-neutral-950 text-lg resize-none focus:outline-none leading-relaxed"
                        value={config.text}
                        onChange={(e) => updateConfig('text', e.target.value)}
                        placeholder="在此输入您的稿件..."
                    />
                )}
            </div>

            <div className="w-full md:w-[420px] bg-neutral-900 flex flex-col shadow-2xl z-10 h-screen">
                <div className="p-6 border-b border-neutral-800 flex flex-col items-center gap-6">
                    <button
                        onClick={togglePlay}
                        className={`w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-all ${
                            config.isPlaying ? 'bg-neutral-800 text-red-500 hover:bg-neutral-700 border-2 border-red-500/30' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'
                        }`}
                    >
                        {config.isPlaying ? <IconPause className="w-14 h-14" /> : <IconPlay className="w-14 h-14 ml-2" />}
                    </button>
                    
                    <div className="w-full flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <button onClick={scrollUp} className="py-2.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center gap-1 font-medium">
                                <IconChevronUp className="w-4 h-4 text-blue-400" /> 向上微调
                            </button>
                            <button onClick={fastForward} className="py-2.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center gap-1 font-medium">
                                <IconFastForward className="w-4 h-4 text-blue-400" /> 快速前进
                            </button>
                        </div>
                        <button onClick={resetScroll} className="mt-1 mx-auto py-1.5 px-4 text-xs bg-neutral-800/50 hover:bg-neutral-700/80 rounded-full flex items-center justify-center gap-1 font-medium text-neutral-400 transition-colors">
                            <IconRotateCcw className="w-3 h-3" /> 回到开头
                        </button>
                    </div>

                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                            <span>显示端进度</span>
                            <span>{displayStatus ? `${progressPercent}% · 剩余 ${remainingTime}` : '等待显示端'}</span>
                        </div>
                        <div className="h-2 w-full rounded bg-neutral-800 overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all" style={{ width: `${displayStatus ? progressPercent : 0}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex border-b border-neutral-800 shrink-0">
                    <button onClick={() => setActiveTab('basic')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'basic' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-neutral-500 hover:text-neutral-300'}`}>基础设置</button>
                    <button onClick={() => setActiveTab('advanced')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'advanced' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-neutral-500 hover:text-neutral-300'}`}>高级</button>
                </div>

                {activeTab === 'basic' && (
                    <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconSettings className="w-4 h-4" /> 滚动速度</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{formatSpeed(config.speed)}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => adjustSpeed(-SPEED_STEP)} className="py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded">慢一点</button>
                                <button onClick={() => updateConfig('speed', 3)} className="py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded">常速</button>
                                <button onClick={() => adjustSpeed(SPEED_STEP)} className="py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded">快一点</button>
                            </div>
                            <input type="range" min={SPEED_MIN} max={SPEED_MAX} step={SPEED_STEP} value={config.speed} onChange={(e) => updateConfig('speed', roundSpeed(parseFloat(e.target.value)))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconAlignCenter className="w-4 h-4" /> 画面占比</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.lineWidth}%</span>
                            </div>
                            <input type="range" min="30" max="100" step="5" value={config.lineWidth} onChange={(e) => updateConfig('lineWidth', parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconAlignCenter className="w-4 h-4" /> 参考线位置</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.guidePosition || 50}%</span>
                            </div>
                            <input type="range" min="35" max="70" step="1" value={config.guidePosition || 50} onChange={(e) => updateConfig('guidePosition', parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconAlignCenter className="w-4 h-4" /> 文本对齐</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.textAlign || 'left'}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {['left', 'center', 'right'].map(align => (
                                    <button key={align} onClick={() => updateConfig('textAlign', align)} className={`py-2 text-sm rounded ${config.textAlign === align || (!config.textAlign && align === 'left') ? 'bg-blue-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'}`}>
                                        {align === 'left' ? '左对齐' : align === 'center' ? '居中' : '右对齐'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                            <input type="checkbox" checked={config.autoPauseAtEnd !== false} onChange={e => updateConfig('autoPauseAtEnd', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                            到达稿件末尾后自动暂停
                        </label>
                    </div>
                )}

                {activeTab === 'advanced' && (
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">系统性能与显示</h3>
                            <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                                <input type="checkbox" checked={config.lowPerformance} onChange={e => updateConfig('lowPerformance', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                                低配置模式 (取消动画减缓卡顿)
                            </label>
                            <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                                <input type="checkbox" checked={config.strictSync !== false} onChange={e => updateConfig('strictSync', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                                严格同步显示端进度
                            </label>
                            <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                                <input type="checkbox" checked={config.flipVertical} onChange={e => updateConfig('flipVertical', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                                上下翻转 (适配特殊反射结构)
                            </label>
                            <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                                <input type="checkbox" checked={config.mirror} onChange={e => updateConfig('mirror', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                                左右镜像翻转
                            </label>
                            <label className="flex items-center gap-3 text-sm text-neutral-300 bg-neutral-950 p-2 rounded border border-neutral-800 cursor-pointer">
                                <input type="checkbox" checked={config.invertColors} onChange={e => updateConfig('invertColors', e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 w-4 h-4 accent-blue-500" />
                                反转颜色 (亮色模式)
                            </label>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">外观色彩 (HEXA)</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-neutral-400 mb-1 block">字体颜色/亮度</label>
                                    <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded border border-neutral-800">
                                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{backgroundColor: config.fontColor}}></div>
                                        <input type="text" value={config.fontColor} onChange={e => updateConfig('fontColor', e.target.value)} className="bg-transparent text-xs w-full focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-neutral-400 mb-1 block">基准线颜色</label>
                                    <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded border border-neutral-800">
                                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{backgroundColor: config.guideColor}}></div>
                                        <input type="text" value={config.guideColor} onChange={e => updateConfig('guideColor', e.target.value)} className="bg-transparent text-xs w-full focus:outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-neutral-400 mb-1 block">辅助块高度</label>
                                    <input type="number" value={config.aidBlockHeight} onChange={e => updateConfig('aidBlockHeight', parseInt(e.target.value))} className="bg-neutral-950 text-xs w-full p-1.5 rounded border border-neutral-800 focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">设备控制 & 快捷键</h3>
                            <p className="text-[10px] text-neutral-500 leading-relaxed mb-2">
                                快捷键：<kbd className="bg-neutral-800 px-1 rounded">F3</kbd> 开始/暂停, <kbd className="bg-neutral-800 px-1 rounded">F4</kbd> 向上微调, <kbd className="bg-neutral-800 px-1 rounded">F7</kbd> 重新开始
                            </p>
                            <button onClick={forceFullscreen} className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm transition-colors border border-neutral-700">
                                强制显示端进入全屏 (F11)
                            </button>
                            <button onClick={preventSleep} className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm transition-colors border border-neutral-700">
                                防止显示端进入休眠 (唤醒锁定)
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">连接日志</h3>
                            <div className="h-32 bg-neutral-950 rounded p-3 overflow-y-auto text-[10px] font-mono text-neutral-400 space-y-1 border border-neutral-800">
                                {logs.map((log, i) => <div key={i}>{log}</div>)}
                                {logs.length === 0 && <div>暂无连接记录...</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DisplayView({ onExit }) {
    const [config, setConfig] = useState(null);
    const [connected, setConnected] = useState(false);
    const [toastMsg, setToastMsg] = useState(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const wsRef = useRef(null);
    const requestRef = useRef();
    const wakeLockRef = useRef(null);
    const keepAwakeFallbackRef = useRef(null);
    const lastStatusSentRef = useRef(0);
    const endPauseSentRef = useRef(false);
    const lastLeaderStatusAtRef = useRef(0);
    const clientIdRef = useRef(createClientId('display'));
    
    const configRef = useRef(config);
    useEffect(() => { configRef.current = config; }, [config]);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };

    const requestFullscreenCompat = () => {
        const target = document.documentElement;
        const requestFullscreen =
            target.requestFullscreen ||
            target.webkitRequestFullscreen ||
            target.mozRequestFullScreen ||
            target.msRequestFullscreen;

        if (!requestFullscreen) {
            showToast("当前浏览器不支持远程全屏控制");
            return;
        }

        Promise.resolve(requestFullscreen.call(target)).then(() => {
            showToast("已进入全屏模式");
        }).catch(() => {
            showToast("全屏失败：浏览器需要您先点击一次屏幕授权");
        });
    };

    const stopKeepAwakeFallback = () => {
        if (!keepAwakeFallbackRef.current) return;
        const { video, intervalId, stream } = keepAwakeFallbackRef.current;
        clearInterval(intervalId);
        if (stream) stream.getTracks().forEach(track => track.stop());
        if (video && video.parentNode) video.parentNode.removeChild(video);
        keepAwakeFallbackRef.current = null;
    };

    const startKeepAwakeFallback = () => {
        if (keepAwakeFallbackRef.current) {
            showToast("已开启兼容防休眠模式");
            return;
        }

        const canvas = document.createElement('canvas');
        if (!canvas.captureStream) {
            showToast("当前浏览器不支持防休眠");
            return;
        }

        canvas.width = 2;
        canvas.height = 2;
        const ctx = canvas.getContext('2d');
        let frame = 0;
        const drawFrame = () => {
            ctx.fillStyle = frame % 2 ? '#000' : '#111';
            ctx.fillRect(0, 0, 2, 2);
            frame += 1;
        };
        drawFrame();

        const stream = canvas.captureStream(1);
        const video = document.createElement('video');
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-10px;top:-10px;';
        video.srcObject = stream;
        document.body.appendChild(video);

        const intervalId = setInterval(drawFrame, 15000);
        keepAwakeFallbackRef.current = { video, intervalId, stream };
        Promise.resolve(video.play()).then(() => {
            showToast("已开启兼容防休眠模式");
        }).catch(() => {
            stopKeepAwakeFallback();
            showToast("防休眠失败：请先点击一次显示屏幕");
        });
    };

    const requestWakeLockCompat = () => {
        if ('wakeLock' in navigator && window.isSecureContext) {
            navigator.wakeLock.request('screen').then((lock) => {
                wakeLockRef.current = lock;
                showToast("已成功开启防止休眠");
            }).catch(() => {
                startKeepAwakeFallback();
            });
            return;
        }

        startKeepAwakeFallback();
    };

    const getRowsForLine = (lineEl, lineIndex) => {
        const text = lineEl.textContent || ' ';
        const node = lineEl.firstChild;
        const fallbackRect = lineEl.getBoundingClientRect();
        if (!node || node.nodeType !== Node.TEXT_NODE || text.length === 0 || !text.trim()) {
            return [{
                lineIndex,
                rowIndex: 0,
                start: 0,
                end: text.length,
                text,
                top: fallbackRect.top,
                bottom: fallbackRect.bottom
            }];
        }

        const range = document.createRange();
        const rows = [];
        for (let i = 0; i < text.length; i += 1) {
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rects = range.getClientRects();
            if (!rects.length) continue;
            const rect = rects[0];
            let row = rows[rows.length - 1];
            if (!row || Math.abs(row.top - rect.top) > 3) {
                row = {
                    lineIndex,
                    rowIndex: rows.length,
                    start: i,
                    end: i + 1,
                    top: rect.top,
                    bottom: rect.bottom
                };
                rows.push(row);
            } else {
                row.end = i + 1;
                row.top = Math.min(row.top, rect.top);
                row.bottom = Math.max(row.bottom, rect.bottom);
            }
        }
        range.detach();

        if (!rows.length) {
            return [{
                lineIndex,
                rowIndex: 0,
                start: 0,
                end: text.length,
                text,
                top: fallbackRect.top,
                bottom: fallbackRect.bottom
            }];
        }

        return rows.map(row => ({
            lineIndex: row.lineIndex,
            rowIndex: row.rowIndex,
            start: row.start,
            end: row.end,
            text: text.slice(row.start, row.end).trim() || text.slice(row.start, row.end) || ' ',
            top: row.top,
            bottom: row.bottom
        }));
    };

    const getVisibleTextStatus = () => {
        const content = contentRef.current;
        if (!content) {
            return {
                currentLineIndex: -1,
                currentRowText: '',
                visibleLineIndexes: [],
                visibleRows: []
            };
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const activeConfig = configRef.current || {};
        const guideY = viewportHeight * ((activeConfig.guidePosition || 50) / 100);
        const visibleLineIndexes = new Set();
        const visibleRows = [];
        let currentRow = null;
        let currentTextRow = null;
        let nearestRow = null;
        let nearestTextRow = null;
        let nearestDistance = Infinity;
        let nearestTextDistance = Infinity;

        content.querySelectorAll('[data-line-index]').forEach((lineEl) => {
            const lineRect = lineEl.getBoundingClientRect();
            if (lineRect.bottom < 0 || lineRect.top > viewportHeight) return;

            const lineIndex = parseInt(lineEl.getAttribute('data-line-index'), 10);
            visibleLineIndexes.add(lineIndex);

            getRowsForLine(lineEl, lineIndex).forEach((row) => {
                if (row.bottom < 0 || row.top > viewportHeight) return;
                const rowPayload = {
                    lineIndex: row.lineIndex,
                    rowIndex: row.rowIndex,
                    start: row.start,
                    end: row.end,
                    text: row.text,
                    top: Math.round(row.top),
                    bottom: Math.round(row.bottom)
                };
                visibleRows.push(rowPayload);

                if (row.top <= guideY && row.bottom >= guideY) {
                    currentRow = rowPayload;
                    if (rowPayload.text.trim()) {
                        currentTextRow = rowPayload;
                    }
                }

                const rowCenter = (row.top + row.bottom) / 2;
                const distance = Math.abs(rowCenter - guideY);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestRow = rowPayload;
                }
                if (rowPayload.text.trim() && distance < nearestTextDistance) {
                    nearestTextDistance = distance;
                    nearestTextRow = rowPayload;
                }
            });
        });

        const selectedRow = currentTextRow || nearestTextRow || currentRow || nearestRow;
        return {
            currentLineIndex: selectedRow ? selectedRow.lineIndex : -1,
            currentRowText: selectedRow ? selectedRow.text : '',
            currentRowStart: selectedRow ? selectedRow.start : 0,
            currentRowEnd: selectedRow ? selectedRow.end : 0,
            visibleLineIndexes: Array.from(visibleLineIndexes),
            visibleRows: visibleRows.slice(0, 40)
        };
    };

    const sendDisplayStatus = () => {
        const container = containerRef.current;
        const socket = wsRef.current;
        const activeConfig = configRef.current;
        if (!container || !socket || socket.readyState !== WebSocket.OPEN || !activeConfig) return;

        const now = Date.now();
        if (now - lastStatusSentRef.current < 120) return;
        lastStatusSentRef.current = now;

        const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
        const remainingPixels = Math.max(0, maxScroll - container.scrollTop);
        const pixelsPerSecond = Math.max(1, (parseFloat(activeConfig.speed) || 1) * 30);
        const progress = maxScroll > 0 ? clamp(container.scrollTop / maxScroll, 0, 1) : 0;
        const visibleTextStatus = getVisibleTextStatus();

        socket.send(JSON.stringify({
            type: 'DISPLAY_STATUS',
            payload: {
                progress,
                scrollTop: Math.round(container.scrollTop),
                scrollHeight: container.scrollHeight,
                clientHeight: container.clientHeight,
                maxScroll,
                remainingSeconds: remainingPixels / pixelsPerSecond,
                ...visibleTextStatus
            }
        }));
    };

    const pauseAtEndIfNeeded = () => {
        const container = containerRef.current;
        const socket = wsRef.current;
        const activeConfig = configRef.current;
        if (!container || !socket || socket.readyState !== WebSocket.OPEN || !activeConfig) return;

        const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
        const reachedEnd = maxScroll > 0 && container.scrollTop >= maxScroll - 2;
        if (!activeConfig.isPlaying || !reachedEnd) {
            endPauseSentRef.current = false;
            return;
        }

        if (activeConfig.autoPauseAtEnd !== false && !endPauseSentRef.current) {
            endPauseSentRef.current = true;
            socket.send(JSON.stringify({
                type: 'SYNC_STATE',
                payload: { ...activeConfig, isPlaying: false }
            }));
            showToast("已到达稿件末尾");
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        let reconnectTimer = null;
        let closedByUnmount = false;

        const connect = () => {
            const socket = new WebSocket(getWsUrl());
            wsRef.current = socket;

            socket.onopen = () => {
                socket.send(JSON.stringify({ type: 'REGISTER_ROLE', role: 'display', clientId: clientIdRef.current }));
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'SYNC_STATE') {
                    setConfig(data.payload);
                    setConnected(true);
                } else if (data.type === 'COMMAND') {
                    if (data.action === 'RESET_SCROLL') {
                        if (containerRef.current) containerRef.current.scrollTop = 0;
                    } else if (data.action === 'SCROLL_UP') {
                        if (containerRef.current && configRef.current) {
                            containerRef.current.scrollTop -= configRef.current.aidBlockHeight;
                        }
                    } else if (data.action === 'FAST_FORWARD') {
                        if (containerRef.current && configRef.current) {
                            containerRef.current.scrollTop += configRef.current.aidBlockHeight;
                        }
                    } else if (data.action === 'FULLSCREEN') {
                        requestFullscreenCompat();
                    } else if (data.action === 'WAKE_LOCK') {
                        requestWakeLockCompat();
                    }
                } else if (data.type === 'DISPLAY_STATUS') {
                    const payload = data.payload || {};
                    if (payload.sourceId !== clientIdRef.current && configRef.current && configRef.current.strictSync !== false && containerRef.current) {
                        lastLeaderStatusAtRef.current = Date.now();
                        const localMaxScroll = Math.max(0, containerRef.current.scrollHeight - containerRef.current.clientHeight);
                        const targetScroll = Number.isFinite(payload.maxScroll) && Math.abs(localMaxScroll - payload.maxScroll) > 2
                            ? clamp(payload.progress || 0, 0, 1) * localMaxScroll
                            : payload.scrollTop;
                        if (Number.isFinite(targetScroll) && Math.abs(containerRef.current.scrollTop - targetScroll) > 1) {
                            containerRef.current.scrollTop = targetScroll;
                        }
                    }
                }
            };

            socket.onclose = () => {
                setConnected(false);
                if (!closedByUnmount) {
                    reconnectTimer = setTimeout(connect, 1000);
                }
            };

            socket.onerror = () => {
                socket.close();
            };
        };

        connect();

        return () => {
            closedByUnmount = true;
            clearTimeout(reconnectTimer);
            document.body.style.overflow = 'auto';
            if (wsRef.current) wsRef.current.close();
            cancelAnimationFrame(requestRef.current);
            if (wakeLockRef.current) {
                Promise.resolve(wakeLockRef.current.release()).catch(() => {});
                wakeLockRef.current = null;
            }
            stopKeepAwakeFallback();
        };
    }, []);

    const animateScroll = useCallback(() => {
        const followingLeader = configRef.current && configRef.current.strictSync !== false && Date.now() - lastLeaderStatusAtRef.current < 1200;
        if (configRef.current && configRef.current.isPlaying && containerRef.current && !followingLeader) {
            containerRef.current.scrollTop += configRef.current.speed * 0.5;
        }
        pauseAtEndIfNeeded();
        sendDisplayStatus();
        requestRef.current = requestAnimationFrame(animateScroll);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateScroll);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animateScroll]);

    if (!config) return <div className="absolute inset-0 flex items-center justify-center text-neutral-500 z-40 bg-black">正在连接服务器...</div>;

    const renderTextBlocks = () => {
        return config.text.split('\\n').map((para, index) => {
            return (
                <div key={index} data-line-index={index} className="para-block min-h-[1.5em]">
                    {para || ' '}
                </div>
            );
        });
    };

    const transformStyle = [
        config.mirror ? 'scaleX(-1)' : '',
        config.flipVertical ? 'scaleY(-1)' : ''
    ].filter(Boolean).join(' ') || 'none';

    const filterStyle = config.invertColors ? 'invert(1) hue-rotate(180deg)' : 'none';
    const guidePosition = config.guidePosition || 50;
    const textAlign = config.textAlign || 'left';
    const leadPadding = Math.min(85, guidePosition + 10);

    return (
        <div className="h-screen w-screen bg-black text-white relative flex flex-col" style={{ filter: filterStyle, transition: 'filter 0.3s' }}>
            {toastMsg && (
                <div className="absolute bottom-6 left-6 z-50 px-5 py-3 bg-blue-600/90 backdrop-blur text-white rounded shadow-lg text-sm font-medium animate-bounce">
                    {toastMsg}
                </div>
            )}

            <div className="absolute top-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
                <button onClick={onExit} className="px-4 py-2 bg-neutral-800/80 rounded text-sm backdrop-blur">退出/返回</button>
            </div>

            <div ref={containerRef} className="flex-1 overflow-y-hidden relative no-scrollbar">
                {config.isPlaying && (
                    <>
                        <div className="fixed left-0 w-full z-0 pointer-events-none" style={{
                                top: `${guidePosition}%`, transform: 'translateY(-50%)',
                                height: `${config.aidBlockHeight}px`, backgroundColor: config.aidBlockColor,
                                transition: config.lowPerformance ? 'none' : 'background-color 0.3s ease'
                            }}></div>
                        <div className="fixed left-0 w-full h-px z-0 pointer-events-none" style={{
                                top: `${guidePosition}%`,
                                backgroundColor: config.guideColor, boxShadow: `0 0 8px ${config.guideColor}`,
                                transition: config.lowPerformance ? 'none' : 'background-color 0.3s ease'
                            }}></div>
                    </>
                )}

                <div className="mx-auto min-h-full flex flex-col relative z-10" style={{ 
                        width: `${config.lineWidth}%`, transform: transformStyle, 
                        transition: config.lowPerformance ? 'none' : 'width 0.3s ease' 
                    }}>
                    <div style={{ height: `${leadPadding}vh` }}></div>
                    
                    <div ref={contentRef} className="whitespace-pre-wrap font-bold leading-relaxed text-7xl" style={{
                            color: config.fontColor, textAlign, textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                            transition: config.lowPerformance ? 'none' : 'color 0.3s ease'
                        }}>
                        {renderTextBlocks()}
                    </div>
                    
                    <div style={{ height: '100vh' }}></div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
