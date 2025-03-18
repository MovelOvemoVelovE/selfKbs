这里包含了全局方法或实用方法， 以便重复造轮子<Badge type="danger" text="0.0.1" />

## $dialog-弹窗

`js`**编程式**调用

::: code-group

```vue{5} [home.vue]
<script setup>
import { getCurrentInstance } from 'vue'

const _this = getCurrentInstance()
const { $dialog } = _this.appContext.config.globalProperties
$dialog({
  title: '考勤核对通知',
  content: `
    ${tableSelection.value.length}名员工(其中${3}名员工没有审批中或异常的考勤数据)，将向${4}名员工发送考勤核对提醒，确认发送
  `,
  onConfirm: (close) => {
    alert('发送考勤核对通知')
    close()
  }
})
</script>
```

```js [dialogPlugin.js]
import { createApp, h, ref } from "vue"
import { DialogPayload } from "@/constant"
import { ElDialog, ElButton } from "element-plus"

const dialogPlugin = {
  install(app) {
    app.config.globalProperties.$dialog = options => {
      return new Promise((resolve, reject) => {
        // 设置默认值
        options = {
          ...options,
          showConfirmBtn: typeof options.ShowConfirmBtn === 'boolean' ? options.ShowConfirmBtn : true,
          showCancelBtn: typeof options.showCancelBtn === 'boolean' ? options.showCancelBtn : true,
          onConfirm: options.onConfirm || function() {},
          onClose: options.onClose || function() {},
          confirmText: options.confirmText || '确定',
          cancelText: options.cancelText || '取消',
          confirmType: options.confirmType || 'primary',
          cancelType: options.cancelType || '',
          footerClass: options.footerClass || '',
          showFooter: typeof options.showFooter === 'boolean' ? options.showFooter : true,
        }
        const dialogCom = createApp({
          setup() {
            const visible = ref(true);
  
            const close = () => {
              visible.value = false;
              dialogCom.unmount();
              document.body.removeChild(container);
              options.onClose();
            };
  
            return () => h(ElDialog, {
              ...DialogPayload,
              ...options,
              modelValue: visible.value,
              onClose: close,
            },
            {
              default: () => options.content,
              footer: options.showFooter ? () => h('div', 
                { class: ['dialog-footer', options.footerClass ] },
                [
                  options.showCancelBtn && h(ElButton, { onClick: close, type: options.cancelType }, options.cancelText ),
                  options.showConfirmBtn && h(ElButton, { onClick: () => options.onConfirm(close), type: options.confirmType }, options.confirmText ),
                ]
              ) : null,
            });
          }
        })
        const container = document.createElement("div")
        document.body.appendChild(container)
        dialogCom.mount(container)
        // 调用确定或者是取消后的回调 位置目前不对
        resolve(options)
      })
    }
  },
}

export default dialogPlugin
```

```js [main.js]
import dialogPlugin from '../..../dialogPlugin'
createApp(App).use(dialogPlugin)
```

:::

::: tip

常用于简单的提示，无需增加`template`代码

:::

## usePage-页码

配合`Table`组件使用，自动计算页码，并返回页码和每页条数

::: code-group

```vue [home.vue]
<template>
  <Table
    :page="page"
    :isShowPage="true"
    @updatePageNumber="updatePageNumber"
    @updatePageSize="updatePageSize"
  />
</template>

<script setup>
  import usePage from '@/hooks/usePage'
  let { page, resetPage, setPageNumber, setPageTotal, setPageSize } = usePage()

  //分页-更新页码
  const updatePageNumber = pageNumber => {
    setPageNumber(pageNumber)
  }

  //分页-更新每页数量
  const updatePageSize = pageSize => {
    setPageSize(pageSize)
  }
</script>
```

```js [usePage.js]
import { reactive } from 'vue'
import { DefaultPageList } from '@/constant/index.js'
const usePage = (params = {}) => {
  let { pageSize, pageList: newPageList } = params
  let pageList = newPageList || DefaultPageList
  let page = reactive({
    pageSize: pageSize || pageList[0],
    pageNum: 1,
    total: 0,
  })

  const resetPage = () => {
    page.pageNum = 1
    page.total = 0
  }

  const setPageNumber = num => {
    page.pageNum = num
  }

  const setPageSize = num => {
    resetPage()
    page.pageSize = num
  }

  const setPageTotal = total => {
    page.total = total
  }
  const initPageSize = val => {
    return (page.pageSize = val)
  }

  return {
    page,
    pageList,
    initPageSize,
    resetPage,
    setPageNumber,
    setPageSize,
    setPageTotal,
  }
}

export default usePage

```

:::

## useDict-字典

1. 通过`useDict.js`获取存储在`pinia`中的字典对象`dict`。
2. 通过`utils`下的`createDict`获取一个`object: { option: Array, getDesc: () => string }`的对象

::: code-group

```vue [home.vue]
<script setup>
  import createDict from '@/utils/createDict'
  import dict from '@/hooks/useDict'
  const xxxEnum = createDict(dict.xxxDictkey)
  console.log(xxxEnum.option)
</script>
```

```js [hooks/useDict.js]
import { useCommonStore } from '@/store/common.js'
const commonStore = useCommonStore()
const dict = commonStore.dict

export default dict
```

```js [utils/createDict.js]
export default function createDict(payload) {
  if (!payload || !payload.length) return
  const dictMap = new Map()
  const dictKey = {}
  payload.forEach(item => {
    if (item.name && item.desc) {
      dictMap.set(item.name, item.desc)
      dictKey[item.name] = item.name
    }
  })
  return {
    options: payload,
    ...dictKey,
    getDesc(enumName) {
      return dictMap.get(enumName) || ''
    },
  }
}
```

:::

## 