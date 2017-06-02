// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(

      {
        list: [
          {
            name: 'CFOP',
            // url:"",
            list: [
              {
                name: "简介",
                icon: "cfop-1.gif",
              },
              {
                name: "CROSS",
                url: "pages/formula/formula?a=cfop&b=c",
                icon: "cfop-1.gif",
              },
              {
                name: "F2L",
                url: "pages/formula/formula?a=cfop&b=f",
                icon: "cfop-2.gif",
              },
              {
                name: "OLL",
                url: "pages/formula/formula?a=cfop&b=o",
                icon: 'cfop-3.gif',
              },
              {
                name: "PLL",
                url: "pages/formula/formula?a=cfop&b=p",
                icon: 'cfop-4.gif',
              }
            ],
          },
          {
            name: '彳亍法',
            // url: "",
            list: [{
              name: '简介',
              url: "pages/formula/formula?a=chichu&b=edge"
            }, {
              name: "角块三循环",
              url: "pages/formula/formula?a=chichu&b=angel"
            }, {
              name: "三棱换",
              url: "pages/formula/formula?a=chichu&b=edge"
            }, {
              name: "奇偶校验",
              url: "pages/formula/formula?a=cfop&b=p"
            }, {
              name: "翻色",
              url: "pages/formula/formula?type=cfop-c"
            }
            ],
          }
        ]
      }
    );
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    // for (var i = 0, len = list.length; i < len; ++i) {


    if (list[id].url) {
      wx.navigateTo({
        url: 'pages/' + list[id].url
      })
      return
    }
    list[id].open = !list[id].open

    // }
    this.setData({
      list: list
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})