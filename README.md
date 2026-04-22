# 高级局域网提词器

基于 FastAPI + WebSocket + React 的多设备协同提词器系统，支持跨设备实时同步。

## 功能特性

- **多角色协同** — 控制端、纯净遥控器、提词器屏幕三端分离
- **实时同步** — 基于 WebSocket 的毫秒级状态同步
- **纯文本遥控** — 独立的 `/k` 路径，AJAX 轮询模式，兼容 Kindle iPhone 4/5 等老旧设备
- **丰富调控** — 滚动速度、字号、画面占比、镜像翻转、颜色反转等
- **段落字号** — 使用 `&size:数字&` 语法为不同段落指定独立字号(未完善)
- **辅助线/块** — 可自定义颜色的基准线和半透明辅助块
- **快捷键** — F3 播放/暂停、F4 向上微调、F7 回到开头
- **全屏控制** — 远程强制显示端进入全屏
- **防休眠** — Wake Lock API 防止显示端息屏
- **离线运行** — 前端库自动下载到本地，运行时无需联网

## 项目结构

```
提词器/
├── teleprompter_server.py       # 服务器入口
├── config.ini                   # 配置文件 (端口、CDN 来源等)
├── templates/
│   ├── index.html               # 主页面 (角色选择 / 控制端 / 显示端)
│   └── pure.html                # 纯净控制器页面 (无框架，兼容老设备)
└── static/
    ├── vendor/                  # 自动下载的前端库 (无需手动管理)
    ├── css/
    │   ├── main.css             # 主页自定义样式
    │   └── pure.css             # 纯净控制器样式 (含黑白主题)
    └── js/
        ├── app.js               # React 主应用 (Babel 编译)
        └── pure.js              # 纯净控制器逻辑 (AJAX 轮询)
```

## 快速开始

### 1. 安装依赖

```bash
pip install fastapi uvicorn websockets
```

### 2. 启动服务器

```bash
python teleprompter_server.py
```

首次启动会自动下载前端库到 `static/vendor/`，之后完全离线运行。启动后自动打开浏览器。

### 3. 访问页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 角色选择 | `/` | 默认首页，选择进入哪种角色 |
| 标准控制端 | `/s` | 完整控制面板（编辑文本 + 所有参数调节） |
| 显示屏幕 | `/d` | 提词器滚动显示画面 |
| 纯净遥控器 | `/k` | 极简遥控，兼容老设备/Kindle |

在同一局域网内，用不同设备打开对应路径即可协同使用。

## 配置文件 (config.ini)

首次运行会自动生成 `config.ini`，内容如下：

```ini
[server]
port = 8000
host = 0.0.0.0
auto_open_browser = true

[cdn]
source = 1
force_download = false
```

### [server] 服务器设置

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `port` | `8000` | 服务监听端口 |
| `host` | `0.0.0.0` | 监听地址，`0.0.0.0` 允许局域网访问 |
| `auto_open_browser` | `true` | 启动后是否自动打开浏览器 |

### [cdn] 前端库下载设置

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `source` | `1` | CDN 来源编号（见下表） |
| `force_download` | `false` | 是否每次启动都重新下载 |

**CDN 来源选项：**

| 编号 | CDN | 说明 |
|------|-----|------|
| `1` | unpkg / cdn.tailwindcss.com | 推荐，完整 Tailwind JIT 支持（支持任意值 `w-[123px]`） |
| `2` | BootCDN (cdn.bootcdn.net) | 国内加速，预编译 CSS，不支持 JIT 任意值 |
| `3` | 字节跳动 Staticfile (cdn.staticfile.net) | 国内加速，预编译 CSS，不支持 JIT 任意值 |

> 国内用户如果默认源下载慢，可将 `source` 改为 `2` 或 `3`，但部分高级 Tailwind 语法不可用，其中babel.js过大，可能需要下载一定时间。

## 快捷键

| 按键 | 功能 |
|------|------|
| F3 | 播放 / 暂停 |
| F4 | 向上微调 |
| F7 | 回到开头 |

快捷键在控制端和纯净遥控器中均可用。

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/state` | 获取当前状态 |
| POST | `/api/command` | 发送指令 `{action: "SCROLL_UP"}` |
| POST | `/api/update_state` | 更新状态（合并到当前状态） |
| GET | `/api/trigger/{action}` | 触发动作 (toggle/play/pause/up/forward/reset) |
| WS | `/ws` | WebSocket 实时双向通信 |

## 段落字号语法**(未完善)**

在文本中使用 `&size:数字&` 可为后续段落指定独立字号：

```
&size:80&这段文字字号为 80px
&size:50&这段文字字号为 50px
&size:100&这段文字字号为 100px
没有标记的段落使用默认字号
```

## 系统要求

- Python 3.9+
- 现代浏览器（Chrome / Firefox / Edge / Safari）
- 纯净遥控器兼容极老浏览器（Kindle Silk 等）
- 首次启动需要网络连接（下载前端库），之后完全离线
