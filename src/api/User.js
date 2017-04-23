/**
 * Created by qky on 2017/4/23.
 */
const USERSTRING = 'rose_user'
var CurrentUser
const user = {
  setUser: function (user) {
     CurrentUser = user
     sessionStorage.setItem(USERSTRING, JSON.stringify(user))
  },
  getUser: function () {
    return CurrentUser || JSON.parse(sessionStorage.getItem(USERSTRING))
  },
  logout: function () {
    CurrentUser = null
    sessionStorage.removeItem(USERSTRING)
  }
}
export default user
