const util = require('../../utils/util.js')
const LunarCalendar = require('../../utils/LunarCalendar.js');
const app = getApp()

function getCalendarData(year, month, day) {
  let maxday = LunarCalendar.getSolarMonthDays(year,month-1);
  if(day>maxday)day = maxday;
  let current = { year, month, day }
  let data = LunarCalendar.calendar(year, month, true);
  let now = new Date();
  let calendar = [];

  let rowLength = (data.firstDay + data.monthDays) > 35 ? 6 : 5
  let k = 0;
  for (let j = 0; j < rowLength; j++) {
    let row = [];
    for (let i = 0; i < 7; i++ , k++) {
      let d = data.monthData[k];
      d.iconCls = d.worktime ? (d.worktime == 1 ? ' worktime' : ' holiday') : '';
      d.iconText = d.worktime ? (d.worktime == 1 ? '班' : '休') : '';
      d.fetvCls = (d.lunarFestival || d.term) ? ' lunar_fetv' : (d.solarFestival ? ' solar_fetv' : '');
      d.lunar = d.lunarDayName;
      //以下判断根据优先级
      if (d.lunarDay == 1) d.lunar = d.lunarMonthName;//每月的第一天
      if (d.solarFestival) d.lunar = d.solarFestival;//公历节日
      if (d.lunarFestival) d.lunar = d.lunarFestival;//农历节日
      if (d.term) d.lunar = d.term;//二十四节气
      //生日需要特殊处理
      if (d.lunarFestival && d.lunarFestival.substr(-2)=='🎂') {
        d.day = "🎂";
        d.lunar = d.lunarFestival.substr(0, d.lunarFestival.length-2);
      } else if (d.solarFestival && d.solarFestival.substr(-2) == '🎂') {
        d.day = "🎂";
        d.lunar = d.solarFestival.substr(0, d.solarFestival.length - 2);
      }

      d.itemCls = "";
      if (current.year == d.year && current.month == d.month && current.day == d.day) {
        d.itemCls += "date_current ";
      }
      if (now.getFullYear() == d.year && now.getMonth() + 1 == d.month && now.getDate() == d.day) {
        d.itemCls = "date_today ";
      }
      if (current.month != d.month) {
        d.itemCls = "date_other ";
      }
      if (d.worktime == 1) {
        d.itemCls += " worktime";
      } else if (d.worktime == 2) {
        d.itemCls += " holiday";
      }
      row.push(d);
    }
    calendar.push(row);
  }
  return { calendar, current };
}

Page({
  data: {
    // caleandar: [],
    calendarDatas: [],
    current: {},
    currentIndex: 0,
    swipeDuration: 0,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputValue: ''
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    // let user = [{"志":"1991-10-28"}];
    LunarCalendar.setLunarFestival({
      "d0921": "胖子🎂",
      "d1220": "熊卫🎂",
    });

    this.actionBackToday();
  },
  setCurrent: function (year, month, day) {
    if (year < 1900 || year > 2100) return;
    let current = { year, month, day };

    // if(current.year != year || current.month != month) {
    let calendarDatas = [];
    let currentPage = 0;
    if (month != 1) {
      currentPage = 1;
      calendarDatas.push(getCalendarData(year, month - 1, day))
    } else if (year > 1900) {
      currentPage = 1;
      calendarDatas.push(getCalendarData(year - 1, 12, day));
    } else {
      //没有更早的数据了，不做处理
    }
    calendarDatas.push(getCalendarData(year, month, day));

    if (month != 12) {
      calendarDatas.push(getCalendarData(year, month + 1, day))
    } else if (year > 1900) {
      calendarDatas.push(getCalendarData(year + 1, 1, day));
    } else {
      //没有更晚的数据了，不做处理
    }
    // }
    this.setData({ calendarDatas, current, currentIndex: currentPage, swipeDuration: 300 });
  },
  swiperChange: function (e) {

    let { current: index, source } = e.detail;
    if (index == 1 || source != "touch") {
      return;
    }

    let that = this;
    let { year, month, day } = this.data.calendarDatas[index].current;
    that.setData({ swipeDuration: 0 });
    setTimeout(function () {
      that.setCurrent(year, month, day);
      // that.setData({ swipeDuration:300});
    }, 300);

  },
  actionBackToday: function (e) {
    let now = new Date();
    this.setCurrent(now.getFullYear(), now.getMonth() + 1, now.getDate());
  },
  actionPickDate: function (e) {
    console.log(e.detail);
    // this.setData({
    //   date: e.detail.value
    // })
    let now = new Date(Date.parse(e.detail.value));
    this.setCurrent(now.getFullYear(), now.getMonth() + 1, now.getDate());
  },
  actionSelect: function (e) {
    let { year, month, day } = e.currentTarget.dataset.item;
    this.setCurrent(year, month, day);
  },

});
