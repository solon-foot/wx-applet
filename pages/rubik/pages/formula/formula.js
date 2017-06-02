// formula.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: [],
    formular: {
      cfop: {

        f: [
          { icon: "f2l-1.png", formular: "(R U R’)" },
          { icon: "f2l-2.png", formular: "y’ (R’ U’ R)或 F’ U’ F" },
          { icon: "f2l-3.png", formular: "y’ U’ (R’ U R)或 F R’ F’ R" },
          { icon: "f2l-4.png", formular: "U R U’ R’或 R’ F R F’" },
          { icon: "f2l-5.png", formular: "U’ (R U R’ U) (R U R’)" },
          { icon: "f2l-6.png", formular: "d (R’ U2 R) d’ (R U R’)" },
          { icon: "f2l-7.png", formular: "U’ (R U’ R’ U) (R U R’)" },
          { icon: "f2l-8.png", formular: "U y’ (R’ U’ R U’) (R’ U’ R)" },
          { icon: "f2l-9.png", formular: "U’ (R U2’ R’) d (R’ U’ R)" },
          { icon: "f2l-10.png", formular: "d (R’ U R U’) (R’ U’ R)" },
          { icon: "f2l-11.png", formular: "U’ (R U2’ R’) U2 (R U’ R’) " },
          { icon: "f2l-12.png", formular: "(U’ R U R’) U2 (R U’ R’)" },
          { icon: "f2l-13.png", formular: "d (R’ U2 R) U2’ (R’ U R)" },
          { icon: "f2l-14.png", formular: "d (R’ U’ R) U2’ (R’ U R)" },
          { icon: "f2l-15.png", formular: "y’ U’ (R’ U2 R) U’ (R’ U R)" },
          { icon: "f2l-16.png", formular: "U R U2 R2’ (F R F’)或U (R U2 R’) U (R U’ R’) " },
          { icon: "f2l-17.png", formular: "U2 (R U R’ U) (R U’ R’)或 (R U’ R’) U2 (R U R’)" },
          { icon: "f2l-18.png", formular: "y’ U2 (R’ U’ R U’) (R’ U R)或 y’ (R’ U R) U2 (R’ U’ R)　" },
          { icon: "f2l-19.png", formular: "U (R U’ R’) U’ (F’ U F)" },
          { icon: "f2l-20.png", formular: " U’ (F’ U F) U (R U’ R’)" },
          { icon: "f2l-21.png", formular: "d (R’ U’ R) d’ (R U R’)" },
          { icon: "f2l-22.png", formular: "U’ (R U R’) d (R’U’ R)" },
          { icon: "f2l-23.png", formular: "U’ (R U2’ R’) U (R U R’) 或 d (R’ U R) U2 (R’ U R)" },
          { icon: "f2l-24.png", formular: "(U’ R U’ R’) U2 (R U’ R’)" },
          { icon: "f2l-25.png", formular: "(R U2’ R’) U’ (R U R’)" },
          { icon: "f2l-26.png", formular: "y’ (R’ U2 R) U (R’ U’ R)" },
          { icon: "f2l-27.png", formular: "(R U’ R’ U) d (R’ U’ R)" },
          { icon: "f2l-28.png", formular: "y’ (R’ U R U’) d’ (R U R’)或 M U L F’ L’ U’ M’" },
          { icon: "f2l-29.png", formular: "(R U’ R’) d (R’ U R)" },
          { icon: "f2l-30.png", formular: "(R U R’ U’)2 (R U R’)或 (U R U’ R’)3" },
          { icon: "f2l-31.png", formular: "(R U’ R’ U) (R U’ R’)" },
          { icon: "f2l-32.png", formular: "y’ (R’ U R) U’ (R’ U R)或 (R U R’ U’) (F R’ F’ R) " },
          { icon: "f2l-33.png", formular: "(R U R’U’) (R U R’)" },
          { icon: "f2l-34.png", formular: " y L’ U’ L U L’ U’ L或 y’ (R’ U’ R U) (R’ U’ R)　" },
          { icon: "f2l-35.png", formular: " (R U R’) d (R’ U R U’) (R’ U R)" },
          { icon: "f2l-36.png", formular: "U2 R2 U2 (R’ U’ R U’) R2 或 (R U R’ U’) U’ (R U R’ U’) (R U R’)" },
          { icon: "f2l-37.png", formular: "(R U’ R’ U) (R U2’ R’) U (R U’ R’)" },
          { icon: "f2l-38.png", formular: "(R U’ R’ U) d (R’ U’ R U’) (R’ U R) " },
          { icon: "f2l-39.png", formular: "(R U’ R’) U’ (R U R’) U2 (R U’ R’) " },
          { icon: "f2l-40.png", formular: "(R U’ R’ U’) (R U’ R’)U (F’ U’ F)" },
          { icon: "f2l-41.png", formular: "(R U’ U’ R’ U)2 y’ (R’ U’ R)" }
        ],
        o: [
          { icon: "oll-1.gif", formular: "R’ U2 R U R’ U R" },
          { icon: "oll-2.gif", formular: "R U’ U’ R’ U’ R U’ R’" },
          { icon: "oll-3.gif", formular: "(r U R’ U’)(r’ F R F’)" },
          { icon: "oll-4.gif", formular: "F’ (r U R’ U’)(r’ F R)" },
          { icon: "oll-5.gif", formular: "(R2 D’)(R U’ U’)(R’ D)(R U’ U’ R)" },
          { icon: "oll-6.gif", formular: "(R U U R’ U’)(R U R’ U’)(R U’ R’)" },
          { icon: "oll-7.gif", formular: "R U’ U’(R2’ U’) (R2 U’) R2’ U2 R" },
          { icon: "oll-8.gif", formular: "F (R U R’ U’) F’" },
          { icon: "oll-9.gif", formular: "f (R U R’ U’) f’" },
          { icon: "oll-10.gif", formular: "B’ U’ (R’ U R B)" },
          { icon: "oll-11.gif", formular: "(R U R’ U’)(R’ F R F’)" },
          { icon: "oll-12.gif", formular: "F (RU R’ U’)2 F’" },
          { icon: "oll-13.gif", formular: "F’ (L’ U’ L U)2 F" },
          { icon: "oll-14.gif", formular: "f (RU R’ U’)2 f’" },
          { icon: "oll-15.gif", formular: "(F R U R’ U’ F’)(f R U R’ U’ f’)" },
          { icon: "oll-16.gif", formular: "(f R U R’ U’ f’) U’ (F R U R’ U’ F’)" },
          { icon: "oll-17.gif", formular: "(f R U R’ U’ f’) U (F R U R’ U’ F’)" },
          { icon: "oll-18.gif", formular: "(R U’ U’)(R2’ F R F’) U2(R’ F R F’)" },
          { icon: "oll-19.gif", formular: "(r’ U2)(R U R’ U) r" },
          { icon: "oll-20.gif", formular: "(r U’ U’)(R’ U’ R U’ r’)" },
          { icon: "oll-21.gif", formular: "r U R’ U R U U r’" },
          { icon: "oll-22.gif", formular: "r’ U’ R U’ R’ U2 r" },
          { icon: "oll-23.gif", formular: "F (R U’ R’ U’)(R U R’ F’)" },
          { icon: "oll-24.gif", formular: "R U’ U’ (R2’ F R F’)(R U’ U’ R’)" },
          { icon: "oll-25.gif", formular: "(R B’)(R2 F)(R2 B)(R2 F’) R" },
          { icon: "oll-26.gif", formular: "(R’ F)(R2 B’)(R2 F’)(R2 B) R’" },
          { icon: "oll-27.gif", formular: "r’ U2(R U R’ U’)(R U R’ U) r" },
          { icon: "oll-28.gif", formular: "r U (R’ UR U’)2 U’ r’" },
          { icon: "oll-29.gif", formular: "(R U R’ U)(R’ F R F’) U2 (R’ F R F’)" },
          { icon: "oll-30.gif", formular: "F (R U R’ U) y’ (R’ U2) (R’ F R F’)" },
          { icon: "oll-31.gif", formular: "(M下 U)(R U R’ U’) M上 (R’ F R F’)" },
          { icon: "oll-32.gif", formular: "(R U R’ U’)(R’ F)(R2U R’ U’) F’" },
          { icon: "oll-33.gif", formular: "(R U R’ U)(R’ F R F’)(R U’ U’ R’)" },
          { icon: "oll-34.gif", formular: "(r U R’ U’)(r’ R)(U R U’ R’)" },
          { icon: "oll-35.gif", formular: "(R U R’ U’) r R’(U R U’ r’)" },
          { icon: "oll-36.gif", formular: "(R’ U’)(R’ F R F’)(U R)" },
          { icon: "oll-37.gif", formular: "(R U R’ U’) x D’(R’ U R) E’" },
          { icon: "oll-38.gif", formular: "(R U R’ U)(R U’ R’ U’)(R’ F R F’)" },
          { icon: "oll-39.gif", formular: "(R’ U’ R U’)(R’ U R U)(l U’ R’ U)" },
          { icon: "oll-40.gif", formular: "(F R U R’ U’ F’) U (F R U R’ U’ F’)" },
          { icon: "oll-41.gif", formular: "(r U R’ U)(R’ F R F’) R U2 r’" },
          { icon: "oll-42.gif", formular: "(R U)(B’ U’)(R’URB R’)" },
          { icon: "oll-43.gif", formular: "(R’ U’ F)(U R U’)(R’ F’ R)" },
          { icon: "oll-44.gif", formular: "R’ F(R U R’ U’) F’(U R)" },
          { icon: "oll-45.gif", formular: "L F’ (L’ U’ L U) F(U’ L’)" },
          { icon: "oll-46.gif", formular: "(R U R’ U R U2 R’)(F R U R’ U’ F’)" },
          { icon: "oll-47.gif", formular: "(R’ U’ R U’ R’ U2 R)(FR U R’ U’ F’)" },
          { icon: "oll-48.gif", formular: "(r’ U2 R U R’ U r)(R U2 R’ U’ R U’ R’)" },
          { icon: "oll-49.gif", formular: " (r U2 R’ U’ R U’ r’)(R’ U2 R U R’ U R)" },
          { icon: "oll-50.gif", formular: "(r U r’)(R U R’ U’)(r U’ r’)" },
          { icon: "oll-51.gif", formular: "(l’ U’ l)(L’ U’ L U)(l’ U l)" },
          { icon: "oll-52.gif", formular: "R’ F(R U R’ F’ R) y’ (R U’ R’)" },
          { icon: "oll-53.gif", formular: "F (U R U’)(R2’ F’)(R U R U’ R’)" },
          { icon: "oll-54.gif", formular: "(R’ U’ R U’)(R’ U) y’ (R’ U R B)" },
          { icon: "oll-55.gif", formular: "(r U r’)(UR U’ R’)2 (r U’ r’)" },
          { icon: "oll-56.gif", formular: "R’ F(U R U’)(R2’ F’)(R2 U R’ U’ R)" },
          { icon: "oll-57.gif", formular: "(r’ R U)(R U R’ U’)(r2 R2’)(U R U’ r’)" }
        ],
        p: [
          { icon: "pll-1.png", formular: "(R U’ R) U (R U R U’) (R’ U’ R2)" },
          { icon: "pll-2.png", formular: "(R2’ U) (R U R’ U’)(R’ U’) (R’ U R’)" },
          { icon: "pll-3.png", formular: "M2 U M2 U2 M2 U M2" },
          { icon: "pll-4.png", formular: "(M2 U M2 U) (M上 U2)(M2 U2) (M上 U2)" },
          { icon: "pll-5.png", formular: "x’ R2 D2 (R’ U’ R) D2 (R’ U R’) x" },
          { icon: "pll-6.png", formular: "x’ (R U’ R) D2 (R’ U R) D2 R2 x" },
          { icon: "pll-7.png", formular: "(R2 U R’ U’) y (R U R’ U’)2 (R U R’) y’ (R U’ R2)" },
          { icon: "pll-8.png", formular: "(R U R’ U’) (R’ F R2 U’ R’ U’) (R U R’ F’)" },
          { icon: "pll-9.png", formular: "(R U R’ F’) (R U R’ U’) (R’ F R2 U’ R’ U’)" },
          { icon: "pll-10.png", formular: "z (U’ R D’) (R2 U R’ U’)(R2 U) D R’" },
          { icon: "pll-11.png", formular: "F (R U’ R’ U’) (R U R’ F’)(R U R’ U’) (R’ F R F’)" },
          { icon: "pll-12.png", formular: "U’ (R’ U R U’) R2’ b’ x (R’ U R) y’ (R U R’ U’ R2)" },
          { icon: "pll-13.png", formular: "(R’ U R’ d’) (R’ F’) (R2 U’ R’ U) (R’ F R F)" },
          { icon: "pll-14.png", formular: "(R U’ U’) (R’ U2) (R B’ R’ U’) (R U R B) R2’ U" },
          { icon: "pll-15.png", formular: "(R’ U2) (R U’ U’) (R’ F R U R’ U’) (R’ F’ R2 U’)" },
          { icon: "pll-16.png", formular: "z (R’ U R’) z’ (R U2 L’ U R’) z (U R’) z’ (R U2 L’ U R’)" },
          { icon: "pll-17.png", formular: "z (U’ R D’) (R2 U R’ U’) z’ (R U R’) z (R2 U R’) D R’" },
          { icon: "pll-18.png", formular: "(R2’ u’) (R U’ R) U (R’ u R2’) y (R U’ R’)" },
          { icon: "pll-19.png", formular: "(R U R’) y’ (R2’ u’) (R U’ R’ U) (R’ u R2)" },
          { icon: "pll-20.png", formular: "(R2’ u R’) (U R’ U’) (R u’ R2’) y’ (R’ U R)" },
          { icon: "pll-21.png", formular: "(R’ d’ F) (R2’ u R’) U (R U’ R) u’ R2" }
        ],
      },
      chichu: {
        edge:[
          { title: "AE", formular: "U2 M' U2 M" },
          { title: "EA", formular: "M' U2 M U2" },
          { title: "CG", formular: "U  M' U2 M U" },
          { title: "GC", formular: "U' M' U2 M U'" },
          { title: "DH", formular: "(M U' M U2)(M' U' M')" },
          { title: "HD", formular: "(M U  M U2)(M' U  M')" },
          { title: "CH", formular: "y' (U' R2 U) M (U' R2 U) M' y " },
          { title: "HC", formular: "y' M (U' R2 U) M' (U' R2 U) y" },
          { title: "DG", formular: "y' M' (U R2 U') M (U R2 U') y" },
          { title: "GD", formular: "y' (U R2 U') M' (U R2 U') M y" },
          
        ],
        angle:[
          { title: "AJ", formular: "x L2' (U R U') L2' (U R' U') x'" },
          { title: "JA", formular: "x (U R U') L2' (U R' U') L2' x'" },
          { title: "AK", formular: "L2' (U' R' U) L2' (U' R U)" },
          { title: "KA", formular: "(U' R' U) L2' (U' R U) L2'" },
          { title: "AL", formular: "z [U2 (R' F' R2' F R)]×2 z'" },
          {title: "LA", formular: "z [(R' F' R2' F R) U2]×2 z'" },
          { title: "BJ", formular: "(R U2 R D') (R' U2 R D) R2'" },
          { title: "JB", formular: "(R2 D' R' U2)(R D R' U2) R'" },
          { title: "BK", formular: "y' U' (R D2 R' U)(R D2 R') y" },
          { title: "KB", formular: "y' (R D2 R' U')(R D2 R' U) y" },
          { title: "BL", formular: "y' U (L' U' R' U)(L U' R) y" },
          { title: "LB", formular: "y' (R' U L' U')(R U L U') y" },
          { title: "CJ", formular: "y' z D (R' U2 R D')(R' U2 R) z' y" },
          { title: "JC", formular: "y' z (R' U2 R D)(R' U2 R D') z' y" },
          { title: "CK", formular: "x (R' U2 R' D)(R U2 R' D') R2 x'" },
          { title: "KC", formular: "x (R2' D R U2)(R' D' R U2) R x'" },
          { title: "CL", formular: "U' (R' D2 R U)(R' D2 R)" },
          { title: "LC", formular: "(R' D2 R U')(R' D2 R U)" },
        ],

      },
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ show: this.data.formular[options.a][options.b]});
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