/**
 * Created by qky on 2017/2/26.
 */
import axios from 'axios'
import buildUrl from 'build-url'
import configs from '../config'
const apiList = {
  list: buildUrl(configs.serverUrl, {path: 'v0/patient/list'}),
  item: buildUrl(configs.serverUrl, {path: 'v0/patient'})
}

const patient = {
  list: function (params, resp, error) {
    axios.get(apiList.list, {params: params}).then(resp).catch(error)
  },
  create: function (params, resp, err) {
    axios.post(apiList.item, params).then(resp).catch(err)
  },
  get: function (id, resp, error) {
    axios.get(apiList.item + '/' + id).then(resp).catch(error)
  },
  update: function (id, params, resp, err) {
    axios.put(apiList.item + '/' + id, params).then(resp).catch(err)
  },
  delete: function (id, resp, error) {
    axios.delete(apiList.item + '/' + id).then(resp).catch(error)
  }
}

export default patient
