// pages/stoke/index.js
const GAME_DATA = require('/js/game_data')
const Mode = require('/js/mode')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickRange: {
      data: [],
      index: 0
    },
    gameEdit: false
  },
  mode: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.mode = new Mode(GAME_DATA[0]);
    this.data.screenWidth = wx.getSystemInfoSync().windowWidth;
    let len = GAME_DATA.length;
    let games = [];
    for (let i = 0; i < len; i++) {
      games.push("第" + (i + 1) + "题")
    }
    this.setData({
      pickRange: {
        data: games,
        index: 0
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.draw();

  },

  onShareAppMessage: function() {

  },
  draw: function() {
    const screenWidth = this.data.screenWidth;
    const padding = screenWidth / 10;

    var context = wx.createCanvasContext('canvas');
    const data = this.mode.data;
    const width = data[0].length;
    const height = data.length;
    const item_width = screenWidth / (Math.max(width, height) + 1);
    const leftMargin = (screenWidth - width * item_width) / 2;
    const topMargin = padding / 2;
    const radius = item_width * 0.45;
    // context.fillRect(leftMargin, topMargin, item_width*width,item_width*height);
    context.fillStyle = "gray";
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j]) {

          this.drawDot(context,
            leftMargin + item_width * j + item_width / 2,
            topMargin + i * item_width + item_width / 2,
            radius);
        }
      }
    }
    const start = this.mode.start;
    const end = this.mode.end;
    context.fillStyle = "orange";
    if (start) {
      this.drawDot(context,
        item_width * start.x + item_width / 2 + leftMargin,
        item_width * start.y + item_width / 2 + topMargin, radius);
    }
    if (end) {
      this.drawDot(context,
        item_width * end.x + item_width / 2 + leftMargin,
        item_width * end.y + item_width / 2 + topMargin, radius);
    }

    //绘制游戏的线条

    // context.fillStyle = "or"
    let path = this.mode.path;

    if (path.length > 0) {
      context.lineWidth = radius * 2;
      context.beginPath();
      context.strokeStyle = "orange";
      this.drawDot(context,
        item_width * path[0].x + item_width / 2 + leftMargin,
        item_width * path[0].y + item_width / 2 + topMargin, radius);


      for (var i = 1; i < path.length; i++) {
        this.drawDot(context,
          item_width * path[i].x + item_width / 2 + leftMargin,
          item_width * path[i].y + item_width / 2 + topMargin, radius);
        context.beginPath();
        context.moveTo(leftMargin + path[i - 1].x * item_width + item_width / 2,
          topMargin + path[i - 1].y * item_width + item_width / 2)
        context.lineTo(leftMargin + path[i].x * item_width + item_width / 2,
          topMargin + path[i].y * item_width + item_width / 2);
        context.stroke();
      }
      context.stroke();
    }


    //绘制起始/结束表示
    context.lineWidth = 4;
    context.beginPath();
    context.strokeStyle = "white";
    if (start) {
      context.moveTo(leftMargin + start.x * item_width + item_width * 0.3,
        topMargin + start.y * item_width + item_width * 0.3)
      context.lineTo(leftMargin + start.x * item_width + item_width * 0.7,
        topMargin + start.y * item_width + item_width * 0.7);
      context.moveTo(leftMargin + start.x * item_width + item_width * 0.7,
        topMargin + start.y * item_width + item_width * 0.3)
      context.lineTo(leftMargin + start.x * item_width + item_width * 0.3,
        topMargin + start.y * item_width + item_width * 0.7);

    }
    if (end) {
      context.moveTo(leftMargin + end.x * item_width + item_width * 0.3,
        topMargin + end.y * item_width + item_width * 0.3)
      context.lineTo(leftMargin + end.x * item_width + item_width * 0.7,
        topMargin + end.y * item_width + item_width * 0.7);
      context.moveTo(leftMargin + end.x * item_width + item_width * 0.7,
        topMargin + end.y * item_width + item_width * 0.3)
      context.lineTo(leftMargin + end.x * item_width + item_width * 0.3,
        topMargin + end.y * item_width + item_width * 0.7);
    }
    context.stroke();
    context.draw();
  },
  drawDot: function(cxt, x, y, radius) {

    cxt.beginPath();
    cxt.arc(x, y, radius, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
  },
  eventToPos(e) {
    const screenWidth = this.data.screenWidth;
    const padding = screenWidth / 10;

    const data = this.mode.data;
    const width = data[0].length;
    const height = data.length;
    const item_width = screenWidth / (Math.max(width, height) + 1);
    const leftMargin = (screenWidth - width * item_width) / 2;
    const topMargin = padding / 2;

    let {
      x,
      y
    } = e.changedTouches[0];
    x = x - leftMargin;
    y = y - topMargin;
    if (x < 0 || y < 0 || x > item_width * width || y > item_width * height) {
      return null;
    }
    x = Math.floor(x / item_width);
    y = Math.floor(y / item_width);
    console.log(e,x, y);

    return {
      x,
      y
    };
  },
  canvasTouchStart: function(e) {
    // if (this.data.gameEdit) return true;
    let pos = this.eventToPos(e);
    console.log("canvasTouchStart", pos, this.gameEdit);
  },
  canvasTouchMove: function(e) {
    // if (this.data.gameEdit) return true;
    let pos = this.eventToPos(e);
    console.log("canvasTouchMove", pos, this.gameEdit);
  },
  canvasTouchEnd: function(e) {
    // if (this.data.gameEdit) return true;
    let pos = this.eventToPos(e);
    console.log("canvasTouchEnd", pos, this.gameEdit);
  },
  canvasLongTap: function(e) {
    // if (!this.data.gameEdit) return;
    let pos = this.eventToPos(e);
    console.log("canvasLongTap", pos, this.gameEdit);
  },
  canvasTap: function(e) {
    // if (!this.data.gameEdit) return;
    e.changedTouches=[e.detail];
    let pos = this.eventToPos(e);
    console.log("canvasTap", pos,this.gameEdit);
  },
  actionPick: function(e) {
    let index = e.detail.value;
    let pickRange = this.data.pickRange;
    pickRange.index = index;
    this.setData({
      pickRange,
      gameEdit: false
    });
    this.mode = new Mode(GAME_DATA[index]);
    this.draw();
  },
  actionSolve: function(e) {
    const that = this;
    this.setData({
      gameEdit: false
    });
    this.mode.solve(() => {
      that.draw();
      return 50;
    }).then(data => {
      if (!data) {
        wx.showToast({
          title: '无解',
          icon: 'error',
          image: "/imgs/fail.png",
          duration: 2000
        });
      } else {

      }
    }, e => {
      console.log(e)
    });

  },
  actionPick1: function(e) {
    console.log(e);
    let len = Number.parseInt(e.detail.value) + 5;
    let arr = [];
    for (let i = 0; i < len; i++) {
      let arr2 = []
      for (let j = 0; j < len; j++) {
        arr2.push(true)
      }
      arr.push(arr2);
    }
    this.mode = new Mode(arr);
    this.setData({
      gameEdit: true
    });
    this.draw();
  },
  actionCustom: function(e) {
    this.setData({
      gameEdit: false
    });

    this.draw();
  }
})