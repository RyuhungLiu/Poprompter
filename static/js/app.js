const { useState, useEffect, useRef, useCallback } = React;

const IconPlay = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>;
const IconPause = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>;
const IconSmartphone = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IconMonitor = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconSettings = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconType = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
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

function ControllerView({ onExit }) {
    const [config, setConfig] = useState(null);
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('basic');
    const wsRef = useRef(null);

    useEffect(() => {
        wsRef.current = new WebSocket(getWsUrl());
        wsRef.current.onopen = () => {
            wsRef.current.send(JSON.stringify({ type: 'REGISTER_ROLE', role: 'controller' }));
        };
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'SYNC_STATE') setConfig(data.payload);
            if (data.type === 'SYNC_LOGS') setLogs(data.payload);
        };
        return () => wsRef.current.close();
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F3') { e.preventDefault(); togglePlay(); }
            else if (e.key === 'F4') { e.preventDefault(); scrollUp(); }
            else if (e.key === 'F7') { e.preventDefault(); resetScroll(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [config]);

    if (!config) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">连接服务器中...</div>;

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col border-r border-neutral-800">
                <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><IconSmartphone className="w-5 h-5 text-blue-400" /> 控制端</h2>
                    <button onClick={onExit} className="text-sm text-neutral-400 hover:text-white">退出</button>
                </div>
                <textarea
                    className="flex-1 w-full p-6 bg-neutral-950 text-lg resize-none focus:outline-none leading-relaxed"
                    value={config.text}
                    onChange={(e) => updateConfig('text', e.target.value)}
                    placeholder="在此输入您的稿件..."
                />
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
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.speed}</span>
                            </div>
                            <input type="range" min="1" max="15" step="0.5" value={config.speed} onChange={(e) => updateConfig('speed', parseFloat(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconType className="w-4 h-4" /> 字体大小</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.fontSize}px</span>
                            </div>
                            <input type="range" min="30" max="150" step="1" value={config.fontSize} onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm text-neutral-400">
                                <span className="flex items-center gap-2"><IconAlignCenter className="w-4 h-4" /> 画面占比</span>
                                <span className="text-white bg-neutral-800 px-2 py-1 rounded">{config.lineWidth}%</span>
                            </div>
                            <input type="range" min="30" max="100" step="5" value={config.lineWidth} onChange={(e) => updateConfig('lineWidth', parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none accent-blue-500" />
                        </div>
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
    const wsRef = useRef(null);
    const requestRef = useRef();
    
    const configRef = useRef(config);
    useEffect(() => { configRef.current = config; }, [config]);

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        wsRef.current = new WebSocket(getWsUrl());
        
        wsRef.current.onopen = () => {
            wsRef.current.send(JSON.stringify({ type: 'REGISTER_ROLE', role: 'display' }));
        };

        wsRef.current.onmessage = (event) => {
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
                    document.documentElement.requestFullscreen().then(() => {
                        showToast("已进入全屏模式");
                    }).catch(e => {
                        showToast("全屏失败：浏览器需要您先点击一次屏幕授权");
                    });
                } else if (data.action === 'WAKE_LOCK') {
                    if ('wakeLock' in navigator) {
                        navigator.wakeLock.request('screen').then(() => {
                            showToast("✅ 已成功开启防止休眠");
                        }).catch((err) => {
                            showToast("❌ 防止休眠请求被拒绝或失败");
                        });
                    } else {
                        showToast("⚠️ 当前浏览器不支持 Wake Lock API (防止休眠)");
                    }
                }
            }
        };

        return () => {
            document.body.style.overflow = 'auto';
            if (wsRef.current) wsRef.current.close();
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const animateScroll = useCallback(() => {
        if (configRef.current && configRef.current.isPlaying && containerRef.current) {
            containerRef.current.scrollTop += configRef.current.speed * 0.5;
        }
        requestRef.current = requestAnimationFrame(animateScroll);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateScroll);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animateScroll]);

    if (!config) return <div className="absolute inset-0 flex items-center justify-center text-neutral-500 z-40 bg-black">正在连接服务器...</div>;

    const renderTextBlocks = () => {
        return config.text.split('\\n').map((para, index) => {
            let text = para;
            let localSize = config.fontSize;
            const sizeRegex = /^&size:(\\d+)&/;
            if (sizeRegex.test(text)) {
                const match = text.match(sizeRegex);
                localSize = parseInt(match[1]);
                text = text.replace(sizeRegex, '');
            }
            return (
                <div key={index} className="para-block min-h-[1.5em]" style={{ 
                        fontSize: `${localSize}px`,
                        transition: config.lowPerformance ? 'none' : 'font-size 0.3s ease'
                    }}
                >
                    {text || ' '}
                </div>
            );
        });
    };

    const transformStyle = [
        config.mirror ? 'scaleX(-1)' : '',
        config.flipVertical ? 'scaleY(-1)' : ''
    ].filter(Boolean).join(' ') || 'none';

    const filterStyle = config.invertColors ? 'invert(1) hue-rotate(180deg)' : 'none';

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
                                top: '50%', transform: 'translateY(-50%)',
                                height: `${config.aidBlockHeight}px`, backgroundColor: config.aidBlockColor,
                                transition: config.lowPerformance ? 'none' : 'background-color 0.3s ease'
                            }}></div>
                        <div className="fixed top-1/2 left-0 w-full h-px z-0 pointer-events-none" style={{ 
                                backgroundColor: config.guideColor, boxShadow: `0 0 8px ${config.guideColor}`,
                                transition: config.lowPerformance ? 'none' : 'background-color 0.3s ease'
                            }}></div>
                    </>
                )}

                <div className="mx-auto min-h-full flex flex-col relative z-10" style={{ 
                        width: `${config.lineWidth}%`, transform: transformStyle, 
                        transition: config.lowPerformance ? 'none' : 'width 0.3s ease' 
                    }}>
                    <div style={{ height: '60vh' }}></div>
                    
                    <div className="whitespace-pre-wrap font-bold leading-relaxed" style={{ 
                            color: config.fontColor, textShadow: '0 4px 12px rgba(0,0,0,0.8)',
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
