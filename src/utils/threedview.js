import * as Cesium from "cesium";
import { useViewerStore } from "../stores/cesiumviewer";
const store = useViewerStore();
const viewer = store.initViewer();
async function threedview() {
    if (!viewer) {
        console.error("❌ viewer 未初始化！");
        return;
      }
    const tileset1 = await Cesium.Cesium3DTileset.fromUrl("../../data/3dtiles/tileset.json");
    
    viewer.scene.primitives.add(tileset1);
    viewer.zoomTo(tileset1); 
}
export {threedview}