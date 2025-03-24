import * as Cesium from "cesium";
import { useViewerStore } from "../stores/cesiumviewer";
import { WmsRequestBylayer } from "../api/wmsquerybylayer.js";
import { data_process } from "./dataprocess.js";
import { splitGeoJSONByCategory } from "./splitgeojson.js";
const store = useViewerStore();
const viewer = store.initViewer();
async function switchmap(process) {

    try {
        // 先移除所有实体
        if(process){
        /* viewer.scene.primitives.removeAll(); */
        }    
        viewer.imageryLayers.addImageryProvider(
            new Cesium.MapboxStyleImageryProvider({
        url: 'https://api.mapbox.com/styles/v1',
        username: 'eclair17',
        styleId: 'clw0f8pu3017v01pc9vq3dlub',
        accessToken: 'pk.eyJ1IjoiZWNsYWlyMTciLCJhIjoiY2xoZWxvZjNhMTB5ODNsazFtNzF6MnIzeCJ9.N86KGnD3M7Cw5HMS6_jP_Q',
        scaleFactor: true
            })
        );
        
    } catch (error) {
        console.error("加载 3D Tiles 失败:", error);
    }
    return viewer
}

export { switchmap };
