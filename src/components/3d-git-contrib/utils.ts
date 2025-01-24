// 随机颜色
export function randC() {
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