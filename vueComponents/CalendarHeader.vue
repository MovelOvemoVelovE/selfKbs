<template>
  <div class="jbs_calendar_main">
    <el-button-group>
      <el-button icon="el-icon-arrow-left" @click="prevMonth"></el-button>
      <span class="current-month">{{ currentMonth }}</span>
      <el-button icon="el-icon-arrow-right" @click="nextMonth"></el-button>
    </el-button-group>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
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

// 当前月份
const currentMonth = computed(() => dayjs(props.date).format('YYYY年MM月'));

// 切换到上一个月
const prevMonth = () => {
  const newDate = dayjs(props.date).subtract(1, 'month').format('YYYY-MM-DD');
  emit('update:date', newDate);
};

// 切换到下一个月
const nextMonth = () => {
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
  margin-bottom: 10px;
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
</style>