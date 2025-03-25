<template>
    <!-- 按钮操作区 -->
    <el-button-group class="control-buttons">
      <el-button type="primary" @click="loadData">加载三维数据</el-button>
      <el-button type="success" @click="tothreed">三维专题视角</el-button>
      <el-button type="warning" @click="totwod">二维专题视角</el-button>
      <el-button type="danger" @click="resetView">切换底图</el-button>
      <el-button type="danger" @click="resetView">重置视图</el-button>
    </el-button-group>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
import { loaddata } from "@/utils/cesiuminit";
import { useViewerStore } from "@/stores/cesiumviewer";
import * as Cesium from "cesium";
import { threedview } from "../utils/threedview";
import { splitbyheight } from "../utils/spiltbyheight";
import { clearview } from "../utils/clearview";
import { switchmap } from "../utils/switchmap";
// 获取 Cesium Viewer Store
const store = useViewerStore();
let viewer;

onMounted(async () => {
  await nextTick(); // 确保 DOM 更新完成
  const container = document.getElementById("cesiumContainer");
  if (!container) {
    console.error("`cesiumContainer` 未找到，请检查组件渲染！");
    return;
  }

  console.log("`cesiumContainer` 找到，初始化 Cesium...");
  viewer = store.initViewer(container); // 初始化 Cesium Viewer
  const process = 0;
  viewer = loaddata(process);
});

// 加载三维数据
const loadData = () => {
threedview();
};

//三维专题地图
const tothreed = () => {
  splitbyheight();
};



//重置视图
const resetView = () => {
  location.reload();
};
//二维专题地图
const totwod = () => {
switchmap(1);
};
//切换底图
const toswitchmap = ()=>{
switchmap(0);
}
</script>

<style scoped>
/* 主容器 */
.map-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 按钮组 */
.control-buttons {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; 
}


.map-box {
  width: 100vw;  
  height: 100vh; 
  position: absolute; 
  top: 0;
  left: 0;
}
</style>
