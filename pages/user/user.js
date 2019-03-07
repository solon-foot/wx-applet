const Util = require('../../utils/util.js')
const Calendar = require('../../utils/LunarCalendar.js')

const app = getApp()

Page({
  data: {
    users: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputValue: ''
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    let users = this.data.users;
    let user = {}
    user.name = "张志";
    user.birth = "1991-10-28"
    user.age = Util.age(new Date(user.brith))
    let date2 = new Date(user.birth);
    console.log(Calendar.getLunarByBetween(1991,9,28));//需要月份+1

    user.age2 = Util.age2(new Date(user.birth))
    users.push(user);

    
    this.setData({ users });
  }
})
