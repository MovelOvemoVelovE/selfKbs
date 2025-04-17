<template>
  <div>
    <el-tree-select
      ref="treeSelectRef"
      filterable
      multiple
      placeholder="请选择部门组织"
      highlight-current
      show-checkbox
      clearable
      :data="dataSource"
      :node-key="'deptId'"
      :filter-node-method="filterNodeMethod"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
    />
  </div>
</template>

<script setup>
import { elTreeSelect } from "element-plus";
import { nextTick, ref, useTemplateRef } from "vue";

const expandedKeys = ref([]);
const treeSelectRef = useTemplateRef("treeSelectRef");
const dataSource = ref(
  [
    {
      deptId: 1,
      deptName: "卡卡集团",
      children: [
        {
          deptId: 2,
          deptName: "卡卡集团-研发部",
          children: [
            {
              deptId: 3,
              deptName: "卡卡集团-研发部-前端组",
              children: [
                {
                  deptId: 9,
                  deptName: "卡卡集团-研发部-前端组-海外组",
                },
                  
                  {
                    deptId: 10,
                    deptName: "卡卡集团-研发部-前端组-国内组",
                  },
              ],
            },
            {
              deptId: 4,
              deptName: "卡卡集团-研发部-后端组",
              children: [
                {
                  deptId: 11,
                  deptName: "卡卡集团-研发部-后端组-海外组",
                },
                {
                  deptId: 12,
                  deptName: "卡卡集团-研发部-后端组-国内组",
                },
              ],
            },
          ],
        },
        {
          deptId: 5,
          deptName: "卡卡集团-市场部",
          children: [
            {
              deptId: 6,
              deptName: "卡卡集团-市场部-市场组",
              children: [
                {
                  deptId: 8,
                  deptName: "卡卡集团-市场部-市场组-海外组",
                },
              ],
            },
            {
              deptId: 7,
              deptName: "卡卡集团-市场部-销售组",
            },
          ],
        },
      ],
    },
  ]
)

const filterNodeMethod = (value, data, node) => {
  if (!value) return true;
  if (data.deptName.includes(value)) {
    nextTick(() => {
      // 如果当前节点的所有子节点都是隐藏状态，说明树形结构的筛选已经到头了
      if (
        node.childNodes.length &&
        node.childNodes.every((item) => !item.visible)
      ) {
        // 将当前节点变为折叠态
        treeSelectRef.value.getNode(data.deptId).expanded = false;
        // 设置一个变量，可以让他点击后展开， 否则根节点点击后筛选功能会丢失
        data.isLastFilterNode = true;
      }
    });
    return true;
  }
  return false;
};

//节点展开
const handleNodeExpand = (data, node) => {
  expandedKeys.value.push(data.deptId);
  // 在展开时间中，判断当前节点是否是最后一个筛选节点
  if (data.isLastFilterNode) {
    node.childNodes.forEach((item) => {
      // 设置子节点的显示状态
      item.visible = true;
      // 设置子节点属性为 最后一级筛选节点的下级节点，继续可以展开
      item.data.isLastFilterNode = true;
    });
  }
};

//节点折叠
const handleNodeCollapse = (data, node) => {
  expandedKeys.value = expandedKeys.value.filter(
    (item) => item !== data.deptId
  );
};
</script>

<style></style>