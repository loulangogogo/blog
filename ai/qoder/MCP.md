## 快速开始

使用 `qoderclicn mcp add` 添加 stdio MCP 服务。`--` 后面的命令是 Qoder CN CLI 需要启动的服务进程。

> qoderclicn mcp add playwright -- npx -y @playwright/mcp@latest

tdio 服务会随 CLI 自动启动。如果 Qoder CN CLI 已在运行，使用 `/mcp reload` 重新发现 MCP 服务和工具；新的会话会在启动时自动发现。

```cmd
qoderclicn mcp add \
-s project \
postgres -- \
npx -y @modelcontextprotocol/server-postgres \
postgresql://postgres:dsk806888%23%40%21@192.168.2.82:5432/other
```

## 服务类型

使用 `-t` 选择 MCP 传输类型。

| 类型    | 适用场景                                 |
| ------- | ---------------------------------------- |
| `stdio` | MCP 服务作为本地命令运行                 |
| `sse`   | MCP 服务通过 Server-Sent Events 端点暴露 |
| `http`  | MCP 服务通过 HTTP 端点暴露               |
| `ws`    | MCP 服务通过 WebSocket 端点暴露          |

如果没有指定类型，本地命令服务应使用默认的 stdio 行为。

## 作用域

使用 `-s` 选择 MCP 服务配置的保存位置。

| 作用域    | 适用场景                                               |
| --------- | ------------------------------------------------------ |
| `user`    | 希望该服务在当前账号的所有项目中可用                   |
| `local`   | 希望该服务只在本机当前项目中可用。默认作用域为 `local` |
| `project` | 希望该服务配置随项目共享                               |

MCP 服务配置会保存在以下文件中：

```
# 用户级配置。
~/.qoder-cn/settings.json

# 本地项目级配置。通常不提交。
${project}/.qoder/settings.local.json

# 项目级配置。通常随项目提交。
${project}/.mcp.json
```

## 管理服务

列出已配置的服务：

```
qoderclicn mcp list
```

移除服务：



```
qoderclicn mcp remove playwright
```

## 推荐服务

常见 MCP 服务包括：



```
qoderclicn mcp add context7 -- npx -y @upstash/context7-mcp@latest
qoderclicn mcp add deepwiki -- npx -y mcp-deepwiki@latest
qoderclicn mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

## 权限

MCP 工具仍会经过 Qoder CN CLI 的权限系统。在默认模式下，调用 MCP 工具通常会请求确认。你可以批准某个具体工具、批准某个 MCP 服务下的所有工具，或在 settings 中配置规则。

MCP 工具名通常使用以下格式：

```
mcp__<server>__<tool>
```

示例：



```
{
  "permissions": {
    "allow": [
      "mcp__context7__*"
    ],
    "deny": []
  }
}
```

## 故障排查

如果 MCP 工具不可用：

- 运行 `qoderclicn mcp list`，确认服务已经配置。
- 如果 Qoder CN CLI 已在运行，添加或修改服务后执行 `/mcp reload`。
- 确认 `--` 后面的命令可以在终端中正常运行。
- 对于基于 `npx` 的服务，确认 Node.js 和网络访问可用。
- 如果服务已连接但工具调用被阻止，请检查权限提示。