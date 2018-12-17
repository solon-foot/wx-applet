function TouchModle() {


}
TouchModle.prototype.setOnTap = function(cb) {
  this.onTap = cb;
}
TouchModle.prototype.setOnLongTap = function(cb) {
  this.onLongTap = cb;
}
TouchModle.prototype.start = function(e) {
  if (this.onLongTap) {
    this.hasOnLongTap = false;

    this.timer = setTimeout(() => {
      this.hasOnLongTap = true;
      if(this.detLen<10){
        let type = e.type;
        e.type = "longtap";
        this.onLongTap(e);
        e.type = type;
      }
      
      
    }, 500);
  }
  let {
    x,
    y
  } = e.changedTouches[0];
  this.lastPos = {
    x,
    y
  };
  this.detLen = 0;
}
TouchModle.prototype.end = function(e) {
  clearTimeout(this.timer);
  let {
    x,
    y
  } = e.changedTouches[0];
  if (this.lastPos) {

    let {
      x: x1,
      y: y1
    } = this.lastPos;
    this.detLen += (x - x1) * (x - x1) + (y - y1) * (y - y1);
  }
  if (!this.hasOnLongTap && this.detLen < 10 && this.onTap) {
    let type = e.type;
    e.type = "tap"
    this.onTap(e);
    e.type = type;
  }
  this.detLen = 0;
}
TouchModle.prototype.move = function(e) {
  let {
    x,
    y
  } = e.changedTouches[0];
  if (this.lastPos) {
    let {
      x: x1,
      y: y1
    } = this.lastPos;
    this.detLen += (x - x1) * (x - x1) + (y - y1) * (y - y1);
    this.lastPos = {
      x,
      y
    };
  }

}
TouchModle.prototype.cancel = function(e) {
  clearTimeout(this.timer);
}

module.exports = TouchModle;