/**
 * Created by qky on 2017/1/5.
 */
import axios from 'axios'
import buildUrl from 'build-url'
import configs from '../config'
const OSS = {
  host: configs.uploadServerUrl,
  fetchPolicy: function (success, error) {
    axios.get(buildUrl(configs.serverUrl, {path: 'v0/upload/file/token'})).then(success).catch(error)
  }
}
export default OSS
