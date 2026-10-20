```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "sk-5e07db6b0141a956a978",
        "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
        "ANTHROPIC_MODEL": "deepseek-flash[1m]",
        "ANTHROPIC_DEFAULT_FABLE_MODEL": "deepseek-flash[1m]",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-flash[1m]",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-flash[1m]",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-flash[1m]",
        "CLAUDE_CODE_SUBAGENT_MODEL": "deepseek-flash[1m]",

        // 为受支持的模型设置 effort 级别。取值：low、medium、high、xhigh、max，或 auto（使用模型默认值）。可用级别取决于模型。优先于 --effort、/effort 以及 modelSettings 和 effortLevel 设置。
        "CLAUDE_CODE_EFFORT_LEVEL": "max",
        // 设置自动压缩窗口，即上下文填充到多满时进行压缩，范围为 100000 到 1000000 个 token。
        "CLAUDE_CODE_AUTO_COMPACT_WINDOW": 900000,
        // 设置为 1 可禁用自动后台更新。手动 claude update 仍然有效。使用 DISABLE_UPDATES 可同时阻止两者
        "DISABLE_AUTOUPDATER": 1
    }
}
```

