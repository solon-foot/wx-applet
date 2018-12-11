// pages/user/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_id: 1,
    family: [
      {
        id: 1,
        pid: 0,
        name: "方英",
      }],
      modal:{
        show:false,
        text:"",
      }
    


  },
  findAndAdd: function (data, pid, item,action) {//add del edit
    if (!data || data.length == 0) return false;
    for (let i in data) {
      if (!data[i].children) data[i].children = [];
      if (data[i].id == pid) {
        if(action == "add") {
          
          data[i].children.push(item);
        } else if(action == 'del') {
          data[i].children = [];
          data.splice(i,1);
        } else if(action == 'edit') {
          data[i] = item;
        }
        
        return true;
      }
      if (this.findAndAdd(data[i].children, pid, item,action)) {
        return true;
      }
    }

  },
  click: function (e) {
    let item = e.target.dataset.item;


    wx.showActionSheet({
      itemList: ['添加子女', '添加父亲', '删除自己及子女', '编辑', '详情'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.showModal(item,"add");
            // this.addChild(item);
            break;
          case 1:
            this.showModal(item, "addP");
            // this.addParent(item);
            break;
          case 2:
            // this.showModal(item, "del");
            this.deleteSelf(item);
            break;
          case 3:
            this.showModal(item, "edit");
            // this.editSelf(item);
            break;
        }

      }
    })



  }, deleteSelf: function (item) {
    let children = this.data.family;
    if(item.pid==0)return;
    if (this.findAndAdd(children, item.id, item, 'del')) {
      this.setData({ family: children });
    }

  },save:function(){
      this.closeModal();
      let modal = this.data.modal;
      let children = this.data.family;
      let child;
      if(modal.action == 'addP') {
        if (modal.item.pid == 0) {
          let children = [{ id: this.data.data_id + 1, name: modal.text, pid: 0, children: [modal.item] }]
          this.setData({ family: children, data_id: this.data.data_id + 1 });
        }
      } else if(modal.action == "add") {
        child = { id: this.data.data_id + 1, name: modal.text + "", pid: modal.item.id, children: [] };
        if (this.findAndAdd(children, child.pid, child, modal.action)) {
          this.setData({ family: children, data_id: this.data.data_id + 1 });
        }
      } else if(modal.action == "edit") {
        child = modal.item;
        child.name = modal.text;
        if (this.findAndAdd(children, child.id, child, modal.action)) {
          this.setData({ family: children, data_id: this.data.data_id + 1 });
          
        }
      }
    this.saveDataToLocal();


      
      
  },closeModal:function(){
    let modal = this.data.modal;
    modal.show = false;
    this.setData({modal:modal});
  },showModal:function(item,action){
    let modal = { show: true, item: item, action: action,text:"" };
    if(action == "edit") {
      modal.text = item.name;
    }
    this.setData({ modal });
  },inputAction:function(e) {
    let modal = this.data.modal;
    modal.text = e.detail.value;
    this.setData({modal});
  },saveDataToLocal:function() {
    wx.setStorage({
      key: 'family',
      data: {family:this.data.family,data_id:this.data.data_id},
    });
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'family',
      success: function(res) {
        if(res.data) {
          that.setData(res.data);
        }
      },
    })
  }, onShareAppMessage: function () {

  }
})