/**
 * Created by qky on 2017/1/7.
 */
/* global moment */
import Config from './config'
let uploadServerUrl = Config.uploadServerUrl
let uploadAudioUrl = Config.uploadAudioUrl
export function setTime (orginalTime, format) {
    var time = ''
    let f = format || 'YYYY-MM-DD HH:mm'
    if (orginalTime && orginalTime !== '') {
        time = moment(orginalTime).format(f)
    }
    return time
}

export function revertListToName (listOption) {
    let newList = []
    listOption.forEach(function (item) {
        let newItem = {}
        newItem.name = item.id
        newItem.url = item.url
        newList.push(newItem)
    })
    return newList
}

export function revertListToId (listOption, type) {
    let newList = []
    listOption.forEach(function (item) {
        let newItem = {}
        newItem.id = item.name
        newItem.url = excludeImagePrefix(item.url)
        newItem.type = type || 0
        newList.push(newItem)
    })
    return newList
}

function excludeImagePrefix (url) {
    return url.replace(uploadServerUrl + '/', '').replace('@!thumbnail', '').replace('@!origin', '').replace('@!thumbnail', '')
}

export function excludeAudioPrefix (url) {
    return url.replace(uploadAudioUrl + '/', '')
}

export function setImageUrl (orginalUrl, type) {
  var url = ''
  var endFix = '@!thumbnail'
  if (!orginalUrl || orginalUrl === '') {
    // todo here we should use defualt image url
    url = ''
  } else if (orginalUrl.lastIndexOf('http', 0) === 0) {
    return orginalUrl
  } else {
    if (type === 'origin') {
      endFix = '@!origin'
    } else if (type === 'thumbnail') {
      endFix = '@!thumbnail'
    }
    if (orginalUrl.substr(0, 1) !== '/') {
      orginalUrl = '/' + orginalUrl
    }
    url = uploadServerUrl + orginalUrl + endFix
  }
  return url
}
export function setPreviewImage (original) {
  var url = ''
  let endFix = '@!origin'
  if (!original || original === '') {
    // todo here we should use defualt image url
    url = ''
  } else if (original.lastIndexOf('http', 0) === 0) {
    if (!(original.includes('@!origin'))) {
      original = original.replace('@!thumbnail', '')
      return original + '@!origin'
    }
    return original
  } else {
    if (original.substr(0, 1) !== '/') {
      original = '/' + original
    }
    url = uploadServerUrl + original + endFix
  }
  return url
}

export function formatDate (now) {
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var date = now.getDate()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    var millSecond = now.getMilliseconds()
    return year + '' + addZero(month) + '' + addZero(date) + '' + addZero(hour) + '' + addZero(minute) + '' + addZero(second) + '' + millSecond
}

export function addZero (number) {
    return number >= 10 ? number : '0' + number
}
