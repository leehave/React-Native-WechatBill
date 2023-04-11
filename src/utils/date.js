/**
 * App util date
 * @file 日期util
 * @module app/utils/date
 */
const daysInLeapYearMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInNormalYearMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 获取当前日期的字符串，例如 20221231
function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  return `${year}${month}${day}`;
}

// 获取某个月份在某一年中的天数
function getDaysInMonth(month, year) {
  return (year % 4 === 0) ? daysInLeapYearMonth[month] : daysInNormalYearMonth[month];
}

// 获取某个月份在某一年中的第一天是星期几
function getDayOfWeekInMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

// 为某个月份的月历添加数据
function appendDaysOfMonth(month, year, calendar) {
  const dayOfWeek = getDayOfWeekInMonth(month, year);
  const daysInMonth = getDaysInMonth(month, year);

  const monthObject = {
    year: year,
    month: month + 1,
    days: []
  };

  if (dayOfWeek === 6) {
    monthObject.days = Array(6).fill({ value: "" });
  } else if (dayOfWeek > 0) {
    monthObject.days = Array(dayOfWeek).fill({ value: "" });
  }

  for (let i = 0; i < daysInMonth; i++) {
    const dateString = [year, month + 1 >= 10 ? month + 1 : '0' + (month + 1), i + 1 >= 10 ? i + 1 : '0' + (i + 1)].join('');
    const dayObject = {
      value: i + 1,
      string: dateString,
      future: getCurrentDateString() <= dateString
    };
    monthObject.days.push(dayObject);
  }

  calendar.push(monthObject);
}

// 为某个月份的周日历添加数据
function appendWeeksOfMonth(month, year, calendar) {
  const dayOfWeek = getDayOfWeekInMonth(month, year);
  const daysInMonth = getDaysInMonth(month, year);

  const monthObject = {
    year: year,
    month: month + 1,
    week: []
  };

  for (let i = 0; i < 5; i++) { // 最多只可能有五周
    let startMonth = month + 1;
    let startDay = null;
    if (dayOfWeek === 2) { // 如果该月的第一天是星期二
      startDay = 7 + 7 * i;
    } else { // 否则
      startDay = (9 - dayOfWeek) % 7 + 7 * i;
    }
    if (startDay > daysInMonth) { // 已经超出了该月的天数
      break;
    }
    let endMonth = startMonth;
    let endDay = startDay + 6;
    if (endDay > daysInMonth) { // 如果跨月了
      endMonth++;
      endDay -= daysInMonth;
    }
    if (endMonth > 12) { // 如果跨年了
      endMonth -= 12;
    }
    const startDateString = `${year}${startMonth < 10 ? '0' + startMonth : startMonth}${startDay < 10 ? '0' + startDay : startDay}`;
    const endDateString = `${year}${endMonth < 10 ? '0' + endMonth : endMonth}${endDay < 10 ? '0' + endDay : endDay}`;
    monthObject.week.push({
      start: `${startMonth}.${startDay}`,
      end: `${endMonth}.${endDay}`,
      flag: startDateString,
      amount: '',
      future: getCurrentDateString() <= endDateString
    })
  }
  calendar.push(monthObject);
}

function addMonthToYear(month, year, data) {
  const monthFlag = `${year}${month < 9 ? '0' : ''}${month + 1}`;

  // 遍历月历，查找是否有该年份的数据
  const yearInfo = data.find(info => info.year === year);
  if (yearInfo) { // 如果找到该年份的数据，则在原数据中加入该月份
    yearInfo.month.push({
      value: month + 1,
      flag: monthFlag,
      amount: "",
      future: !(new Date().getMonth() + 1 === month + 1 && new Date().getFullYear() === year) && getCurrentDateString() <= `${monthFlag}31`,
    });
  } else { // 如果没有找到该年份的数据，则新建数据并加入月历
    const newYearInfo = {
      year,
      month: [
        {
          value: month + 1,
          flag: monthFlag,
          amount: "",
          future: !(new Date().getMonth() + 1 === month + 1 && new Date().getFullYear() === year) && getCurrentDateString() <= `${monthFlag}31`,
        }
      ]
    };
    data.push(newYearInfo);
  }
}


// // 生成给定日期范围内的月、周、日列表
function generateDateList(startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex, viewType) {
  if (new Date(`${startDateYear}/${startDateMonthIndex}/1`) > new Date(`${endDateYear}/${endDateMonthIndex}/1`)) {
    throw new Error("start Date must less than end Date");
  }

  const startDateYearNumber = parseInt(startDateYear);
  const startDateMonthNumber = parseInt(startDateMonthIndex) - 1;
  const endDateYearNumber = parseInt(endDateYear);
  const endDateMonthNumber = parseInt(endDateMonthIndex) - 1;

  const dateList = [];

  // 遍历月份
  for (let year = startDateYearNumber, month = startDateMonthNumber;
    year < endDateYearNumber || (year === endDateYearNumber && month <= endDateMonthNumber);
    month = month < 11 ? month + 1 : 0, year = month === 0 ? year + 1 : year) {
    if (viewType === 'day') {
      appendDaysOfMonth(month, year, dateList);
    } else if (viewType === 'week') {
      appendWeeksOfMonth(month, year, dateList);
    } else if (viewType === 'month') {
      addMonthToYear(month, year, dateList);
    }
  }

  return dateList;
}
export default {
  getDayList: function (startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex) {
    generateDateList(startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex, "day");
  },
  getWeekList: function (startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex) {
    return generateDateList(startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex, "week");
  },
  getMonthList: function (startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex) {
    return generateDateList(startDateYear, startDateMonthIndex, endDateYear, endDateMonthIndex, "month");
  },
}