import { FC } from "react";
import CanvasThreeDGitContrib, { CANVAS_ID } from "./canvasThreeDGitContrib";
import SvgThreeDGitContrib from "./svgThreeDGitContrib";
import { getMockData } from "./utils";

export interface ThreeDGitContribProps {
  renderer?: "svg" | "canvas";
  height?: number;
  width?: number;
  isAnimate?: boolean;
}

const ThreeDGitContrib: FC<ThreeDGitContribProps> = ({
  renderer = "canvas",
  height = 1000,
  width = 1280,
  isAnimate
}) => {
  // 获取数据

  // 渲染
  return (
    <div style={{
      border: "1px solid #ccc",
    }}>
      {renderer === "canvas" ? (
        <CanvasThreeDGitContrib
          height={height}
          width={width}
          activityData={getMockData()}
          isAnimate={isAnimate}
        />
      ) : (
        <SvgThreeDGitContrib />
      )}
    </div>
  );
};

export default ThreeDGitContrib;
