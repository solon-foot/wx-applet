function Mode(arr, start, end) {
  if (arr === undefined) {
    arr = new Array(9);
    for (var i = 0; i < 9; i++) {
      arr[i] = new Array(9);
      for (var j = 0; j < 9; j++) {
        arr[i][j] = 0
      }
    }
    this.data = arr;
  } else if (typeof arr === "string") {
    arr = str2Array(arr);
    let start = arr.start;

    this.start = start[0];
    this.end = start[1];
    this.data = arr.data;
    console.log(arr);
  } else {
    this.data = arr;
    this.start = start;
    this.end = end;
  }
  //处理起点
  this.path = [];
  this.start = null;
  this.end = null;
  if (!this.start) { //没有起始点，我就找一个，找不到，就随便搞一个
    let data = this.data;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (isOddPoint(data, j, i) == 1) {
          this.start = {
            x: j,
            y: i
          }
          console.log(j,i);
          break;
        }
      }
    }

    if (!this.start) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (data[i][j]) {
            this.start = {
              x: j,
              y: i
            }
            console.log(j, i);
            break;
          }
        }
      }
    }
  }
  if (this.end) {
    let e = this.end;
    if (isOddPoint(this.data, e.x, e.y) == 1) {
      this.end = this.start;
      this.start = e;
    }
  }

  // let e = this.end;
  // this.end = this.start;
  // this.start = e;

}
Mode.prototype.solveSync = function() {
  let path = [];
  gameProcess(this.data, this.start, this.end, path);
  this.path = path;
  return path;
}
Mode.prototype.solve = function(cb) {
  const that = this;
  let path = [];
  return gameProcess2(this.data, this.start, this.end, path, function(data, p) {
    that.path = path;
    if (cb) return cb();
    return 0;
  });
}
Mode.prototype.toString = function() {
  //●
  let data = this.data;
  let sb = "╔";
  for (let i = 0; i < data[0].length; i++) {
    sb += "══"
  }
  sb += "═╗\n";
  for (let i = 0; i < data.length; i++) {
    sb += "║";
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j]) {
        if ((this.start && this.start.x) == j && (this.start && this.start.y) == i ||
          (this.end && this.end.x) == j && (this.end && this.end.y) == i) {
          sb += " ○";
        } else {
          sb += " ●" //●//○
        }
        // sb += " ●"//●//○
      } else {
        sb += "  "
      }
    }
    sb += " ║\n";
  }
  sb += "╚";
  for (let i = 0; i < data[0].length; i++) {
    sb += "══"
  }
  sb += "═╝\n";
  return sb;

}

function str2Array(str) {
  let a1 = str.split(";");
  let a2 = new Array(a1.length)
  let start = [];
  for (let i = 0; i < a1.length; i++) {
    let temp = a1[i].split("");
    let a3 = new Array(temp.length);
    a2[i] = a3;
    for (let j = 0; j < temp.length; j++) {
      let temp2 = temp[j];
      if (temp2 == 0) {
        a3[j] = false;
      } else if (temp2 == 1) {
        a3[j] = true;
      } else if (temp2 == "x") {
        a3[j] = true;
        start.push({
          x: j,
          y: i
        });
      }
    }
  }
  return {
    data: a2,
    start
  };
}

module.exports = Mode;
var sleep = function(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // 返回 ‘ok’
      resolve('ok');
    }, time);
  })
};
async function gameProcess2(arr, start, end, path, cb) {
  path.push(start);
  // console.log(path);
  //绘制path


  var x = start.x;
  var y = start.y;
  arr[y][x] = false;
  // await reloadCanvas();
  await sleep(cb(arr, path))
  if (end && end.x == x && end.y == y) {
    return checkOk(arr);
  }
  //如果不连通，直接return false;
  if (!checkOk2(arr, x, y, end)) {
    return false;
  }
  console.log(arr);
  if (checkOk(arr)) {
    return true
  }
  if (x > 0 && arr[y][x - 1]) {
    arr[y][x - 1] = false;
    if (!checkAroundOddPoint(arr, x, y, end)) {
      var p = await gameProcess2(arr, {
        x: x - 1,
        y
      }, end, path, cb);
      if (p) {
        return true;
      } else {
        arr[y][x - 1] = true;
        path.splice(path.length - 1, 1);
        // await reloadCanvas();
      }
    } else {
      arr[y][x - 1] = true;
    }



  }

  if (x < arr[y].length - 1 && arr[y][x + 1]) {
    arr[y][x + 1] = false;
    if (!checkAroundOddPoint(arr, x, y, end)) {

      var p = await gameProcess2(arr, {
        x: x + 1,
        y
      }, end, path, cb);
      if (p) {

        return true;
      } else {
        arr[y][x + 1] = true;
        path.splice(path.length - 1, 1);
        // await reloadCanvas();
      }
    } else {
      arr[y][x + 1] = true;
    }
  }

  if (y > 0 && arr[y - 1][x]) {


    arr[y - 1][x] = false;
    if (!checkAroundOddPoint(arr, x, y, end)) {
      var p = await gameProcess2(arr, {
        x,
        y: y - 1
      }, end, path, cb);
      if (p) {
        return true;
      } else {
        arr[y - 1][x] = true;
        path.splice(path.length - 1, 1);
        // await reloadCanvas();
      }
    } else {
      arr[y - 1][x] = true;
    }
  }

  if (y < arr.length - 1 && arr[y + 1][x]) {
    arr[y + 1][x] = false;
    if (!checkAroundOddPoint(arr, x, y, end)) {
      var p = await gameProcess2(arr, {
        x,
        y: y + 1
      }, end, path, cb);
      if (p) {
        return true;
      } else {
        arr[y + 1][x] = true;
        path.splice(path.length - 1, 1);
      }
    } else {
      arr[y + 1][x] = true;
    }
  }

  // arr[y][x] = true;
  // path.splice(len, 1);
  // await reloadCanvas();
  // 走到了尽头了
  return false;



}

function gameProcess(arr, start, end, path) {
  path.push(start);
  // console.log(path);
  //绘制path


  var x = start.x;
  var y = start.y;
  arr[y][x] = false;
  // await reloadCanvas();
  if (end && end.x == x && end.y == y) {
    return checkOk(arr);
  }
  //如果不连通，直接return false;
  if (!checkOk2(arr, x, y)) {
    return false;
  }
  if (checkOk(arr)) {
    return true
  }
  if (x > 0 && arr[y][x - 1] && !checkAroundOddPoint(arr, x - 1, y)) {
    //增加判断 向这个方向移动后，会不会使得周边的点变得孤立，及联通性为1，并且这个点不是end点

    var p = gameProcess(arr, {
      x: x - 1,
      y
    }, end, path);
    if (p) {
      return true;
    } else {
      arr[y][x - 1] = true;
      path.splice(path.length - 1, 1);
      // await reloadCanvas();
    }
  }

  if (x < arr[y].length - 1 && arr[y][x + 1] && !checkAroundOddPoint(arr, x + 1, y)) {
    var p = gameProcess(arr, {
      x: x + 1,
      y
    }, end, path);
    if (p) {

      return true;
    } else {
      arr[y][x + 1] = true;
      path.splice(path.length - 1, 1);
      // await reloadCanvas();
    }
  }

  if (y > 0 && arr[y - 1][x] && !checkAroundOddPoint(arr, x, y - 1)) {
    var p = gameProcess(arr, {
      x,
      y: y - 1
    }, end, path);
    if (p) {
      return true;
    } else {
      arr[y - 1][x] = true;
      path.splice(path.length - 1, 1);
      // await reloadCanvas();
    }
  }

  if (y < arr.length - 1 && arr[y + 1][x] && !checkAroundOddPoint(arr, x, y + 1)) {
    var p = gameProcess(arr, {
      x,
      y: y + 1
    }, end, path);
    if (p) {
      return true;
    } else {
      arr[y + 1][x] = true;
      path.splice(path.length - 1, 1);
    }
  }
  // arr[y][x] = true;
  // path.splice(len, 1);
  // await reloadCanvas();
  // 走到了尽头了
  return false;



}

function checkOk(arr) { //检查所有点是否都走到
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function checkOk2(a, x, y, end) { //检查连通性，存在孤立点则不能继续
  var arr = [];
  for (var i = 0; i < a.length; i++) {
    arr.push(a[i].concat());
  }
  // if(end){
  //   arr[end.y][end.x] = false;
  // }
  _checkOk2(arr, y, x);
  return checkOk(arr);
}

function _checkOk2(arr, y, x) {
  arr[y][x] = false;
  if (x > 0 && arr[y][x - 1]) {
    _checkOk2(arr, y, x - 1)
  }

  if (x < arr[y].length - 1 && arr[y][x + 1]) {
    _checkOk2(arr, y, x + 1);
  }

  if (y > 0 && arr[y - 1][x]) {
    _checkOk2(arr, y - 1, x);
  }

  if (y < arr.length - 1 && arr[y + 1][x]) {
    _checkOk2(arr, y + 1, x);
  }
}

function getChannel(arr, x, y) { //检查点的连通性
  if (!arr[y][x]) return 0;
  let count = 0;
  if (x > 0 && arr[y][x - 1]) {
    count++;
  }

  if (x < arr[y].length - 1 && arr[y][x + 1]) {
    count++;
  }

  if (y > 0 && arr[y - 1][x]) {
    count++;
  }

  if (y < arr.length - 1 && arr[y + 1][x]) {
    count++;
  }
  return count;
}

function isOddPoint(arr, x, y, end) { //是只有一个出路的点
  if (end && end.x == x && end.y == y) {
    return 0
  }
  return getChannel(arr, x, y) == 1;
}
var count = 0;

function checkAroundOddPoint(arr, x, y, end) {
  // return false;

  let b = _checkAroundOddPoint(arr, x, y, end);
  return b;
}

function _checkAroundOddPoint(arr, x, y, end) {
    if(!end)return false;

  //  return false;
  if (x > 0 && isOddPoint(arr, x - 1, y, end)) {
    return true;
  }

  if (x < arr[y].length - 1 && isOddPoint(arr, x + 1, y, end)) {
    return true;
  }

  if (y > 0 && isOddPoint(arr, x, y - 1, end)) {
    return true;
  }

  if (y < arr.length - 1 && isOddPoint(arr, x, y + 1, end)) {
    return true;
  }
  return false;
}