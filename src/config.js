/**
 * Created by qky on 2017/1/4.
 */
let env = process.env.NODE_ENV || 'development'
// https://api2.musicbible.com
// http://test.boostfield.com:8080
let configs = {
    'development': {
        homeUrl: '/',
        serverUrl: 'http://test.boostfield.com:5000',
        uploadServerUrl: 'http://rosewebsite.oss-cn-shanghai.aliyuncs.com'
    },
    'production': {
        homeUrl: '/',
        serverUrl: 'http://test.boostfield.com:5000',
        uploadServerUrl: 'http://rosewebsite.oss-cn-shanghai.aliyuncs.com'
    }
}

export default configs[env]
