import * as Cesium from 'cesium'
import { ref } from 'vue';
import pinia from '../stores/index.js'
import { useViewerStore } from '../stores/cesiumviewer';
import { storeToRefs } from 'pinia';
async function loaddata() {
const store = useViewerStore();
const viewer = store.initViewer();
try {
const tileset1 = await Cesium.Cesium3DTileset.fromUrl("../../data/3dtiles/tileset.json");
  viewer.scene.primitives.add(tileset1); 
const tileset2 = await Cesium.Cesium3DTileset.fromUrl("../../data/demo/tileset.json");
  viewer.scene.primitives.add(tileset2); 
  viewer.zoomTo(tileset2); 
/* const imageryProvider = new Cesium.MapboxStyleImageryProvider({
  styleId: 'streets-v11',
  accessToken: 'pk.eyJ1Ijoia2V5NTYzIiwiYSI6ImNsbHg1N25iYjFtb28zbHBoYzZza3hvdjYifQ.kIhZshouuoSoMk3K8kNimQ'
});
viewer.imageryLayers.addImageryProvider(imageryProvider); */

/* tileset2.tileVisible.addEventListener(tile => {
  const content = tile.content;
  for (let i = 0; i < content.featuresLength; i++) {
      const feature = content.getFeature(i);
      const position = Cesium.Cartesian3.fromDegrees(
          feature.getProperty('longitude'),
          feature.getProperty('latitude'),
          feature.getProperty('height') || 100
      );

      viewer.entities.add({
          position: position,
          label: {
              text: feature.getProperty('name') || "未知",
              font: '16px sans-serif',
              fillColor: Cesium.Color.YELLOW,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              pixelOffset: new Cesium.Cartesian2(0, -20)
          }
      });
  }
}); */

// 矢量注记
const webKey = 'd876fc5528736f6ae2a6f73b668f44df'
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" + webKey,
  layer: "tdtAnnoLayer",
  style: "default",
  format: "image/jpeg",
  tileMatrixSetID: "GoogleMapsCompatible"
}))
/* viewer .imageryLayers.addImageryProvider(// 地形图
  new Cesium.UrlTemplateImageryProvider({
      url: "https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      subdomains: ["a", "b", "c", "d"],
  })) */
} catch (error) {
  console.log(`Error loading tileset: ${error}`);
}
store.addviewer(viewer);
}
export { loaddata }