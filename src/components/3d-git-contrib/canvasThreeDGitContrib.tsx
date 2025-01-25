import { FC, useEffect } from "react";
import { changeSeq, getWeekIdx } from "./utils";
import { ActivityData } from "./interface";
import dayjs from "dayjs";

export interface CanvasThreeDGitContribProps {
  height: number;
  width: number;
  activityData: ActivityData[];
  isAnimate?: boolean;
}

const colors = ["rgb(140,197,105)", "rgb(117,165,88)", "rgb(98,138,74)"];

export const CANVAS_ID = "xVn2iOew6F2Ngf82M0fnSa";

const ANGLE = 30;
const BASE_HEIGHT = 5;

const CanvasThreeDGitContrib: FC<CanvasThreeDGitContribProps> = ({
  height,
  width,
  activityData: _activityData,
  isAnimate
}) => {
  const panelWidth = width / 60;
  const gapWidth = panelWidth / 7;
  const panelHeight = panelWidth * 3;

  const activityData = changeSeq(_activityData);

  const draw = (ctx: CanvasRenderingContext2D, prevPanelHeight: number) => {
    ctx.save(); // 保存没被 translate 的状态
    ctx.clearRect(0, 0, height, width);
    ctx.translate(30, 250);

    for (const data of activityData) {
      ctx.save();

      // const currPanelHeight = prevPanelHeight + 1;
      const currPanelHeight = data.count * 3 + BASE_HEIGHT;
      // 以底面中心点为原点，算出的坐标
      const points = [
        // 底面；上点开始；顺时针
        [0, -panelWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [panelWidth * Math.cos((ANGLE * Math.PI) / 180), 0],
        [0, panelWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [-panelWidth * Math.cos((ANGLE * Math.PI) / 180), 0],
        // 顶面；上点开始；顺时针
        [0, -currPanelHeight - panelWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [panelWidth * Math.cos((ANGLE * Math.PI) / 180), -currPanelHeight],
        [0, -currPanelHeight + panelWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [-panelWidth * Math.cos((ANGLE * Math.PI) / 180), -currPanelHeight],
      ];
      // 只需要画三个面；立方体的另外三个面被挡住了
      const faces = [
        [points[4], points[5], points[6], points[7]], // 顶
        [points[7], points[6], points[2], points[3]], // 左
        [points[1], points[2], points[6], points[5]], // 右
      ];

      const dayOfWeek = dayjs(data.date).get("day"); // sunday is 0, monday is 1 ...
      const row = dayOfWeek * (panelWidth + gapWidth);
      const col = getWeekIdx(data.date) * (panelWidth + gapWidth);

      const baseX =
        row * Math.cos((ANGLE * Math.PI) / 180) +
        col * Math.cos((ANGLE * Math.PI) / 180);
      const baseY =
        -row * Math.sin((ANGLE * Math.PI) / 180) +
        col * Math.sin((ANGLE * Math.PI) / 180);
      ctx.translate(baseX, baseY);

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
        ctx.fillStyle = colors[i];
        ctx.fill();
      }

      ctx.restore();
    }

    ctx.restore(); // 回退到没被 translate 的状态，开始下次循环
    // if (currPanelHeight < mexPanelHeight) {
    //   setTimeout(() => {
    //     draw(ctx, currPanelHeight);
    //   }, 10);
    // }
  };

  useEffect(() => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      draw(ctx, 0);
    }
  }, [height, width]);

  return (
    <canvas id={CANVAS_ID}>
      the brower is not support canvas, use svg renderer please
    </canvas>
  );
};

export default CanvasThreeDGitContrib;
