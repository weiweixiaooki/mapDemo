
import { defineStore } from 'pinia'
import * as Cesium from 'cesium'
import { ref } from 'vue'
export const useViewerStore = defineStore('updateviewer',() =>{
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Yjg5YWUwMi1lZTNiLTRjYmUtYmRhOS02OGRhY2QwMTdlMWMiLCJpZCI6MjAxODE3LCJpYXQiOjE3MjU2MTA5NjV9.Rr2KSLsTtLxo3mdUreVPZwrai49zHpcgFxtWxAcQRvg"
  let storedviewer = null;
  let feature = {};
  let dataSourceCollection = {};
  let position = {};
  let bounding = {};
  function initViewer(container) {

    if (!storedviewer) {
      storedviewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        scene3DOnly: true,
        infoBox: true, // 启用 InfoBox
        
      });
    }
    return storedviewer;
  }
  function myviewer (){
        console.log(storedviewer)
        return storedviewer
    }
  function addviewer(viewer){
    storedviewer = viewer;
    console.log(storedviewer)
  };
  return{
    feature,
    dataSourceCollection,
    position,
    storedviewer,
    bounding,
    myviewer,
    addviewer,
    initViewer
  };
},
{
    persist: true
})
