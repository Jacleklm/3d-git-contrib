import dayjs from "dayjs";
import { ActivityData } from "./interface";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

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

export const FORMAT_STR = "YYYY-MM-DD";
export const getMockData = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const start = dayjs("2024-01-01");
  const end = dayjs("2025-01-01");

  for (let d = start.clone(); d.isBefore(end); d = d.add(1, "day")) {
    data.push({
      date: d.format(FORMAT_STR),
      count: Math.floor(Math.random() * 50),
      // count: 2,
      level: Math.floor(Math.random() * 6),
    });
  }
  return data;
};

// 获取当前 date 是第几周
export const getWeekIdx = (date: string) => {
  const d = dayjs(date);
  if (d.weekYear() === d.get("year")) {
    return d.week() - 1;
  }
  // 在年底的最后一周，dayjs会认为这一周属于下一年，其 week() 返回 1
  return d.add(-7, "day").week() + 1 - 1;
};

export const changeSeq = (arr: ActivityData[]) => {
  arr.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1: -1)

  // 周内的数据，按星期几反转
  // 不同周的数据，正序
  const res: ActivityData[] = []
  let weekIdx = 0
  let weekData: ActivityData[] = []
  for (const item of arr ) {
    if (weekIdx !== getWeekIdx(item.date)) {
      res.push(...weekData)
      weekIdx += 1
      weekData = []
    }
    weekData.unshift(item)
  }
  res.push(...weekData)
  return res;
};
