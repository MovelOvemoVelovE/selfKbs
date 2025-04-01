<template>
  <div class="jbs_calendar_header">
    <!-- 日历头部 -->
    <slot name="header">
      <div class="jbs_calendar_btn_group">
        <div class="jbs_calendar_prev" @click="prevMonth" @touch="prevMonth">上个月</div>
        <slot name="headerTitle">
          <div class="jbs_calendar_title">{{ currentMonth }}</div>
        </slot>
        <div class="jbs_calendar_next" @click="nextMonth" @touch="nextMonth">下个月</div>
      </div>
    </slot>
    <div class="jbs_calendar_weekdays">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';

// 接收父组件传递的当前日期
const props = defineProps({
  date: String,
  startOfWeek: [String, Number],
  weekdays: Array,
  readonly: Boolean
});
// 向父组件发送事件
const emit = defineEmits(['update:date']);

// 当前月份
const currentMonth = computed(() => dayjs(props.date).format('YYYY年MM月'));

// 切换到上一个月
const prevMonth = () => {
  if(props.readonly)return
  const newDate = dayjs(props.date).subtract(1, 'month').format('YYYY-MM-DD');
  emit('update:date', newDate);
};

// 切换到下一个月
const nextMonth = () => {
  if(props.readonly)return
  const newDate = dayjs(props.date).add(1, 'month').format('YYYY-MM-DD');
  emit('update:date', newDate);
};
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.jbs_calendar_btn_group{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.jbs_calendar_prev{

}
.jbs_calendar_prev:hover,
.jbs_calendar_next:hover {
  cursor: pointer;
}

.jbs_calendar_title{

}

.jbs_calendar_next{

}

button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.current-month {
  font-size: 18px;
  font-weight: bold;
}

.jbs_calendar_weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #919293;
}
</style>