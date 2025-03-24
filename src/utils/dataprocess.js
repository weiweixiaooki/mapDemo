import * as Cesium from 'cesium';

export const data_process = (viewer, categorymap, height) => {
    //颜色数组
    const baseColors = [
        Cesium.Color.RED, Cesium.Color.BLUE, Cesium.Color.GREEN, 
        Cesium.Color.ORANGE, Cesium.Color.PURPLE, Cesium.Color.YELLOW,
        Cesium.Color.CYAN, Cesium.Color.PINK, Cesium.Color.LIME
    ];
    const colorArray = baseColors.map(color => desaturateColor(color, 0.8)); // 降低 50% 饱和度
    const strokeColorArray = baseColors.map(color => desaturateColor(color, 0.3));
    //名称数组（用于匹配 Label）
    const nameArray = [
        "宁河区", "北辰区", "西青区", "东丽区", "红桥区", 
        "河北区", "南开区", "宝坻区", "河东区", "河西区", 
        "和平区", "静海区", "津南区", "蓟州区", "武清区", "滨海新区"
    ];

    //遍历 categorymap 加载每个 FeatureCollection
    Object.entries(categorymap).forEach(([key, geojson], index) => {
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(geojson, {
            clampToGround: true,
            strokeWidth: 0,
        })).then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            
            const entities = dataSource.entities.values;
            let baseColor = colorArray[index % colorArray.length]; // 取不同颜色
            let entityColor = baseColor.withAlpha(0.06); // 设置透明度 
            let strokeColor = strokeColorArray[index % strokeColorArray.length+1]; // 包围盒边界颜色
            //遍历每个实体
            entities.forEach((entity) => {
                if (entity.polygon) {
                    entity.polygon.material = entityColor;
                    entity.polygon.height = 3;
                    entity.polygon.extrudedHeight = height + 3;
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = strokeColor; // **设置边界颜色
                    // 计算中心点
                    let centroid = computeCentroid(entity.polygon.hierarchy.getValue());

                    // 获取name，并转换编码
                    const rawName = entity.properties?.name?.getValue() || "未知建筑";
                    const convertedName = gbkToUtf8(rawName);
                    const displayName = nameArray[index] || convertedName; // 匹配 nameArray 或原始名称

                    // **添加 Label**
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(centroid.longitude, centroid.latitude, height),
                        label: {
                            text: displayName,
                            font: "16px sans-serif",
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 1.2,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        }
                    });
                }

                // 处理 polyline
                if (Cesium.defined(entity.polyline)) {
                    entity.polyline.followSurface = false;
                    entity.polyline.clampToGround = false;
                    entity.polyline.width = 5;   // 线宽
                    entity.polyline.material = colorArray[index % colorArray.length];  // 颜色

                    //修改线条高度
                    let positions = entity.polyline.positions.getValue(Cesium.JulianDate.now());
                    let updatedPositions = [];
                    positions.forEach(pos => {
                        let cartographic = Cesium.Cartographic.fromCartesian(pos);
                        updatedPositions.push(
                            Cesium.Math.toDegrees(cartographic.longitude), 
                            Cesium.Math.toDegrees(cartographic.latitude), 
                            20
                        ); // 设置高度 20m
                    });

                    entity.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(updatedPositions);
                }
            });

            console.log(`加载完成: ${key} - ${entities.length} 个实体`);
        });
    });

    console.log("categorymap 处理完成！");
};

//计算多边形中心点
function computeCentroid(hierarchy) {
    let positions = hierarchy.positions;
    let totalLon = 0, totalLat = 0;

    positions.forEach(pos => {
        let cartographic = Cesium.Cartographic.fromCartesian(pos);
        totalLon += Cesium.Math.toDegrees(cartographic.longitude);
        totalLat += Cesium.Math.toDegrees(cartographic.latitude);
    });

    let count = positions.length;
    return {
        longitude: totalLon / count,
        latitude: totalLat / count
    };
}

// GBK 转 UTF-8
function gbkToUtf8(text) {
    try {
        return decodeURIComponent(escape(text));
    } catch (e) {
        console.warn("⚠️ 编码转换失败:", text);
        return text; // 如果转换失败，返回原文本
    }
}

//颜色去饱和
function desaturateColor(color, factor) {
    let hsl = rgbToHsl(color.red, color.green, color.blue);
    hsl.s *= factor; // 降低饱和度
    let rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    return new Cesium.Color(rgb.r, rgb.g, rgb.b, color.alpha);
}

//RGB 转 HSL
function rgbToHsl(r, g, b) {
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // 灰色
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        // @ts-ignore
        h /= 6;
    }
    return { h, s, l };
}

// HSL 转 RGB
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // 灰色
    } else {
        function hueToRgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }
    return { r, g, b };
}
