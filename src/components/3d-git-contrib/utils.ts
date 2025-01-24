var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  x = 100,
  y = 100,
  z = 100;
var points = [
  [0, 0],
  [x, 0],
  [x, -y],
  [0, -y],
  [z * Math.cos((45 * Math.PI) / 180), -z * Math.sin((45 * Math.PI) / 180)],
  [z * Math.cos((45 * Math.PI) / 180), -y - z * Math.sin((45 * Math.PI) / 180)],
  [x + z * Math.cos((45 * Math.PI) / 180), -z * Math.sin((45 * Math.PI) / 180)],
  [
    x + z * Math.cos((45 * Math.PI) / 180),
    -y - z * Math.sin((45 * Math.PI) / 180),
  ],
];
var faces = [
  [points[4], points[5], points[7], points[6]], //后
  [points[0], points[4], points[6], points[1]], //下
  [points[0], points[3], points[5], points[4]], //左
  [points[1], points[2], points[7], points[6]], //右
  [points[2], points[3], points[5], points[7]], //上
  [points[0], points[3], points[2], points[1]], //前
];
draw(0, 300);
draw(300, 300, true);
function draw(x, y, fill) {
  ctx.save();
  ctx.translate(x, y);
  for (var i = 0, len = faces.length; i < len; i++) {
    var p = faces[i];
    ctx.beginPath();
    for (var j = 0, l = p.length; j < l; j++) {
      if (j == 0) {
        ctx.moveTo(p[j][0], p[j][1]);
      } else {
        ctx.lineTo(p[j][0], p[j][1]);
      }
    }
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = randC();
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  ctx.restore();
}
function randC() {
  return (
    "rgb(" +
    ~~(Math.random() * 255) +
    "," +
    ~~(Math.random() * 255) +
    "," +
    ~~(Math.random() * 255) +
    ")"
  );
}
