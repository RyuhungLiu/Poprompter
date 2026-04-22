import json
import socket
import logging
import datetime
import webbrowser
import threading
import configparser
import urllib.request
import ssl
from pathlib import Path
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

logging.getLogger("uvicorn.access").setLevel(logging.WARNING)

BASE_DIR = Path(__file__).parent
CONFIG_PATH = BASE_DIR / "config.ini"
VENDOR_DIR = BASE_DIR / "static" / "vendor"

CDN_PRESETS = {
    "1": {
        "name": "unpkg / cdn.tailwindcss.com (推荐，完整 JIT)",
        "tailwind_url": "https://cdn.tailwindcss.com",
        "tailwind_type": "js",
        "react_url": "https://unpkg.com/react@18/umd/react.production.min.js",
        "react_dom_url": "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
        "babel_url": "https://unpkg.com/@babel/standalone/babel.min.js",
    },
    "2": {
        "name": "BootCDN (国内加速，预编译 CSS)",
        "tailwind_url": "https://cdn.bootcdn.net/ajax/libs/tailwindcss/2.2.19/tailwind.min.css",
        "tailwind_type": "css",
        "react_url": "https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js",
        "react_dom_url": "https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
        "babel_url": "https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.23.2/babel.min.js",
    },
    "3": {
        "name": "字节跳动 Staticfile (国内加速，预编译 CSS)",
        "tailwind_url": "https://cdn.staticfile.net/tailwindcss/2.2.19/tailwind.min.css",
        "tailwind_type": "css",
        "react_url": "https://cdn.staticfile.net/react/18.2.0/umd/react.production.min.js",
        "react_dom_url": "https://cdn.staticfile.net/react-dom/18.2.0/umd/react-dom.production.min.js",
        "babel_url": "https://cdn.staticfile.net/babel-standalone/7.23.2/babel.min.js",
    },
}

current_state = {
    "text": "&size:80&欢迎使用 Poprompter！\n\n目前的段落字号为80。\n\n&size:50&现在字号已经支持直接静态渲染，\n这段文字固定为50px。\n\n&size:100&这是最后一段，\n字号放大为100px。\n\n\n\n...",
    "isPlaying": False,
    "speed": 3,
    "fontSize": 80,
    "lineWidth": 80,
    "mirror": False,
    "fontColor": "#FFFFFFFF",
    "guideColor": "#FF000055",
    "aidBlockColor": "#000088AA",
    "aidBlockHeight": 100,
    "lowPerformance": False,
    "flipVertical": False,
    "invertColors": False
}

server_logs = []
tailwind_is_css = False

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        await websocket.send_text(json.dumps({
            "type": "SYNC_STATE",
            "payload": current_state
        }))
        await websocket.send_text(json.dumps({
            "type": "SYNC_LOGS",
            "payload": server_logs
        }))

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str, sender: WebSocket = None):
        for connection in self.active_connections:
            if connection != sender:
                try:
                    await connection.send_text(message)
                except Exception:
                    pass

manager = ConnectionManager()

app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

def render_template(filename: str) -> str:
    global tailwind_is_css
    html = (BASE_DIR / "templates" / filename).read_text(encoding="utf-8")
    if tailwind_is_css:
        tag = '<link rel="stylesheet" href="/static/vendor/tailwind.css">'
    else:
        tag = '<script src="/static/vendor/tailwind.js"></script>'
    html = html.replace("{{VENDOR_TAILWIND_TAG}}", tag)
    return html

@app.get("/api/state")
async def api_get_state():
    return current_state

@app.post("/api/command")
async def api_post_command(request: Request):
    data = await request.json()
    action = data.get("action")
    if action:
        await manager.broadcast(json.dumps({"type": "COMMAND", "action": action}))
    return {"status": "ok"}

@app.post("/api/update_state")
async def api_update_state(request: Request):
    global current_state
    data = await request.json()
    current_state.update(data)
    await manager.broadcast(json.dumps({"type": "SYNC_STATE", "payload": current_state}))
    return {"status": "ok"}

@app.get("/api/trigger/{action}")
async def api_trigger(action: str):
    global current_state
    action = action.lower()
    
    if action == "toggle":
        current_state["isPlaying"] = not current_state["isPlaying"]
        await manager.broadcast(json.dumps({"type": "SYNC_STATE", "payload": current_state}))
    elif action == "play":
        current_state["isPlaying"] = True
        await manager.broadcast(json.dumps({"type": "SYNC_STATE", "payload": current_state}))
    elif action == "pause":
        current_state["isPlaying"] = False
        await manager.broadcast(json.dumps({"type": "SYNC_STATE", "payload": current_state}))
    elif action == "up":
        await manager.broadcast(json.dumps({"type": "COMMAND", "action": "SCROLL_UP"}))
    elif action == "forward":
        await manager.broadcast(json.dumps({"type": "COMMAND", "action": "FAST_FORWARD"}))
    elif action == "reset":
        await manager.broadcast(json.dumps({"type": "COMMAND", "action": "RESET_SCROLL"}))
        current_state["isPlaying"] = False
        await manager.broadcast(json.dumps({"type": "SYNC_STATE", "payload": current_state}))
    else:
        return {"status": "error", "message": "Unknown action"}
        
    return {"status": "ok", "action_triggered": action}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    global current_state
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)
            msg_type = parsed_data.get("type")
            
            if msg_type == "SYNC_STATE":
                current_state = parsed_data.get("payload", current_state)
                await manager.broadcast(data, sender=websocket)
                
            elif msg_type == "COMMAND":
                await manager.broadcast(data, sender=websocket)
                
            elif msg_type == "REGISTER_ROLE":
                role = parsed_data.get("role")
                client_ip = websocket.client.host if websocket.client else "未知IP"
                time_str = datetime.datetime.now().strftime("%H:%M:%S")
                
                if role == "controller":
                    role_name = "标准控制端"
                elif role == "mobile_controller":
                    role_name = "纯净控制端(手机)"
                else:
                    role_name = "显示端"
                    
                log_msg = f"[{time_str}] 新设备 ({client_ip}) 进入了 {role_name}"
                server_logs.append(log_msg)
                if len(server_logs) > 50:
                    server_logs.pop(0)
                
                await manager.broadcast(json.dumps({
                    "type": "SYNC_LOGS",
                    "payload": server_logs
                }))

    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)

@app.get("/")
@app.get("/s")
@app.get("/d")
async def get_index():
    return HTMLResponse(render_template("index.html"))

@app.get("/k")
async def get_pure_controller():
    html = (BASE_DIR / "templates" / "pure.html").read_text(encoding="utf-8")
    return HTMLResponse(html)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def open_browser(url):
    threading.Timer(1.5, lambda: webbrowser.open(url)).start()

def download_file(url: str, dest: Path, label: str):
    try:
        print(f"   ⬇ {label}: {url}")
        ctx = ssl.create_default_context()
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            data = resp.read()
            dest.write_bytes(data)
        size_kb = len(data) / 1024
        print(f"   ✓ {label} ({size_kb:.1f} KB)")
        return True
    except Exception as e:
        print(f"   ✗ {label} 下载失败: {e}")
        return False

def ensure_vendor_files(preset: dict, force: bool = False):
    global tailwind_is_css
    VENDOR_DIR.mkdir(parents=True, exist_ok=True)
    tailwind_is_css = preset["tailwind_type"] == "css"
    tw_ext = "css" if tailwind_is_css else "js"

    files = [
        (preset["tailwind_url"], VENDOR_DIR / f"tailwind.{tw_ext}", "Tailwind CSS"),
        (preset["react_url"], VENDOR_DIR / "react.production.min.js", "React"),
        (preset["react_dom_url"], VENDOR_DIR / "react-dom.production.min.js", "React DOM"),
        (preset["babel_url"], VENDOR_DIR / "babel.min.js", "Babel"),
    ]

    need_download = False
    for url, dest, label in files:
        if force or not dest.exists():
            need_download = True
            break

    if not need_download:
        print(" ✓ 前端库已是最新，跳过下载")
        return True

    print(" 正在下载前端库到 static/vendor/ ...")
    all_ok = True
    for url, dest, label in files:
        if force or not dest.exists():
            if not download_file(url, dest, label):
                all_ok = False
        else:
            print(f"   ✓ {label}: 已存在，跳过")

    if all_ok:
        print(" ✓ 所有前端库下载完成")
    else:
        print(" ⚠ 部分文件下载失败，首次使用时浏览器可能需要联网")
    return all_ok

def load_config():
    cfg = configparser.ConfigParser()
    if CONFIG_PATH.exists():
        cfg.read(CONFIG_PATH, encoding="utf-8")
    else:
        cfg["server"] = {"port": "8000", "host": "0.0.0.0", "auto_open_browser": "true"}
        cfg["cdn"] = {"source": "1", "force_download": "false"}
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            cfg.write(f)
        print(f" ✓ 已生成默认配置文件: {CONFIG_PATH}")
    return cfg

if __name__ == "__main__":
    cfg = load_config()
    cdn_source = cfg.get("cdn", "source", fallback="1")
    force_dl = cfg.getboolean("cdn", "force_download", fallback=False)
    port = cfg.getint("server", "port", fallback=8000)
    host = cfg.get("server", "host", fallback="0.0.0.0")
    auto_browser = cfg.getboolean("server", "auto_open_browser", fallback=True)

    preset = CDN_PRESETS.get(cdn_source, CDN_PRESETS["1"])
    print(f" ✓ CDN 来源: {preset['name']}")

    ensure_vendor_files(preset, force=force_dl)

    local_ip = get_local_ip()
    url = f"http://{local_ip}:{port}"
    print("\n" + "=" * 50)
    print(" 🚀 Poprompter 服务器已成功启动！")
    print(f" 🌐 默认入口: {url}")
    print(f" 📱 纯净遥控: {url}/k")
    print(f" 💻 标准控制: {url}/s")
    print(f" 📺 显示屏幕: {url}/d")
    print("=" * 50 + "\n")
    
    if auto_browser:
        open_browser(url)
    uvicorn.run(app, host=host, port=port, log_level="warning")
