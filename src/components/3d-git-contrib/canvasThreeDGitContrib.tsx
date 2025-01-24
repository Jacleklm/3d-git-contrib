import { FC, useEffect } from "react";

export interface CanvasThreeDGitContribProps {
  height: number;
  width: number;
}

export const CANVAS_ID = "canvasThreeDGitContrib";

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

const CanvasThreeDGitContrib: FC<CanvasThreeDGitContribProps> = ({
  height,
  width,
}) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, height, width);

    const x = 100;
    const y = 200;
    const z = 65;

    const points = [
      [0, 0],
      [x, 0],
      [x, -y],
      [0, -y],
      [z * Math.cos((45 * Math.PI) / 180), -z * Math.sin((45 * Math.PI) / 180)],
      [
        z * Math.cos((45 * Math.PI) / 180),
        -y - z * Math.sin((45 * Math.PI) / 180),
      ],
      [
        x + z * Math.cos((45 * Math.PI) / 180),
        -z * Math.sin((45 * Math.PI) / 180),
      ],
      [
        x + z * Math.cos((45 * Math.PI) / 180),
        -y - z * Math.sin((45 * Math.PI) / 180),
      ],
    ];
    const faces = [
      [points[4], points[5], points[7], points[6]], //后
      [points[0], points[4], points[6], points[1]], //下
      [points[0], points[3], points[5], points[4]], //左
      [points[1], points[2], points[7], points[6]], //右
      [points[2], points[3], points[5], points[7]], //上
      [points[0], points[3], points[2], points[1]], //前
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
      // ctx.fillStyle = "rgba(255,0,0,0.5)";
      ctx.fillStyle = randC();
      ctx.fill();
    }

    // ctx.fillStyle = "fillStyle";
    // ctx.fillRect(0, 0, 100, 100);
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
