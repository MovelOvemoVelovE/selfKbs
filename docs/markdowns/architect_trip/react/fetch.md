请求可以使用:

1. XMLHttpRequest对象
2. fetch的ES6
3. jsonP
4. postMessage
5. axios

# 使用

`let promiseObj = fetch(url, requestConfig)`. 

# 区别

与axios不同: 

1. 只要服务器有反馈信息promise都会为`fulfilled`状态， 只有断网后才是`rejected`状态。
2. post请求需要设置header和body。 get请求需要自己拼接到url后

如果想要获取数据失败也调用.catch()， 可以return Promise.reject()来进行操作。

# 配置项

1. method： GET\POST

2. headers: 请求头部
   
   - application/x-www-form-urlencoded
   - appliction/json
   - text/plain
   - multipart/form-data
   - Buffer/blob

3. body: 请求body信息 -- post请求 

对格式有要求，需要设置headers头部信息。

4. mode： 模式： `cors no-cors same-origin`
5. cache： cache模式
6. redirect
7. referer
8. refererPolicy
9. integrity
10. credentials: 资源凭证。cookie自动发送必须开启此选项 `include  same-origin  omit`有都开启、同源携带cookie、都不可以。

# Headers

实例化Headers，有多种方法. `let headers = new Headers()`

有以下方法

1. append() 添加值、或赋值
2. delete() 删除指定header
3. entries() 迭代器
4. get()    获取指定headers
5. has()    是否存在headers
6. keys()    headers所有名
7. set()    替换/赋值指定 header
8. values()    迭代器返回所有values
9. forEach()

# response

包含body(ReadableStream可读流)、headers响应头信息、status/statusText描述等。

包含实例方法有`json() text() clone() blob() formData() arrayBuffer() ...` 等处理可读流信息的方法。

# abortController-请求中断

使用new实例化 AbortController。 传入信号

fetch的config内设置 signal请求中断信号

```js
fetch(url, {
    signal: new AbortController().siganl    
})
```

中断使用.abort()

```js
let ctrol = new AbortController()

fetch(url, {
    signal: ctrol.signal
})

ctrol.abort()
```

# 封装fetch

```js
/* 
    http([config]) 
    config = {
        1. method： GET\POST
        2. headers: 请求头部
            - application/x-www-form-urlencoded
            - appliction/json
            - text/plain
            - multipart/form-data
            - Buffer/blob
        3. body: 请求body信息 -- post请求 对格式有要求，需要设置headers头部信息。
        4. mode： 模式： `cors no-cors same-origin`
        5. cache： cache模式
        6. redirect 
        7. referer
        8. refererPolicy
        9. integrity
        10. credentials: 资源凭证。cookie自动发送必须开启此选项 `include  same-origin  omit`有都开启、同源携带cookie、都不可以。
        11. signal 中断信号
    }
*/
import qs from 'qs'
/* baseURL */
const baseUrl = '/api'
const http = function (config = {}) {
    /* 多种规则校验 */
    switch (false) {
        case config.url:
            throw new Error('request url is required!')
            return;
        case config.params || isPlainObject(config.params):
            config.params = {}
            break
        default:
            break;
    }
    /* config 默认值 */
    config = Object.assign({
        url: '',
        method: 'GET',
        credential: 'include',
        headers: null,
        body: null,
        params: null,
        responseType: 'json',
        signal: null
    }, config)
    let { url, method, credential, headers, body, params, responseType, signal } = config
    url = baseUrl + url
    /* GET请求传参 */
    if (params) {
        url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`
    }
    /* post参数为url-encoded 则需要处理 */
    if (isPlainObject(body)) {
        body = qs.stringify(body)
        /* 
            - application/x-www-form-urlencoded
            - appliction/json
            - text/plain
            - multipart/form-data
            - Buffer/blob
        */
        headers['Content-Type'] = 'application/x-www-form/urlencoded'
    }
    /* cookie 的token 等处理 请求拦截器 */
    // ...xxx

    config = {
        // 统一大写
        method: method.toUpperCase(),
        headers,
        credential,
        // 处理cache模式
        cache: 'no-cache',
        // config传入的信号
        signal,
    }
    return fetch(url, config)
        .then(res => {
            let { status, statusText } = res
            if (/^(2|3)\d{2}$/.test(status)) {
                let result
                /* 批量处理response的 数据格式 */
                switch (responseType.toLowerCase()) {
                    case 'text':
                        result = res.text()
                        break;
                    case 'json':
                        result = res.json()
                        break;
                    case 'blob':
                        result = res.blob()
                        break;
                    default:
                        break;
                }
                return result
            }
            /* 处理请求失败 HTTP状态码失败抛出catch */
            return Promise.reject(
                {
                    ...status,
                    errorSelf: '状态码失败返回',
                    errorSelfCode: -100
                }
            )
        })
        .catch(err => {
            /* 手动抛出错误处理 */
            if (err && typeof err === 'object') {
                let { errorSelfCode } = err
                if(errorSelfCode === -100){
                    // .xxxx
                }
                // 错误统一处理
                console.log(new Error(`${url} request error! \n ${err}`));
            }
            return Promise.reject(err)
        })
}

/* 快捷请求 */
['GET', 'HEAD', 'DELETE', 'OPTIONS'].forEach(item => {
    http[item.toLowerCase()] = function (url, config) {
        if (!isPlainObject(config)) config = {}
        config = {
            ...config,
            url,
            method: item
        }
        return http(config)
    }
});
['POST', 'PUT', 'PATCH'].forEach(item => {
    http[item.toLowerCase()] = function (url, body, config) {
        if (!isPlainObject(config)) config = {}
        config = {
            ...config,
            url,
            body,
            method: item
        }
        return http(config)
    }
})

// 判断是否为对象
function isPlainObject(obj) {
    let proto, Ctor
    if (!obj || toString.call(obj) !== '[object Object]') {
        return false
    }
    proto = Object.getPrototypeOf(obj)
    if (!proto) return true
    Ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor
    console.log(Ctor);
    return typeof Ctor === 'function' && Ctor === Object
}

function qsStringify(str) {

}

export default http
```