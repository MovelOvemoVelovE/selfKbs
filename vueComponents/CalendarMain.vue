<template>
  <div
    class="jbs_calendar_main"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
  >
    <div class="weekdays">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>
    <div class="dates">
      <div
        v-for="date in calendarDays"
        :key="date.date"
        :class="['date', { 'not-current-month': !date.isCurrentMonth }]"
      >
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, computed } from 'vue';
import dayjs from 'dayjs';

// 接收父组件传递的当前日期
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

// 向父组件发送事件
const emit = defineEmits(['update:date']);

// 星期标题
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 计算当前月份的日历数据
const calendarDays = computed(() => {
  const startOfMonth = dayjs(props.date).startOf('month');
  const endOfMonth = dayjs(props.date).endOf('month');

  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    days.push({
      date: currentDate.format('YYYY-MM-DD'),
      day: currentDate.date(),
      isCurrentMonth: currentDate.month() === startOfMonth.month(),
    });
    currentDate = currentDate.add(1, 'day');
  }

  return days;
});

// 拖动切换月份
const dragState = reactive({
  startX: 0,
  startY: 0,
  isDragging: false,
});

const startDrag = (event) => {
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
  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) {
      emit('update:date', dayjs(props.date).add(1, 'month').format('YYYY-MM-DD'));
    } else {
      emit('update:date', dayjs(props.date).subtract(1, 'month').format('YYYY-MM-DD'));
    }
    dragState.isDragging = false;
  }

  // 上下滑动切换月份
  if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
    if (deltaY < 0) {
      emit('update:date', dayjs(props.date).add(1, 'month').format('YYYY-MM-DD'));
    } else {
      emit('update:date', dayjs(props.date).subtract(1, 'month').format('YYYY-MM-DD'));
    }
    dragState.isDragging = false;
  }
};

const endDrag = () => {
  dragState.isDragging = false;
};
</script>

<style scoped>
.calendar-body {
  display: flex;
  flex-direction: column;
  user-select: none;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.date {
  padding: 10px;
  border: 1px solid #ddd;
}

.not-current-month {
  color: #ccc;
}
</style>