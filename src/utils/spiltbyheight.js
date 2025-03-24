import * as Cesium from 'cesium'
import { useViewerStore } from "../stores/cesiumviewer";
const store = useViewerStore();
const viewer = store.initViewer();
async function splitbyheight (){
    const tileset = await Cesium.Cesium3DTileset.fromUrl("../../data/3dtiles/tileset.json");
        viewer.scene.primitives.add(tileset);
           // 设置样式，根据建筑高度（TOPHEIGHT）改变颜色
            tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
            conditions: [
                ["${Elevation} >= 100", "color('hsla(0, 50%, 50%, 1.0)')"],       // 高于 100 米 -> 红色
                ["${Elevation} >= 50", "color('hsla(30, 50%, 50%, 1.0)')"],     // 50 - 100 米 -> 橙色
                ["${Elevation} >= 20", "color('hsla(60, 50%, 50%, 1.0)')"],     // 20 - 50 米 -> 黄色
                ["true", "color('hsla(120, 50%, 50%, 1.0)')"]                     // 低于 20 米 -> 绿色
            ],
            },
            }); 

}
export {splitbyheight}
