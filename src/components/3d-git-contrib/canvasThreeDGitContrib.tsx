import { FC, useEffect } from "react";
import { randC } from "./utils";

export interface CanvasThreeDGitContribProps {
  height: number;
  width: number;
}

export const CANVAS_ID = "canvasThreeDGitContrib";
const ANGLE = 30;
const PANEL_WIDTH = 100;
const CanvasThreeDGitContrib: FC<CanvasThreeDGitContribProps> = ({
  height,
  width,
}) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, height, width);

    const panelHeight = 200;

    // 以底面中心点为原点，算出的坐标
    const points = [
      // 底面；上点开始；顺时针
      [0, -PANEL_WIDTH * Math.sin((ANGLE * Math.PI) / 180)],
      [PANEL_WIDTH * Math.cos((ANGLE * Math.PI) / 180), 0],
      [0, PANEL_WIDTH * Math.sin((ANGLE * Math.PI) / 180)],
      [-PANEL_WIDTH * Math.cos((ANGLE * Math.PI) / 180), 0],
      // 顶面；上点开始；顺时针
      [0, -panelHeight -PANEL_WIDTH * Math.sin((ANGLE * Math.PI) / 180)],
      [PANEL_WIDTH * Math.cos((ANGLE * Math.PI) / 180), -panelHeight],
      [0, -panelHeight + PANEL_WIDTH * Math.sin((ANGLE * Math.PI) / 180)],
      [-PANEL_WIDTH * Math.cos((ANGLE * Math.PI) / 180), -panelHeight],
    ];
    // 只需要画三个面；立方体的另外三个面被挡住了
    const faces = [
      [points[4], points[5],points[6],points[7]], // 顶
      [points[7], points[6], points[2], points[3]], // 左
      [points[1], points[2], points[6], points[5]], // 右
    ];

    ctx.translate(300, 300);
    for (let i = 0, len = faces.length; i < len; i++) {
      const p = faces[i];
      ctx.beginPath();
      for (let j = 0, l = p.length; j < l; j++) {
        if (j == 0) {
          ctx.moveTo(p[j][0], p[j][1]);
        } else {
          ctx.lineTo(p[j][0], p[j][1]);
        }
      }
      ctx.closePath();
      ctx.fillStyle = randC();
      ctx.fill();
    }
  };

  useEffect(() => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      draw(ctx);
    }
  }, [height, width]);

  return <canvas id={CANVAS_ID}>浏览器不支持canvas</canvas>;
};

export default CanvasThreeDGitContrib;
