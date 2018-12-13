// pages/sudoku/index.js
const GAME_DATA = require('/js/game_data')
const Shudu = require('/js/shudu')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shudu: null, //数独对象
    shudu2: null, //
    currentPos: null,//当前位置
    screenWidth: null,
    pickRange:{data:[],index:0},
    gameEdit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shudu = new Shudu(GAME_DATA[0]);
    this.data.shudu2 = this.data.shudu.copy();
    this.data.screenWidth = wx.getSystemInfoSync().windowWidth;
    let len = GAME_DATA.length;
    let games = [];
    for(let i=0;i<len;i++) {
      games.push("第"+(i+1)+"题")
    }
    this.setData({pickRange:{data:games,index:0}});
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.draw();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  draw: function () {
    var context = wx.createCanvasContext('canvas');
    let shudu = this.data.shudu;
    let shudu2 = this.data.shudu2;

    //处理绘制尺寸
    const screenWidth = this.data.screenWidth;
    
    const padding = screenWidth / 10;
    const item_width = padding;
    const font_size = item_width * 0.7;
    const cell_width = (screenWidth-padding)/10;

    const leftMargin = padding/2;
    const topMargin = 2;
    const screenHeight = topMargin+item_width*9 + cell_width+ padding*2;
    
    context.setTextAlign("center")
    context.setTextBaseline("middle")
    context.setFontSize(font_size);
    //绘制数字
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (shudu.shudu[i][j]) {
          context.fillStyle = "#999";
          context.fillRect(leftMargin + j * item_width, topMargin + i * item_width, item_width, item_width);
          context.fillStyle = "black";
          context.font = "normal bold 18px sans-serif";
          context.fillText(
            shudu.shudu[i][j],
            item_width * j + leftMargin + item_width / 2,
            item_width * i + topMargin + item_width / 2
          );
        } else if (shudu2 && shudu2.shudu[i][j]) {
          context.fillStyle = "black";
          context.font = "normal lighter 18px sans-serif";
          context.fillText(
            shudu2.shudu[i][j],
            item_width * j + leftMargin + item_width / 2,
            item_width * i + topMargin + item_width / 2
          );
        }
      }
    }


    //绘制底部选择区域
    for (var i = 0; i < 10; i++) {
      context.strokeStyle = 'gray'
      context.strokeRect(
        i * cell_width + leftMargin,
        item_width * 9 + topMargin+padding/2,
        cell_width,
        cell_width
      );
      context.fillStyle = "black";
      // context.font = font_size + "px sans-serif";
      context.fillText(
        i == 0 ? 'X' : i,
        cell_width * i + leftMargin + cell_width / 2,
        item_width * 9 + cell_width / 2+topMargin + padding/2
      );

    }


    //绘制棋盘
    //绘制细线
    context.strokeStyle = "black";
    context.beginPath();
    context.lineWidth = 1;
    for (var i = 0; i < 10; i++) {
      if (i == 0 || i == 9 || i == 3 || i == 6) {
        continue;
      }
      context.moveTo(leftMargin, topMargin + i * item_width);
      context.lineTo(leftMargin + item_width * 9, i * item_width + topMargin);
      context.moveTo(leftMargin + i * item_width, topMargin)
      context.lineTo(leftMargin + i * item_width, topMargin + item_width * 9);
    }
    context.stroke();
    //绘制中间线
    context.lineWidth = 3;
    context.beginPath();
    for (var i = 0; i < 10; i++) {
      if (i == 0 || i == 9) {
        continue;
      } else if (i == 3 || i == 6) {

      } else {
        continue;
      }
      context.moveTo(leftMargin, topMargin + i * item_width);
      context.lineTo(leftMargin + item_width * 9, i * item_width + topMargin);
      context.moveTo(leftMargin + i * item_width, topMargin)
      context.lineTo(leftMargin + i * item_width, topMargin + item_width * 9);

    }
    context.stroke();
    //绘制外边框
    context.lineWidth = 4;
    context.strokeRect(leftMargin, topMargin, item_width * 9, item_width * 9);


    //绘制选中区
    context.lineWidth = 3;
    context.strokeStyle = "blue";
    let currentPos = this.data.currentPos;
    if (currentPos != null) {
      context.strokeRect(
        currentPos[1] * item_width + leftMargin,
        currentPos[0] * item_width + topMargin,
        item_width,
        item_width
      );
    }
    context.draw();

  }, canvasTouchEnd:function(e){
    let shudu = this.data.shudu;
    let shudu2 = this.data.shudu2;
    let { x, y } = e.changedTouches[0];
    const screenWidth = this.data.screenWidth;

    const padding = screenWidth / 10;
    const item_width = padding;
    const cell_width = (screenWidth - padding) / 10;
    const leftMargin = padding / 2;
    const topMargin = 2;
    const screenHeight = topMargin + item_width * 9 + cell_width + padding * 2;
  
    var posX = x - leftMargin;
    var posY = y-topMargin;
    if (posX > 0 && posX < item_width*9 &&
      posY>0 && posY<item_width*9
    ) {

      let currentPos = [Math.ceil(posY / item_width)-1, Math.ceil(posX / item_width)-1];
      
      if (shudu.shudu[currentPos[0]][currentPos[1]]) {
        currentPos = null;
      }
      this.setData({currentPos});
      this.draw();
      return;
    } else if (posX>0 && posX<cell_width*10 && y>item_width*9+padding/2 && y<item_width*9+padding/2+cell_width) {
      let currentPos = this.data.currentPos;
      if (currentPos != null) {
        shudu2.shudu[currentPos[0]][currentPos[1]] = Math.ceil(posX / cell_width - 1);
        this.draw();
      }
    } else {
      this.setData({ currentPos:null });
      this.draw();
    }

  },actionPick:function(e) {
      console.log(e.detail.value);
    let index = e.detail.value;
    let pickRange = this.data.pickRange;
    pickRange.index = index;
    this.setData({pickRange});
    this.data.shudu = new Shudu(GAME_DATA[e.detail.value]);
    this.data.shudu2 = this.data.shudu.copy();
    this.draw();
  },actionSolve:function(e){
    let shudu2 = this.data.shudu2;
    let shudu = this.data.shudu;
    if (this.data.gameEdit) {
      shudu = shudu2.copy();
    }
  
    shudu2 = shudu.solve();
    if(shudu2){
      this.setData({ shudu, shudu2,gameEdit:false });
      this.draw();
    } else {
      wx.showToast({
        title: '无解',
        icon: 'error',
        image:"/imgs/fail.png",
        duration: 2000
      })
    }
    
  },actionCustom:function(e) {

    let shudu = this.data.shudu;
    let shudu2 = this.data.shudu2;
    if (this.data.gameEdit) {
     
      shudu = shudu2.copy();
      this.setData({gameEdit:false,shudu,currentPos:null});
    } else {
      
      shudu = new Shudu();
      shudu2 = new Shudu();
      this.setData({ gameEdit: true,currentPos:null,shudu,shudu2 });
    }
    this.draw();
  }
})