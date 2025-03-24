import request from '../utils/request.js'
export  const WmsRequestBylayer = (LAYERS)=> {  

            const params_1 = {
            SERVICE: 'WFS',
            VERSION: '1.0.0',
            REQUEST: 'GetFeature',
            outputFORMAT: 'application/json',
            TRANSPARENT:true,
            typeNames: LAYERS,
            QUERY_LAYERS: LAYERS,
            LAYERS: LAYERS,
            FEATURE_COUNT: 50000,
            exceptions: 'application/vnd.ogc.se_inimage',
            CQL_FILTER: "KIND='0137'",
            SRS: 'EPSG:4326',  
        } 
        // 发起GET请求
        return request.get('/wms',{
        params: params_1})                                      

    }