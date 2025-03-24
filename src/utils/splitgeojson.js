function splitGeoJSONByCategory(geojson) {
    const categoryMap = {};

    geojson.features.forEach((feature) => {
        const category = feature.properties.OBJECTID || "Unknown"; // 获取类别
        if (!categoryMap[category]) {
            categoryMap[category] = {
                type: "FeatureCollection",
                crs: { type: "name", properties: { name: "EPSG:4326" } },
                features: [],
            };
        }
        categoryMap[category].features.push(feature);
    });

    return categoryMap;
}
export{splitGeoJSONByCategory}