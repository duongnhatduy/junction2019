import { seriesData } from "./mock/seriesData";

export const getOverview = async ({ groupBy }) => {
  return {
    balance: 0,
    goal: 2000
  };
};
export const getSeries = async ({ groupBy }) => {
  switch (groupBy) {
    case "3month":
      return seriesData.filter(
        ({ month }) => getQuarter(month) === getQuarter(new Date())
      );
    case "1year":
      return seriesData;
    default:
      const currentMonth = new Date().getMonth();
      return seriesData.filter(({ month }) => currentMonth === month);
  }
};

function getQuarter(d) {
  d = d || new Date();
  var m = Math.floor(d.getMonth() / 3) + 2;
  return m > 4 ? m - 4 : m;
}
