一些逻辑、算法的utils

## 计算月的首尾周信息

计算本月**首天和尾天**所在周的起始日期信息。

**引入moment.js**

::: tip

结果展示: 

```js
const results = [
  {startOfWeek: '2025-02-24', endOfWeek: '2025-03-02'},
  // ...xxx
  {startOfWeek: '2025-03-31', endOfWeek: '2025-04-06'},
]
```

:::

```js
import moment from 'moment'

function getWeekRange(date) {
    // 周一开始
    const startOfWeek = moment(date).startOf('week').add(1, 'd');
    const endOfWeek = moment(date).endOf('week').add(1, 'd');
    return { startOfWeek, endOfWeek };
}
const renderTabWeek = (date) => {
  // 本月第一天和最后一天
  const firstDayOfMonth = date.startOf('month');
  const lastDayOfMonth = date.endOf('month');
  // 本月的第一天
  let date = firstDayOfMonth;
  // 输入的分组周结果
  const weeks = [];
  // 当数据为最后一天中止
  while (date.isSameOrBefore(lastDayOfMonth)) {
      const { startOfWeek, endOfWeek } = getWeekRange(date);
      weeks.push({ startOfWeek: startOfWeek.format('yyyy-MM-DD'), endOfWeek: endOfWeek.format('yyyy-MM-DD') });
      // 加一周的时间
      date = moment(endOfWeek).add(1, 'day');
  }
  return weeks
}

// 调用 获取当前月的首尾周信息
renderTabWeek(moment())
```