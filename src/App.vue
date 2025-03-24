<script setup>
</script>

<template>
  <div class="map-box" id="cesiumContainer">
    <router-view />
  </div>
</template>

<style lang="less" scoped>

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
