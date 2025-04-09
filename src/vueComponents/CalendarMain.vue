<template>
  <div
    class="jbs_calendar_main"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    :style="{ ...borderStyle }"
  >
    <div
      class="jbs_calendar_dates"
      :class="{
        jbs_calendar_dates_fold: props.needFold,
      }"
    >
      <div
        v-for="date in props.needFold ? foldedCalendarDays : calendarDays"
        :key="date.date"
        :class="[
          'jbs_calendar_date',
          {
            not_current_month: !date.isCurrentMonth,
            cur_date: date.isCurrentDate,
            choose_date: date.isChooseDate,
          },
        ]"
        :style="{ ...borderStyle }"
        @click="handleDateClick(date)"
      >
        <slot name="date">
          <div class="jbs_calendar_day">{{ date.day }}</div>
        </slot>
        <slot name="middleTip" v-if="showMiddletip">
          <div class="jbs_calendar_middletip">
            <div class="dot_tip"></div>
          </div>
        </slot>
        <slot name="bottomInfo" :sourceData="date" v-if="showBottomInfo">
          <div class="jbs_calendar_bottominfo">{{ "默认文字" }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// core
import { defineProps, defineEmits, reactive, computed, ref, toRaw } from "vue";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs插件
dayjs.extend(isSameOrBefore);
// 能否被解析
dayjs.extend(customParseFormat);
// props
const props = defineProps({
  dragMode: String,
  border: Boolean,
  needFold: Boolean,
  readonly: Boolean,
  showMiddletip: Boolean,
  showBottomInfo: Boolean,
  touchFold: Boolean,
  injectCalendarData: Array,
  injectCalendarKey: String,
});
// emits
const $emits = defineEmits(["changeNeedFold"]);

// 使用v-model双向绑定
const dateModel = defineModel();
const dateObj = defineModel("dateObj");

// 计算当前月份的日历数据
const calendarDays = computed(() => {
  const startOfMonth = dayjs(dateModel.value).startOf("month");
  const endOfMonth = dayjs(dateModel.value).endOf("month");

  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  let days = [];
  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate)) {
    days.push({
      sourceObj: currentDate,
      date: currentDate.format("YYYY-MM-DD"),
      day: currentDate.date(),
      isCurrentDate: currentDate.isSame(dayjs(), "day"),
      isCurrentMonth: currentDate.month() === startOfMonth.month(),
      isChooseDate: currentDate.isSame(dayjs(dateModel.value), "day"),
    });
    currentDate = currentDate.add(1, "day");
  }

  // 注入数据 要求必须有时间戳
  if (props.injectCalendarData) {
    days = days.map((dayItem) => {
      const injectItem = props.injectCalendarData.find((item) => {
        return dayjs(item[props.injectCalendarKey]).isSame(
          dayjs(dayItem.date),
          "day"
        );
      });
      if (injectItem) {
        return {
          ...dayItem,
          injectData: toRaw(injectItem),
        };
      } else {
        return dayItem;
      }
    });
  }

  return days;
});

const foldedCalendarDays = computed(() => {
  if (!props.needFold) return calendarDays.value;

  const selectedDate = dayjs(dateModel.value);
  const startOfWeek = selectedDate.startOf("week");
  const endOfWeek = selectedDate.endOf("week");

  let days = [];
  let currentDate = startOfWeek;

  while (currentDate.isSameOrBefore(endOfWeek)) {
    days.push({
      sourceObj: currentDate,
      date: currentDate.format("YYYY-MM-DD"),
      day: currentDate.date(),
      isCurrentDate: currentDate.isSame(dayjs(), "day"),
      isCurrentMonth: currentDate.month() === selectedDate.month(),
      isChooseDate: currentDate.isSame(dayjs(dateModel.value), "day"),
    });
    currentDate = currentDate.add(1, "day");
  }

  // 注入数据 要求必须有时间戳
  if (props.injectCalendarData) {
    days = days.map((dayItem) => {
      const injectItem = props.injectCalendarData.find((item) => {
        return dayjs(item[props.injectCalendarKey]).isSame(
          dayjs(dayItem.date),
          "day"
        );
      });
      if (injectItem) {
        return {
          ...dayItem,
          injectData: toRaw(injectItem),
        };
      } else {
        return dayItem;
      }
    });
  }

  return days;
});

// 日历样式控制
const borderStyle = computed(() => {
  if (props.border) {
    return {
      border: "1px solid #ddd",
    };
  }
  return {};
});

// 拖动切换月份
const dragState = reactive({
  startX: 0,
  startY: 0,
  isDragging: false,
});

const startDrag = (event) => {
  if (props.readonly) return;
  dragState.startX = event.touches ? event.touches[0].clientX : event.clientX;
  dragState.startY = event.touches ? event.touches[0].clientY : event.clientY;
  dragState.isDragging = true;
};

const onDrag = (event) => {
  if (!dragState.isDragging) return;

  const currentX = event.touches ? event.touches[0].clientX : event.clientX;
  const currentY = event.touches ? event.touches[0].clientY : event.clientY;

  const deltaX = currentX - dragState.startX;
  const deltaY = currentY - dragState.startY;

  // 左右滑动切换月份
  if (["both", "horizontal"].includes(props.dragMode)) {
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        dateModel.value = dayjs(dateModel.value)
          .add(1, "month")
          .format("YYYY-MM-DD");
      } else {
        dateModel.value = dayjs(dateModel.value)
          .subtract(1, "month")
          .format("YYYY-MM-DD");
      }
      dragState.isDragging = false;
    }
  }

  // 上下滑动切换月份
  if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
    if (["both", "vertical"].includes(props.dragMode)) {
      if (deltaY < 0) {
        dateModel.value = dayjs(dateModel.value)
          .add(1, "month")
          .format("YYYY-MM-DD");
      } else {
        dateModel.value = dayjs(dateModel.value)
          .subtract(1, "month")
          .format("YYYY-MM-DD");
      }
    }
    if (props.touchFold) {
      $emits("changeNeedFold", deltaY < 0);
    }
    dragState.isDragging = false;
  }
};

const endDrag = () => {
  dragState.isDragging = false;
};

const handleDateClick = (dateSource) => {
  if (props.readonly) return;
  dateModel.value = dateSource.date;
  dateObj.value = dateSource;
};
</script>

<style scoped>
.calendar-body {
  display: flex;
  flex-direction: column;
  user-select: none;
}

.jbs_calendar_dates.jbs_calendar_dates_fold {
  height: 70px;
  transition: all 0.3s ease-out;
}

.jbs_calendar_dates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 420px;
  transition: all 0.3s ease-out;
}
.jbs_calendar_dates:hover {
  cursor: pointer;
}

.jbs_calendar_date {
  flex: 0 0 calc(100% / 7);
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.jbs_calendar_day {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.choose_date .jbs_calendar_day {
  color: #d7efff;
  background-color: #0066ff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jbs_calendar_dates .jbs_calendar_middletip .dot_tip {
  width: 5px;
  height: 5px;
  background-color: blue;
  border-radius: 100%;
  margin-top: 2px;
}

.jbs_calendar_dates .jbs_calendar_bottominfo {
  margin-top: 2px;
}

.date {
  padding: 10px;
  color: #1a3252;
}
.not_current_month {
  color: #dbdad9;
}
.cur_date {
  color: #37a5ff;
}
</style>
