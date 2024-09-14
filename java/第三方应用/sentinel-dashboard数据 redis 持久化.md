# 概述

&emsp;&emsp;随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 是面向分布式、多语言异构化服务架构的流量治理组件，主要以流量为切入点，从流量路由、流量控制、流量整形、熔断降级、系统自适应过载保护、热点流量防护等多个维度来帮助开发者保障微服务的稳定性。

&emsp;&emsp;[官网](https://sentinelguard.io/zh-cn/docs/introduction.html)提供的 sentinel 采用的是直接内存的方式进行资源规则存储的，也就是说只要重新启动数据就回丢失。但是官方也是给出了一些持久化的方案 nacos 等。

&emsp;&emsp;**本博客介绍说明的是 redis 持久化方案使用。**

# sentinel-dashboard 控制台部署

#### 1. sentinel-dashboard 的 redis 版本的 docker 镜像下载

> docker pull osmiling/sentinel-dashboard:1.8.7-redis
>
> [dockerhub](https://hub.docker.com/r/osmiling/sentinel-dashboard)进行下载镜像

#### 2. 启动 docker 容器

需要先自己启动一个 redis 服务，镜像倒是提供了 单体、哨兵、集群 等模式的配置方式，具体镜像使用介绍。

```yaml
version: '3.1'

services:
  sentinel-dashboard:
    image: osmiling/sentinel-dashboard:1.8.8-redis
    container_name: sentinel-dashboard
    logging:
      driver: json-file
      options:
        max-size: "100m"
        max-file: "5"
    restart: always
    ports:
      - "8619:8619"
    environment:
      SERVER_PORT: 8619
      REDIS_HOST: 127.0.0.1
      REDIS_PORT: 6379
      REDIS_PASSWORD: 123456
      REDIS_DATABASE: 15
    volumes:
        - /etc/localtime:/etc/localtime #将外边时间直接挂载到容器内部，权限只读
        - ./logs:/root/logs
```

**按照镜像介绍的方式就可以正常启动。**

# 启动一个springboot 项目

在springboot 项目中，添加如下操作。

#### 1. 添加持久化的 redis 包和 sentinel 客户端包

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-redis</artifactId>
</dependency>
```

**看镜像说明中 1.8.7 以下的版本存在系统规则无法正常使用的问题，我以前测试的1.8.5确实存在这个问题，所以 sentinel-core 版本要 1.8.7 及以上。**

#### 2. 添加 application.yml 的配置

```yaml
spring:
  cloud:
    # alibaba哨兵
    sentinel:
      enabled: true
      # 默认情况下 sentinel 会在客户端首次调用的时候进行初始化，开始向控制台发送心跳包，取消sentinel控制台懒加载功
      eager: true
      transport:
        # 默认7890端口，假如被占用会自动7890开始依次+1扫描，直至找到未被占用的端口
        port: 7890
        # 配置Sentinel dashboard地址
        dashboard: 127.0.0.1:8619
      datasource:
        ds1:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:system'
            channel: 'Sentinel:Channel:${spring.application.name}:system'
            rule-type: system

        ds2:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:flow'
            channel: 'Sentinel:Channel:${spring.application.name}:flow'
            rule-type: flow
        ds3:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:degrade'
            channel: 'Sentinel:Channel:${spring.application.name}:degrade'
            rule-type: degrade
        ds4:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:param-flow'
            channel: 'Sentinel:Channel:${spring.application.name}:param-flow'
            rule-type: param-flow
        ds5:
          redis:
            host: 127.0.0.1
            database: 15
            port: 6379
            password: 123456
            master-id: master
            rule-key: 'Sentinel:Config:${spring.application.name}:authority'
            channel: 'Sentinel:Channel:${spring.application.name}:authority'
            rule-type: authority
```

**这么多的数据源都指向的是同一个 redis ，应该也是可以指向不同的 redis 的，但是要和 sentienl-dashboard 配置的一样才行。**

配置这么多的数据源主要是因为规则和通道 对应 到 sentinel-dashboard 的每一个限流方式。

> **重要的是，规则健 rule-key 和 通道channel 要与镜像介绍的格式进行配置**
>
> "Sentinel:Config:" + 应用名称 + 规则枚举(`com.alibaba.cloud.sentinel.datasource.RuleType`)
>
> "Sentinel:Channel:" + 应用名称 + 规则枚举(`com.alibaba.cloud.sentinel.datasource.RuleType`)

#### 3. 启动应用

配置完成之后就可以启动应用了。打开 http://127.0.0.1:8619 就可以看到注册进行来的服务应用。



# 执行流程说明

&emsp;&emsp;当我们配置规则之后就可以在redis中看到对应配置的规则数据。服务重启会自动从 redis 中加载规则数据。**下载介绍一下这个规则的设置流程。**

1. 控制台 打开 系统规则 页面的时候，控制台会发送 http 请求向服务获取规则数据进行显示。也就是说控制台页面显示的规则数据不是直接从 redis 中获取的，而是向服务这边请求获取的()。
2. 