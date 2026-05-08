# pg_dump

`pg_dump` 是 PostgreSQL 提供的一个非常强大且常用的逻辑备份工具，用于将数据库对象（表结构、数据、索引、函数、权限等）导出为 SQL 脚本或自定义格式的归档文件。它支持单个数据库的备份，并可在不同 PostgreSQL 版本之间进行迁移（通常向后兼容）。

```shell
pg_dump -h 127.0.0.1 \
        -p 5432 \
        -U dsk_pgsql \
        -d station_dragon \
        -F c \
        -Z 9 \
        -f "/home/user/backup/data.dump"
 
# 密码一般在执行命令后输入
```



## 命令参数解析

| 选项                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `-h host`                      | 指定数据库服务器主机（默认本地）                             |
| `-p port`                      | 指定端口（默认 5432）                                        |
| `-U username`                  | 指定连接用户                                                 |
| `-d dbname`                    | 指定要备份的数据库                                           |
| `-f file` 或 `> file.sql`      | 指定输出文件                                                 |
| `-F format`                    | 指定输出格式： • `p` (plain, 默认)：SQL 脚本   • `c` (custom)：自定义二进制格式（支持并行恢复） • `d` (directory)：目录格式（支持并行备份/恢复） • `t` (tar)：tar 格式（仅限单表） |
| `-Z`                           | **`-Z` 选项用于指定自定义格式（`-F c`）或目录格式（`-F d`）备份时的压缩级别**。  **`0`**：不压缩（等同于禁用压缩） **`1`**：最快压缩（压缩率最低） **`9`**：最高压缩（速度最慢，但文件最小） **默认值**：`-Z 6`（平衡压缩率与速度） |
| `-v`                           | 详细模式                                                     |
| `--clean`                      | 在 SQL 脚本中加入 `DROP` 语句（便于重建）                    |
| `--create`                     | 在脚本开头加入 `CREATE DATABASE` 和 `CONNECT`                |
| `-n schema`                    | 只备份指定 schema                                            |
| `-N schema`                    | 排除指定 schema                                              |
| `-t table`                     | 只备份指定表（可多次使用）                                   |
| `-T table`                     | 排除指定表                                                   |
| `--inserts`                    | 使用 `INSERT` 而非 `COPY`（便于跨数据库迁移，但慢）          |
| `--column-inserts`             | 生成带列名的 `INSERT`（便于部分列恢复）                      |
| `--no-owner`                   | 不设置对象所有者（适合恢复到不同用户环境）                   |
| `--no-privileges` / `--no-acl` | 不导出权限信息                                               |
| `--schema-only`                | 仅导出结构（不导数据）                                       |
| `--data-only`                  | 仅导出数据（不导结构）                                       |
| `-j n`                         | 并行导出（仅适用于 `-F d` 目录格式）                         |



## windows 定时备份脚本

```bat
@echo off
setlocal enabledelayedexpansion

:: ==============================
:: PostgreSQL 备份脚本 (.bat 版)
:: 作者：DBA Expert
:: ==============================

:: --- 配置 ---
set "DB_HOST=127.0.0.1"
set "DB_PORT=5432"
set "DB_NAME=dragon"
set "DB_USER=pgsql"
set "DB_PASS=123456"

set "BACKUP_DIR=D:\DatabaseBakcup\hltq-dragon"
set "RETAIN_DAYS=7"

:: --- 创建目录 ---
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: --- 获取日期时间 (YYYYMMDD_HHMM) ---
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "MIN=%dt:~10,2%"
set "DATE_TIME=%YYYY%%MM%%DD%_%HH%%MIN%"

set "DUMP_FILE=%BACKUP_DIR%\%DATE_TIME%.dump"


:: --- 开始备份 ---
call :log 开始备份数据库 [%DB_NAME%] 到 "%DUMP_FILE%"

:: 设置密码（注意：不能包含 ! ^ % 等特殊字符）
set "PGPASSWORD=%DB_PASS%"

:: 执行 pg_dump（路径带空格必须加引号）
pg_dump -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -F c -Z 9 -T dg_log* -f "%DUMP_FILE%"

if %errorlevel% equ 0 (
    call :log  备份成功！
) else (
    call :log  备份失败！退出码: %errorlevel%
    exit /b 1
)

call :log  备份任务完成。
exit /b 0


:: --- 日志函数 ---
:log
echo [%date% %time%] %* >> "%BACKUP_DIR%\backup.log"
echo [%date% %time%] %*
goto :eof
```

