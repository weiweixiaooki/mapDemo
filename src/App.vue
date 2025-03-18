<script setup>
</script>


<template>
 
  <div class="map-box" id="cesiumContainer">
  <router-view /></div>

</template>

<style lang="less" scoped>
/* 主布局 */
.title {
  position: absolute;
  top: 10px;
  left: 20px;
}
.el-link {
  font-size: large;
  color: @primary-color;
}
.el-link:hover {
  color: @primary-color-light;
}
#cesiumContainer{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaeaea;
  padding: 10px;
}
.map-box {
  width: 100%;     /* 父容器宽度100% */
  height: 100vh;   /* 父容器高度100% */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>