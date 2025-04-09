<template>
  <div class="jbs_calendar" :style="{ ...borderStyle }">
    <CalendarHeader
      :date="currentDate"
      :weekdays="weekdays"
      :readonly="readonly"
      :showHeaderTitle="props.showHeaderTitle"
      @update:date="updateDate"
    >
      <template v-slot:header="scope">
        <slot name="date" v-bind="scope"></slot>
      </template>
      <template v-slot:headerTitle="scope">
        <slot name="date" v-bind="scope"></slot>
      </template>
      <template v-slot:prebutton="scope">
        <slot name="date" v-bind="scope"></slot>
      </template>
      <template v-slot:nextbutton="scope">
        <slot name="date" v-bind="scope"></slot>
      </template>
    </CalendarHeader>
    <CalendarMain
      v-bind="$props"
      v-model="currentDate"
      v-model:dateObj="currentDateObject"
      :needFold="arrow"
      @changeNeedFold="handleChangeNeedFold"
    >
      <template v-slot:date="scope">
        <slot name="date" v-bind="scope"></slot>
      </template>
      <template v-slot:middleTip="scope">
        <slot name="middleTip" v-bind="scope"></slot>
      </template>
      <template v-slot:bottomInfo="scope">
        <slot name="bottomInfo" v-bind="scope"></slot>
      </template>
    </CalendarMain>
    <div class="jbs_calendar_divider">
      <div></div>
      <div
        class="divider_arrow"
        :class="arrow ? 'toggle' : ''"
        @click="handleFold"
      ></div>
      <div></div>
    </div>
    <div class="jbs_calendar_divider_second"></div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMain from "./CalendarMain.vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import updateLocale from "dayjs/plugin/updateLocale";
import localData from "dayjs/plugin/localeData";
dayjs.extend(localData);
dayjs.extend(updateLocale);

const props = defineProps({
  /**
   * 配置部分
   */
  // 语言配置替换
  locale: {
    type: String,
    default: "zh-cn",
  },
  // 周起始日是周日还是周一
  startOfWeek: {
    type: [String, Number],
    default: 1,
  },
  // 仅当为中文时，显示星期几简写
  simpleWeek: {
    type: Boolean,
    default: true,
  },

  /**
   * 样式部分
   */
  // 滑动切换月份方式
  dragMode: {
    type: String,
    default: "horizontal", // [ 'both', 'horizontal', 'vertical']
  },
  // 是否显示日历的边框线
  border: {
    type: Boolean,
    default: false,
  },
  // 日期下方的中间提示层
  middleTip: {
    type: String,
    default: "",
  },
  // 日期下方的文字
  bottomInfo: {
    type: String,
    default: "今天是假日",
  },
  // 可读日历
  readonly: {
    type: Boolean,
    default: false,
  },
  touchFold: {
    type: Boolean,
    default: true,
  },
  showMiddletip: {
    type: Boolean,
    default: true,
  },
  // 日期下方的文字
  showBottomInfo: {
    type: Boolean,
    default: true,
  },
  showHeaderTitle: {
    type: Boolean,
    default: true,
  },

  /**
   * 数据部分
   */
  // 注入到日历中的每一条数据
  injectCalendarData: {
    type: Array,
    default: () => [],
  },
  injectCalendarKey: {
    type: String,
    default: "timestamp",
  },
});

const currentDate = defineModel();
const currentDateObject = defineModel("dateObj");

const weekdays = ref([]);
/**
 * 加载配置
 * @param {String} props.locale 语言配置
 * @param {String} props.startOfWeek 周起始日是周日还是周一
 * @param {Boolean} props.simpleWeek 显示星期几简写
 */
watch(
  () => [props.locale, props.startOfWeek, props.simpleWeek],
  () => {
    try {
      dayjs.locale(props.locale);
      if (props.simpleWeek) {
        dayjs.updateLocale("zh-cn", {
          weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
        });
        dayjs.updateLocale("en", {
          weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        });
      }
      weekdays.value = dayjs
        .localeData()
        [props.simpleWeek ? "weekdaysShort" : "weekdays"](props.startOfWeek);
    } catch (error) {
      throw new Error(error);
    }
  },
  { immediate: true }
);

const borderStyle = computed(() => {
  if (props.border) {
    return {
      border: "1px solid #ddd",
      borderRadius: "8px",
    };
  }
  return {};
});

const updateDate = (newDate) => {
  currentDate.value = newDate;
};

const arrow = ref(false);
const handleFold = () => {
  arrow.value = !arrow.value;
};
const handleChangeNeedFold = (value) => {
  arrow.value = value;
};
</script>

<style scoped>
.jbs_calendar {
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  user-select: none; /* 禁用文字选择 */
  font-size: 12px;
  background-color: #fff;
  color: #000;
}
.jbs_calendar_divider {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.jbs_calendar_divider > div {
  flex: 1;
  height: 1px;
  background-color: #d4d5d7;
}
.jbs_calendar_divider .divider_arrow {
  flex: 0 0 10px;
  margin: 0 5px;
  transform: rotate(45deg);
  transition: all 0.3s ease-in;
  width: 10px;
  height: 10px;
  border-left: 1px solid #d4d5d7;
  border-top: 1px solid #d4d5d7;
  background-color: inherit;
}

.jbs_calendar_divider .divider_arrow:hover {
  cursor: pointer;
}

.jbs_calendar_divider .divider_arrow.toggle {
  transform: rotate(-135deg);
  transition: all 0.3s ease-out;
}

.jbs_calendar_divider_second {
  height: 1px;
  background-color: #d4d5d7;
  margin-top: 5px;
}
</style>
