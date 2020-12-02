# 后台使用说明
主要有2个接口
### 1.POST /getdata  
参数名为type，取值可以是paiFang,aoChang,yingDing,laoTu,wanLin,laoZhaiShe
分别对应6个地点。  
不带参数可以获取用户整体通关情况的json  
```json
{"paiFang":true,"aoChang": false,"yingDing": true,"laoTu": false,"wanLin": false,"laoZhaiShe": false}
```
带参数的的话可以获取某个地点的通关情况(`true`或者`false`)

### 2.POST /setdata
参数名为type（必填），取值可以是paiFang,aoChang,yingDing,laoTu,wanLin,laoZhaiShe
分别对应6个地点。  
向此接口发送请求即可将对应地点的通关情况设置为`true`.

具体使用方法参见[此处](https://github.com/Jhon-19/ZeroCup/blob/backend/Backend/src/main/resources/static/index.html)