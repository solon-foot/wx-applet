const util = require('../../utils/util.js')
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
    let user = util.parseIdCard("410821199110281513")
    user.name = "张志";
    user.nation = "汉";
    users.push(user);

    // user = util.parseIdCard("362204199007074856")
    // user.name = "陈杰";
    // user.nation = "汉";
    // users.push(user);

    // user = util.parseIdCard("410782198905200046")
    // user.name = "丁苗行";
    // user.nation = "汉";
    // users.push(user);

    // user = util.parseIdCard("410821199012231512")
    // user.name = "焦红展";
    // user.nation = "汉";
    // users.push(user);

    // user = util.parseIdCard("410223199003267054")
    // user.name = "李斌";
    // user.nation = "汉";
    // users.push(user);

    // user = util.parseIdCard("320924196907292155")
    // user.name = "沈海兵";
    // user.nation = "汉";
    // users.push(user);

    user = util.parseIdCard("430903200005144551")
    user.name = "熊腾飞";
    user.nation = "汉";
    users.push(user);

    user = util.parseIdCard("430903199012204545")
    user.name = "熊卫";
    user.nation = "汉";
    users.push(user);
    // user = util.parseIdCard("410727199101056229")
    // user.name = "院东丽";
    // user.nation = "汉";
    // users.push(user);
    // user = util.parseIdCard("430903200010074519")
    // user.name = "余秋林";
    // user.nation = "汉";
    // users.push(user);
    


    // users.push({
    //   name:"志",
    //   sex:true,
    //   nation:"汉",
    //   address:"河南省焦作市修武县\n郇封镇郇封村",
    //   idCard:"430512198908131367",
    //   birth:new Date(),
    //   birth_year:"",
    //   birth_month:"",
    //   birth_day:""
    // });
    this.setData({ users });
  }
})
