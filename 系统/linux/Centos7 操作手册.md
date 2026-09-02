[TOC]

# 一、防火墙

## 1、防火墙的开关操作

1. **查看防火墙状态**

```bash
systemctl status firewalld
```

1. **临时关闭（重启系统启动）**

```bash
systemctl stop firewalld
systemctl start firewalld
systemctl restart firewalld
```

1. **永久关闭防火墙**

```bash
systemctl disable firewalld
```

1. **使能打开防火墙**

```bash
systemctl enable firewalld
```

## 2、防火墙ip端口配置

1. **允许指定的ip访问**

```bash
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.2.110" accept"
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.47.1" port protocol="tcp" port="22" accept"
```

2. **允许指定的端口访问**

```bash
firewall-cmd --add-port=16379/tcp --permanent
```

3. **查询端口是否开放成功**

```bash
firewall-cmd --query-port=16379/tcp
或者访问 /etc/firewalld/zones/public.xml 这个文件里面的内容
```

4. **载入防火墙配置**

```bash
firewall-cmd --reload
```

# 二、文件夹和文件的操作

## (一)、通用操作

### 1、创建文件夹

```bash
mkdir yyy
```

### 2、删除文件夹

```bash
rm -rf yyy
```

### 3、修改文件夹名称(移动也是修改，看移动的位置了)

```bash
mv yyy sss
```

### 4、查找文件或者文件夹

```bash
find / -name xxx.txt -print
具体find的使用方法可以百度查找
```

### 5、创建文件

```bash
touch xxx.txt
```

### 6、删除文件

1. **删除单个文件**

```bash
rm -r xxx.txt
```

2. **删除文件夹**

```bash
rm -rf yyy
```

### 7、查看文件（内容，大小）

1. **查看文件（文件夹）的大小**

```bash
du -sh xxx.txt(文件夹的名称)
```

2. **查看当前文件夹下所有文件的大小**

```bash
du -sh *
```

3. **直接查看文件内容**

```bash
cat xxx.txt
```

4. **实时查看文件的内容**

```bash
tail -f xxx.txt
```

### 8、修改文件

1. **打开编辑（查看)**

```bash
vim xxx.txt
vi xxx.txt
```

2. **开启输入**

```bash
按 i 进入可编辑状态
```

3. **退出编辑**

```bash
按 ESC 退出可编辑状态
```

4. **保存**

```bash
:w      - 保存文件，不退出vim。
:w file - 将修改另外保存到file中，不退出vim。
:w!     - 强制保存，不退出vim 。
:wq     - 保存文件，退出vim。
:wq!    - 强制保存文件，退出vim。
:q      - 不保存文件，退出vim。
:q!     - 不保存文件，强制退出vim。
:e!     - 放弃所有修改，从上次保存文件开始再编辑。
```

## (二)、压缩与解压

### 1、tar 解压与压缩

| 参数 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| -z   | 是否同时具有gz属性                                           |
| -j   | 是否同时具有bz2属性                                          |
| -J   | 是否同时具有xz属性                                           |
| -x   | 解压缩、提取打包的内容                                       |
| -t   | 查看压缩包内容                                               |
| -c   | 建立一个压缩，打包文档                                       |
| -C   | 切换到指定目录，表示指定解压缩包的内容和打包的内容存放的目录 |
| -v   | 显示压缩或者打包的内容                                       |
| -f   | 使用文件名，在f后面要接压缩后的文件的名字，只要用到tar命令，-f选项是必须要用的，-f参数在使用的时候一定排在其他参数的后面，在最右边 |
| -p   | 保留备份数据的原本权限与属性，常用于备份（-c）重要的配置文件 |
| -P   | 保留绝对路径                                                 |

1. **压缩**

```bash
// 将test.txt和test1.txt压缩为test.tar
tar -cvf test.tar test.txt test1.txt

// gzip(.tar.gz) 是公认的压缩这速度最快，压缩大文件的时候与其他的压缩方式相比更加明显，历史最久，应用最广泛的压缩方式
tar -zcvf test.tar.gz test.txt test1.txt

// bzip(.tar.bz2) 压缩形成的文件小，但是可用性不如gzip
tar -icvf test.tar.bz2 test.txt test1.txt

// xz(.tar.xz) 是最新的压缩方式，可以自动提供最佳的压缩率
tar -jcvf test.tar.xz test.txt test1.txt

压缩速度：gz > bz2 > xz
压缩率：xz > bz2 > gz
```

1. **解压**

```bash
tar -zxvf test.tar.gz
tar -xvf test.tar
tar -ixvf test.tar.bz2
tar -jxvf test.tar.xz
```

> 在打包和压缩的过程中，我们有时候会看到这样的语句：tar: 从成员名中删除开头的“/”，这个并不是报错，是因为没有加上-P选项，没有保留原来的绝对路径去打包或者压缩，提取打包的内容跟解压一样

### 2、zip 压缩

```bash
zip [参数] [压缩包名] [压缩的目录或者文件的路径]
```

| 参数 | 说明                                               |
| ---- | -------------------------------------------------- |
| -m   | 将文件压缩后，删除原文件                           |
| -o   | 将压缩文件内的所有文件的最新变动时间设为压缩的时间 |
| -q   | 安静模式，在压缩的时候不显示指令执行的过程         |
| -r   | 递归压缩，将自定目录下的所有子文件以及文件一起处理 |
| -x   | ”文件列表“，压缩时排除文件列表中的文件             |

```bash
zip -r test.zip test.txt
zip -q -r test.zip test.txt
```

### 3、unzip 解压

```bash
unzip [参数] [压缩文件]  （-d [目录]）  //如果不是用括号里面的内容，则解压文件在当前工作目录
```

| 参数 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| -c   | 将解压缩的结果显示到屏幕上（显示每一个目录下的每一个文件的内容），同时对字符做适当的转换，但是并没有解压压缩包 |
| -l   | 显示压缩文件内所包含的文件                                   |
| -t   | 检查压缩文件是否正确                                         |
| -v   | 执行时显示压缩文件的详细信息                                 |
| -q   | 安静模式，执行时不显示任何信息                               |
| -d   | 指定文件解压后存储的目录                                     |
| -x   | 指定不要处理压缩文件中的那些文件                             |

```bash
unzip test.zip
unzip -c test.zip
```

# 三、时间操作

## 1、时间同步

1. **先安装时间同步工具**

```bash
yum -y install ntpdate
```

2. **手动同步系统时间**

```bash
ntpdate ntp3.aliyun.com   # 同步时间，这里以阿里云3号服务器为例，你可以根据需要选择其他服务器

sudo timedatectl set-ntp true && sudo timedatectl set-timezone Asia/Shanghai && timedatectl status  # ubuntu
```

3. **查看系统时间**

```bash
date
```

# 四、yum操作

---

## 1、更换数据源，因为一开始使用的都是国外的数据源

```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo_bak

wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

yum makecache

yum -y update
```

# 五、系统操作

## 1、版本信息

1. **Linux查看当前操作系统版本信息**

```bash
cat /proc/version
```

2. **Linux查看版本当前操作系统内核信息**

```bash
uname -a

uname命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。
uname -a显示全部信息
-m或--machine：显示电脑类型；
-r或--release：显示操作系统的发行编号；
-s或--sysname：显示操作系统名称；
-v：显示操作系统的版本；
-p或--processor：输出处理器类型或"unknown"；
-i或--hardware-platform：输出硬件平台或"unknown"；
-o或--operating-system：输出操作系统名称；
--help：显示帮助；
--version：显示版本信息。
```

3. **linux查看版本当前操作系统发行信息**

```bash
// 非centos得linux系统
cat /etc/issue

// centos版本得linux系统
cat /etc/centos-release
```

1. **查看系统得位数**

```bash
getconf LONG_BIT
```

## 2、修改系统密码

```bash
passwd <用户名>
```

## 3、文件系统

1. **df (disk free)**

```bash
// 查看文件系统大小
df -Th
df (disk free)命令的常见用法如下：直接执行
df ，它会显示所有已挂载文件系统的信息。
你还可以添加一些选项，比如：
-h：以人类可读的格式（如 KB、MB、GB 等）显示磁盘空间信息。
-T：显示文件系统类型。
```

# 六、应用程序操作

## 1、查看监听的端口

```bash
netstat -lnpt
netstat -tunlp|grep 【端口号】
```

4. **netstat命令详解**

```bash
netstat [选项]

-a或--all：显示所有连线中的Socket；
-A<网络类型>或--<网络类型>：列出该网络类型连线中的相关地址；
-c或--continuous：持续列出网络状态；
-C或--cache：显示路由器配置的快取信息；
-e或--extend：显示网络其他相关信息；
-F或--fib：显示FIB；
-g或--groups：显示多重广播功能群组组员名单；
-h或--help：在线帮助；
-i或--interfaces：显示网络界面信息表单；
-l或--listening：显示监控中的服务器的Socket；
-M或--masquerade：显示伪装的网络连线；
-n或--numeric：直接使用ip地址，而不通过域名服务器；
-N或--netlink或--symbolic：显示网络硬件外围设备的符号连接名称；
-o或--timers：显示计时器；
-p或--programs：显示正在使用Socket的程序识别码和程序名称；
-r或--route：显示Routing Table；
-s或--statistice：显示网络工作信息统计表；
-t或--tcp：显示TCP传输协议的连线状况；
-u或--udp：显示UDP传输协议的连线状况；
-v或--verbose：显示指令执行过程；
-V或--version：显示版本信息；
-w或--raw：显示RAW传输协议的连线状况；
-x或--unix：此参数的效果和指定"-A unix"参数相同；
--ip或--inet：此参数的效果和指定"-A inet"参数相同。
```

5. **常用实例**

```bash
netstat -a      # 列出所有端口
netstat -at     # 列出所有TCP端口
netstat -au     # 列出所有UDP端口
netstat -l   # 只显示监听端口
netstat -lt  # 显示监听TCP端口
netstat -lu  # 显示监听UDP端口
netstat -lx  # 显示监听UNIX端口
netstat -s     # 显示所有端口的统计信息
netstat -st    # 显示所有TCP的统计信息
netstat -su    # 显示所有UDP的统计信息
```

## 2、查看进程（ps）

ps命令是Process Status的缩写，用于查看系统进程状态，ps命令输出值非常多，通常结合管道符使用。

```bash
ps -ef
```

```bash
“-e”与“A”参数效果相同，显示所有终端下的执行程序。
“e”：列出所有程序并显示每个程序所使用的环境变量。
“-f”：显示程序的UID，PID，PPID，C与STIME等信息。
“f”：与“-f”类似，只显示当前终端所有程序，展示的数据少一点
```

```bash
ps -aux
```

```bash
“-A”： 显示所有终端下的执行程序。
“-a”：显示所有终端机下执行的程序，除了阶段作业领导者之外。
“a”：显示现行终端下的所有程序，包括其他用户的程序。
“-u”： 以用户为主的格式来显示程序状况。
“x“：显示所有程序，不以终端来区分。
```

## 3、内存查看

```bash
// 直接查看
free
// 大小安M显示
free -m
```

## 4、ip的查看和修改

1. **ip查看**

```bash
// 这个命令有的linux系统没有安装，需要进行自己安装
```

```bash
ifconfig
```

```bash
// 这个命令可以直接查看ip
```

```bash
ip addr show
```

```bash
修改ip
```

网络ip修改一般在/etc/sysconfig/network-scripts/ 路径下，可以根据上面查看的修改对应文件，虚拟机一般默认是修改 ifcfg-ens33

```bash
IPADDR=192.168.xx.xx           # ip地址
NETMASK=255.255.255.0          # 子网掩码
NM_CONTROLLED=no               # 一般不加不使用network manage管理网络
GATEWAY=192.168.xx.2           # 虚拟机下的liunx默认为.2网段  网关地址
DNS1=223.5.5.5          	    #阿里云DNS dns解析地址 如果ping不同可以尝试添加此项
BOOTPROTO=static               # 使用静态ip地址模式
ONBOOT=yes                     # 开机时是否启用此网络
```

修改完成之后保存，然后执行 :

```bash
systemctl restart network
```

要注意的是虚拟机使用的时候不要让mac地址重复，否则也是ping不同。

# 七、chmod

## 1、简介

chmod 是 Linux 和 Unix 系统中的一个命令，用于改变文件或目录的权限。在 Linux 和 Unix 中，文件和目录的权限定义了哪些用户可以读、写或执行这些文件或目录。

## 2、基本语法

```bash
chmod [选项]   权限  文件或目录……
```

### 3、权限表示

1. 符号模式：使用 u (用户)、g (组)、o（其他）来表示用户的类别、以及 + （添加）、 - （删除）、= （设置）来表示权限的操作

```bash
chmod u+x file.txt    # 给文件file.txt的用户添加执行权限
chmod g-w directory/  # 从目录directory/的组中删除写权限
chmod o=r file.txt    # 设置文件file.txt的其他用户只有读权限
```

1. 八进制模式：使用数字来表示全新啊。每个数字是三个二进制位的和，分别代表 读（r）、写（w）、执行（x）权限。

2. 读（r）  = 4

3. 写（w）  = 2

4. 执行（x）= 1

```bash
chmod 755 directory/  # 设置目录directory/的权限为：用户（rwx），组（r-x），其他（r-x）
chmod 644 file.txt    # 设置文件file.txt的权限为：用户（rw-），组（r--），其他（r--）
```

## 4、递归地改变目录及其内容的权限

如果你想递归地改变目录及其所有文件和子目录的权限，你可以使用 -R 选项。

```bash
chmod -R 755 directory/
```

## 5、注意事项

1. 在改变文件或目录的权限时要小心，特别是如果你不确定你在做什么的话。不适当的权限设置可能会导致安全问题或使系统不稳定。

2. 更改系统文件或目录的权限时，最好先备份或知道如何恢复原始权限。

3. 通常，系统文件和目录的权限由包管理器（如 apt , yum , dnf , pacman 等）管理，因此在这些情况下，最好不要手动更改权限。

# 八、grep说明

---

## 1、关键字说明

grep是Linux中最常用的"文本处理工具"之一，grep与sed、awk合称为Linux中的三剑客。grep的全称为： 【Global search Regular Expression and Print out the line】。全称中的"Global search"为全局搜索之意，全称中的"Regular Expression"表示正则表达式。所以，从grep的全称中可以了解到，grep是一个可以利用"正则表达式"进行"全局搜索"的工具，grep会在文本文件中按照指定的正则进行全局搜索，并将搜索出的行打印出来。当然，不使用正则表达式时也可以使用grep，但是当grep与正则表达式结合在一起时，威力更强大。

## 2、扩展使用

```bash
grep 过滤指定关键字
grep [-cinvrABC] 'word' filename
grep -c 显示一共包含关键字的行数
grep -n 显示一共包含关键字的行号
grep -i 不区分大小写grep -v 取反
grep -r 遍历所有子目录
grep -A 后面根数字,过滤出符合要求的行以及下面的n行
grep -B 后面根数字,过滤出符合要求的行以及上面的n行
grep -C 后面根数字,过滤出符合要求的行以及上下面的n行
```

# 九、其他

## 1、SSL证书检测查看

```bash
// IP 切换为自己的ip，yourdomain 切换为自己的域名
openssl s_client -connect IP:443  -servername "yourdomain"  -tls1_2 |openssl x509 -noout -dates
```