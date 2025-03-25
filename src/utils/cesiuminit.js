import * as Cesium from "cesium";
import { useViewerStore } from "../stores/cesiumviewer";
import { WmsRequestBylayer } from "../api/wmsquerybylayer.js";
import { data_process } from "./dataprocess.js";
import { splitGeoJSONByCategory } from "./splitgeojson.js";
const store = useViewerStore();
const viewer = store.initViewer();
async function loaddata(process) {

    try {
        viewer.imageryLayers.addImageryProvider(
            new Cesium.MapboxStyleImageryProvider({
        url: 'https://api.mapbox.com/styles/v1',
        username: 'eclair17',
        styleId: 'clplz5co0000u01rdgchq6uos',
        accessToken: 'pk.eyJ1IjoiZWNsYWlyMTciLCJhIjoiY2xoZWxvZjNhMTB5ODNsazFtNzF6MnIzeCJ9.N86KGnD3M7Cw5HMS6_jP_Q',
        scaleFactor: true
            })
        );
        
       const layer_name = 'hkjl:tj_area2'
       let result = await WmsRequestBylayer(layer_name);
       let geojson = result.data;
       console.log(geojson);
       const categorymap = splitGeoJSONByCategory(geojson);
       console.log(categorymap);
       let color = Cesium.Color.BLUEVIOLET.withAlpha(0.4);
       const height = 1;
      data_process(viewer,categorymap,height);
      if(process)
      {
        viewer.dataSources._dataSources.forEach((dataSource) => {
            if (dataSource instanceof Cesium.GeoJsonDataSource) {
              viewer.dataSources.remove(dataSource);
            }
          });
      }
    } catch (error) {
        console.error("加载 3D Tiles 失败:", error);
    }
    return viewer
}

export { loaddata };
