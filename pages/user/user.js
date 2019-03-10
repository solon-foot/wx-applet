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
    
    let users = [
      { name: "乔风云", birth: "1966-4-18" },
      {name:"张志",birth:"1991-10-28"},
      { name: "熊卫", birth: "1990-12-20",birth2:"1989-12-20" },
      
      { name: "张松山", birth: "1967-5-30" },
      {name: "张橙", birth: "2018-9-16" },
      {name: "熊志强", birth: "1968-4-17" },
      {name: "杨立群", birth: "1972-12-15" },
      ];
   let date = new Date();
   var luncheYear = Calendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate()).lunarYear;
    users.forEach(user=>{
      date = new Date(user.birth);
      user.age = Util.age(date);
      let b2;
      console.log(user.name,date);
      if(!user.birth2) {
         b2= Calendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
      } else {
        date = new Date(user.birth2);
        let { year: y, month: m, day: d } = Calendar.lunarToSolar(date.getFullYear(), date.getMonth() + 1, date.getDate());
        b2 = Calendar.solarToLunar(y,m,d);
        console.log(b2);
      }
      user.birth_desc = b2.lunarMonthName + b2.lunarDayName + " " + b2.zodiac;
      user.age2 = luncheYear - b2.lunarYear + 1;
    });

    
    this.setData({ users });
  }
})
