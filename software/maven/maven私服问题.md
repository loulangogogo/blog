# 私服上传提示实体太大

目前原因应该是nginx上传文件限制，通过下面的方式可以绕过nginx

```cmd
curl -v -u admin:dsk806888 \
  --upload-file yop-java-sdk-biz-4.4.15.jar \
  "http://192.168.2.60:8081/repository/maven-releases/com/yeepay/yop/sdk/yop-java-sdk-biz/4.4.15/yop-java-sdk-biz-4.4.15.jar"
```

