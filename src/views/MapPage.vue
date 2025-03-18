<template>

  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { ref } from "vue";
  import { loaddata } from '@/utils/cesiuminit';
  import { useViewerStore } from '@/stores/cesiumviewer';
  const store = useViewerStore();
  const container = document.getElementById("cesiumContainer");
  let viewer = store.initViewer(container);
  onMounted(() => {
    async () => {
  await nextTick(); // 确保 DOM 更新完成后再执行
  const container = document.getElementById("cesiumContainer");
  if (!container) {
    console.error("`cesiumContainer` 仍然未找到，确保 MapPage.vue 渲染正确");
    return;
  }
  
  console.log("`cesiumContainer` 找到了，初始化 Cesium...");
  viewer = store.initViewer(container); // ✅ 传入正确的容器
  
}
  loaddata();
});
  </script>
  
  <style scoped>
  /* 全局布局 */
.full-height {
  height: 100vh;
  transform: translateY(-0px);
}

/* 侧边栏优化 */
.el-aside {
  width: 150px;
  background: #f8f9fa;
  opacity: 20;
  padding: 10px;
  overflow-y: auto;
  transform: translateY(-820px);
}
/* 侧边栏容器，保证对齐 */
.aside-container {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 侧边栏的每个组件 */
.aside-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 150px; /* 组件最小高度，避免过小 */
}
/* 3D 视图组件 */
.responsive-view {
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
  transform: translateY(-10px);
}
/* 底部栅格图层 */
.el-footer {
  height: 80px;
  background: #ffffff;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
}
/* 响应式优化 */
@media (max-width: 1024px) {
  .el-aside {
    width: 200px;
  }
  .responsive-view {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .el-aside {
    width: 100px;
  }
  .responsive-view {
    height: 200px;
  }
  .el-footer {
    height: 60px;
  }
}
  </style>
  