

# npm 发布新版本但安装旧版本

在 npm 发布多个版本后：

```bash
npm install your-plugin
```

仍然安装旧版本，主要检查以下几点。

## 1. 检查 `latest` 标签

npm 默认安装的是 `latest` 指向的版本。

```bash
npm view your-plugin dist-tags
```

例如：

```text
latest: 1.2.0
```

即使已经发布 `1.2.1`，默认安装仍然是 `1.2.0`。

修改 `latest`：

```bash
npm dist-tag add your-plugin@1.2.1 latest
```

------

## 2. 检查 `package.json`

如果写死版本：

```json
"your-plugin": "1.2.0"
```

就不会自动安装新版本。

常见：

```text
1.2.0   → 固定版本
~1.2.0  → 允许 1.2.x
^1.2.0  → 通常允许 1.x.x
```

------

## 3. 检查 `package-lock.json`

即使 `package.json` 允许新版本，`package-lock.json` 也可能锁定旧版本。

查看实际版本：

```bash
npm ls your-plugin
```

更新：

```bash
npm update your-plugin
```

或者直接指定：

```bash
npm install your-plugin@1.2.1
```

------

## 4. 快速排查

直接执行：

```bash
npm view your-plugin versions --json
npm view your-plugin dist-tags
npm view your-plugin version
npm ls your-plugin
```

重点关注：

> **npm 默认安装版本 = `latest` 标签指向的版本；项目安装版本还会受到 `package.json` 和 `package-lock.json` 的影响。**