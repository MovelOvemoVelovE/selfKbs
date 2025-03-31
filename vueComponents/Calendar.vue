<template>
  <div class="jbs_calendar">
    <CalendarHeader :date="currentDate" @update:date="updateDate" />
    <CalendarMain :date="currentDate" @update:date="updateDate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CalendarHeader from './CalendarHeader.vue';
import CalendarMain from './CalendarMain.vue';
import { dayjs } from 'element-plus';

const currentDate = ref(dayjs().format('YYYY-MM-DD'));

const updateDate = (newDate) => {
  currentDate.value = newDate;
};
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
</style>