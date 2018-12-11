function Mode(arr) {
  if (arr === undefined) {
    arr = new Array(9);
    for (var i = 0; i < 9; i++) {
      arr[i] = new Array(9);
      for (var j = 0; j < 9; j++) {
        arr[i][j] = 0
      }
    }
  } else
    if (typeof arr === "string") {
      arr = str2Array(arr);
    }
  this.shudu = arr;
  this.b = new Array(81);
  for (var i = 0; i < 81; i++) {
    this.b[i] = new Model();
  }
}
Mode.prototype.cal = function () {
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
        start.push({ x: i, y: j });
      }
    }
  }
  return {data:a2,start};
}