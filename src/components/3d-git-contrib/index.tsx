import { FC } from "react";
import CanvasThreeDGitContrib, { CANVAS_ID } from "./canvasThreeDGitContrib";
import SvgThreeDGitContrib from "./svgThreeDGitContrib";

export interface ThreeDGitContribProps {
  renderer?: "svg" | "canvas";
  height?: number;
  width?: number;
}

const ThreeDGitContrib: FC<ThreeDGitContribProps> = ({
  renderer = "canvas",
  height = 720,
  width = 1280,
}) => {
  // 获取数据

  // 渲染
  return renderer === "canvas" ? (
    <CanvasThreeDGitContrib height={height} width={width} />
  ) : (
    <SvgThreeDGitContrib />
  );
};

export default ThreeDGitContrib;
