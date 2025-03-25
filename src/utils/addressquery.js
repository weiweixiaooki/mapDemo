import * as Cesium from "cesium";
import { useViewerStore } from "../stores/cesiumviewer";
import { WmsRequestBylayer } from "../api/wmsquerybylayer.js";
import { data_process } from "./dataprocess.js";
import { splitGeoJSONByCategory } from "./splitgeojson.js";
const store = useViewerStore();
const viewer = store.initViewer();
async function flyto(address) {
    const apiKey = "4u6f7EoL5unYuYE00TDJJl611RsSJSti";  // 请替换为你的百度 API Key
    const url = `/baidu-api/geocoding/v3/?address=${encodeURIComponent(address)}&output=json&ak=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API 返回数据:", data);
        if (data.status === 0) {
            const { lat, lng } = data.result.location;
            console.log(`经纬度: ${lat}, ${lng}`);
            viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(lng, lat, 50000),
                        orientation: {
                            heading: Cesium.Math.toRadians(0),
                            pitch: Cesium.Math.toRadians(-90),
                            roll: 0
                        },
                        duration: 2
                    });
            return { lat, lng };
        } else {
            console.error("获取经纬度失败:", data.msg);
            return null;
        }
    } catch (error) {
        console.error("请求出错:", error);
        return null;
    }
}


export { flyto };
