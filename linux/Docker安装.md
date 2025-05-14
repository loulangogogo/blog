# Debian

### **1. 更新系统并安装依赖**

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common
```

### **2. 添加 Docker 官方 GPG 密钥**

```bash
curl -fsSL https://mirrors.huaweicloud.com/docker-ce/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

- 推荐华为云镜像源（阿里云可能限速）

### **3. 添加 Docker 国内 APT 源**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.huaweicloud.com/docker-ce/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- 也可替换为清华源

```
https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian
```

### **4. 安装 Docker CE 以及 docker compose**

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### **5. 启动 Docker 并设置开机自启**

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### **6. 配置国内镜像加速**

编辑 `/etc/docker/daemon.json`：

```bash
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
```

重启 Docker：

```bash
sudo systemctl restart docker
```

### **7. 验证安装**

```bash
docker -v
docker compose version
```