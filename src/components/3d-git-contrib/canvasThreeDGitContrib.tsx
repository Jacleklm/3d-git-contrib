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
const BASE_HEIGHT = 3;

const CanvasThreeDGitContrib: FC<CanvasThreeDGitContribProps> = ({
  height,
  width,
  activityData: _activityData,
  isAnimate,
}) => {
  const cubieWidth = width / 60;
  const gapWidth = cubieWidth / 7;

  const activityData = changeSeq(_activityData);

  const draw = (
    ctx: CanvasRenderingContext2D,
    prevPanelHeightMap: Map<string, number>
  ) => {
    ctx.save(); // 保存没被 translate 的状态
    ctx.clearRect(0, 0, height, width);
    ctx.translate(30, 250);

    let isAnimateEnd = true;

    for (const data of activityData) {
      ctx.save();

      const targetCubielHeight = data.count * 3 + BASE_HEIGHT;
      const currCubielHeight = isAnimate
        ? // ? (prevPanelHeightMap.get(data.date) || 0) + 1 // 所有柱子等速增长，不好看
          (prevPanelHeightMap.get(data.date) || BASE_HEIGHT) +
          targetCubielHeight / 150
        : targetCubielHeight;

      if (isAnimate && currCubielHeight < targetCubielHeight) {
        isAnimateEnd = false;
        prevPanelHeightMap.set(data.date, currCubielHeight);
      }

      // 以底面中心点为原点，算出的坐标
      const points = [
        // 底面；上点开始；顺时针
        [0, -cubieWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [cubieWidth * Math.cos((ANGLE * Math.PI) / 180), 0],
        [0, cubieWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [-cubieWidth * Math.cos((ANGLE * Math.PI) / 180), 0],
        // 顶面；上点开始；顺时针
        [0, -currCubielHeight - cubieWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [cubieWidth * Math.cos((ANGLE * Math.PI) / 180), -currCubielHeight],
        [0, -currCubielHeight + cubieWidth * Math.sin((ANGLE * Math.PI) / 180)],
        [-cubieWidth * Math.cos((ANGLE * Math.PI) / 180), -currCubielHeight],
      ];
      // 只需要画三个面；立方体的另外三个面被挡住了
      const faces = [
        [points[4], points[5], points[6], points[7]], // 顶
        [points[7], points[6], points[2], points[3]], // 左
        [points[1], points[2], points[6], points[5]], // 右
      ];

      const dayOfWeek = dayjs(data.date).get("day"); // sunday is 0, monday is 1 ...
      const row = dayOfWeek * (cubieWidth + gapWidth);
      const col = getWeekIdx(data.date) * (cubieWidth + gapWidth);

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
    if (isAnimate && !isAnimateEnd) {
      setTimeout(() => {
        draw(ctx, prevPanelHeightMap);
      }, 25);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      canvas.height = height;
      canvas.width = width;
      draw(ctx, new Map());
    }
  }, [height, width]);

  return (
    <canvas id={CANVAS_ID}>
      the brower is not support canvas, use svg renderer please
    </canvas>
  );
};

export default CanvasThreeDGitContrib;
