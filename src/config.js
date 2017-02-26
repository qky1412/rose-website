/**
 * Created by qky on 2017/1/4.
 */
let env = process.env.NODE_ENV || 'development'
// https://api2.musicbible.com
// http://test.boostfield.com:8080
let configs = {
    'development': {
        homeUrl: '/',
        serverUrl: 'http://192.168.0.101:8888',
        uploadServerUrl: 'http://rosewebsite.oss-cn-shanghai.aliyuncs.com'
    },
    'production': {
        homeUrl: '/',
        serverUrl: 'https://api2.musicbible.com',
        uploadServerUrl: 'http://rosewebsite.oss-cn-shanghai.aliyuncs.com'
    }
}

export default configs[env]
