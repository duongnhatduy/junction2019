import { seriesData } from './mock/seriesData';
import { oneMonthOverviewData, threeMonthOverviewData, oneYearOverviewData } from './mock/overviewData';

export const getOverview = async ({ groupBy }) => {
  switch (groupBy) {
    case '1month':
      return oneMonthOverviewData;
    case '3month':
      return threeMonthOverviewData;
    case '1year':
      return oneYearOverviewData;

    default:
      return oneMonthOverviewData;
  }
};
export const getSeries = async ({ groupBy }) => {
  switch (groupBy) {
    case '3month':
      return seriesData.filter(({ month }) => getQuarter(month) === getQuarter(new Date()));
    case '1year':
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
