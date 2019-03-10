// pages/klotski.js
Page({

  /**
   * Page initial data
   */
  data: {
      game:[[]],
      gameLevel:4,
      step:0
  },
  emptyPos:{
    x:-1,y:-1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let level = this.data.gameLevel;
    var data = this.createGame(level);
    for(let i=0;i<level;i++) {
      for(let j=0;j<level;j++) {
        if(data[i][j]==level*level){
          this.emptyPos.x = j;
          this.emptyPos.y = i;
          break
        }
      }
    }
      this.setData({game:data})
  },
  onClick:function(e){
    let {x,y} = e.target.dataset;
    let {x:xx,y:yy} = this.emptyPos;
    console.log(x,y,xx,yy);
    if(Math.abs(x-xx)+Math.abs(y-yy)==1){
      let data = this.data.game;
      let t = data[yy][xx];
      data[yy][xx]=data[y][x];
      data[y][x] = t;
      this.setData({game:data,step:this.data.step+1})
      this.emptyPos={x,y};
      console.log(this.data.step)
    }
    // console.log(this.data.game[y][x]);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },createGame:function (level) {
    var temp=[];
    let max = level*level;
    for(let i=1;i<max;i++){
      temp.push(i);
    }
    let count =0;
    temp.sort(()=>{
      if(Math.random()>0.5){
        count++;
        return 1;
      } else{
        return -1;
      }}
      );
      let emptyPos= {x:-1,y:-1};
      if((level&1)==0){
        let y = Math.round(Math.random()*level-0.5);
        let x = Math.round(Math.random()*(level>>1)-0.5)*2;
        x = ((count & 1) == 0)?x:x+1;
        emptyPos = {x,y};
      } else{
        if ((count & 1) == 1){//交换最后两个
          let len = temp.length;
          let t = temp[len-1];
          temp[len-1] = temp[len-2];
          temp[len-2] = t;
        }
        emptyPos = { x: Math.round(Math.random() * level - 0.5), y: Math.round(Math.random() * level - 0.5)};
      }
      temp.splice(emptyPos.x+emptyPos.y*level,0,level*level);
      console.log(emptyPos);
    let data=[];
    for(let i=0;i<max;i+=level) {
      data.push(temp.slice(i,i+level));
    }
    return data;
  },
  bubbleOrder:function(arr) {
    let i, j, count = 0;
    const swap = (tar, lastIndex, newIndex) => {
      let temp = tar[lastIndex];
      tar[lastIndex] = tar[newIndex];
      tar[newIndex] = temp;
      count++;
    }
    for (i = 0; i < arr.length; i++) {
      for (j = arr.length - 1; j > i; j--) {
        (arr[j] < arr[j - 1]) && swap(arr, j - 1, j);
      }
    }
    return count;
  }
})