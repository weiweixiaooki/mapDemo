import * as Cesium from "cesium";
import { useViewerStore } from "../stores/cesiumviewer";
const store = useViewerStore();
const viewer = store.initViewer();
async function clearview() {
    if (!viewer) {
        console.error("viewer 未初始化！");
        return;
      }
      viewer.entities.removeAll();  // 清除所有实体
      viewer.dataSources.removeAll(); // 清除所有数据源 
}
export {clearview}