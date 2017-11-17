import Cookies from 'js-cookie'

let app = {
  user () {
    try {
      return Cookies.getJSON('user')
    } catch (err) {
      return false
    }
  },
  login (user) {
    Cookies.set('user', user, 1 / 12)
  },
  logout () {
    Cookies.remove('user')
  },
  hasPermission (permission) {
    let user = app.user()
    return user.permissions.find(item => {
      return item === permission
    })
  },
  setTitle: function (title) {
    title = title || 'iView admin'
    window.document.title = title
    console.log(123)
  }
}
export default app
