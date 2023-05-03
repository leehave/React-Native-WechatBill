/**
 * App util filters
 * @file 过滤器扩展
 * @module app/utils/filters
 */

// 时间转换
export const dateToYMD = (dateString) => {
  if (!dateString) {
    return dateString
  }
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  return `${year}/${month}/${day} ${hour > 11 ? 'pm' : 'am'}`
}

// 文本限制
export const stringLimit = (description, limit = 80) => {
  return description.length < limit ? description : `${description.slice(0, limit)}...`
}

// 金额转换
export const getPercent = (e, t) => {
  return Number((100 * e) / t).toFixed(2);
}
export const FixedTwoBit = function (num) {
  let res = Math.floor(num * 100) / 100;
  if ((res + '').indexOf('.') === -1) {
    res = res + '.0';
  }
  return res;
};
export const moneyFormat = function (money) {
  if (money < 1000000) {
    return Number(money / 100).toFixed(2);
  } else {
    return FixedTwoBit(money / 1000000) + '万';
  }
};
export const getProgress = function (percent, maxPercent) {
  return Number((percent * 100) / maxPercent).toFixed(2);
};
export function dealList(list, type, width, scrollViewPadding = 48) {
  if (!list || (list && list.length === 0)) {
    return [];
  }

  let maxAmount = Math.max.apply(
    Math,
    list.map(function (item) {
      return item.amount;
    }),
  );

  return list
    .map(function (item, index) {
      const barWidth = 0 === maxAmount ? 0 : (302 * item.amount) / maxAmount;
      const amount = (item.amount / 100).toFixed(2);

      if (!item.year_desc) {
        item.year_desc = '';
      }

      if (item.week_desc) {
        item.day_desc = item.day_desc ? item.day_desc : '' + item.day;
        item.id = 'day' + item.year + item.month + item.day;
      } else {
        item.month_desc = '' + item.month + '月';
        item.id = 'month' + item.year + item.month;
      }

      if (index < list.length - 1) {
        if (item.week_desc) {
          if (item.month !== list[index + 1].month) {
            item.day_desc = '' + item.month + '.' + item.day;
            item.isGap = true;
            list[index + 1].day_desc =
              '' + list[index + 1].month + '.' + list[index + 1].day;
            if (item.year !== list[index + 1].year) {
              item.year_desc = item.year;
              list[index + 1].year_desc = list[index + 1].year;
            }
          }
        } else {
          item.month_desc = '' + item.month + '月';
          if (item.year !== list[index + 1].year) {
            item.isGap = true;
            item.year_desc = item.year;
            list[index + 1].year_desc = list[index + 1].year;
          }
        }
      }
      const len = list.length;
      let itemWidth = 0;
      if (len <= 10) {
        itemWidth = 100 / len + 2 * scrollViewPadding / len
      } else {
        itemWidth = 100 / len + scrollViewPadding / len
      }
      item.barItemContainerWidth = itemWidth;
      item.height = barWidth < 4 ? 4 : barWidth;
      item.amount = amount;
      item.barColor = 'incomes' === type ? '#F0B73A' : '#3EB575';
      item.barWidth = width;
      if (item.week_desc && item.week_desc.length > 2) {
        item.week_desc = item.week_desc[2];
      }
      return item;
    })
    .reverse();
}
export function getLastIdOfArray(t) {
  return t instanceof Array && t.length > 0 ? t[t.length - 1].id : "";
}