import React from "react";
import { useRef, useMemo, useCallback } from "react";
import ReactDOM from "react-dom";
import ClusterMarker from "./clusterMarker";
import FeatureMarker from "./featureMarker";

import { Box } from "@mui/material";

export default function YMapComponent({
  styleProps,
  locationData,
  featuresData,
}) {
  const { width, height } = styleProps;
  main();
  async function main() {
    const [ymaps3React] = await Promise.all([
      window.ymaps3.import("@yandex/ymaps3-reactify"),
      window.ymaps3.ready,
    ]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapFeatureDataSource,
      YMapControls,
      YMapLayer,
      YMapMarker,
    } = reactify.module(window.ymaps3);
    const { YMapZoomControl } = reactify.module(
      await window.ymaps3.import("@yandex/ymaps3-controls@0.0.1")
    );
    const { YMapOpenMapsButton } = reactify.module(
      await window.ymaps3.import("@yandex/ymaps3-controls-extra")
    );
    const { YMapClusterer, clusterByGrid } = reactify.module(
      await window.ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
    );

    function YandexMap() {
      const map = useRef(null);
      const gridSizedMethod = useMemo(
        () => clusterByGrid({ gridSize: 64 }),
        []
      );
      const marker = useCallback(
        (feature) => (
          <YMapMarker
            coordinates={feature.geometry.coordinates}
            source={"my-source"}>
            <FeatureMarker text={feature} />
          </YMapMarker>
        ),
        []
      );
      const cluster = useCallback(
        (coordinates, features) => (
          <YMapMarker coordinates={coordinates} source={"my-source"}>
            <ClusterMarker text="1" />
          </YMapMarker>
        ),
        []
      );

      return (
        <React.Fragment>
          <YMap location={locationData} ref={map}>
            <YMapDefaultSchemeLayer />
            <YMapFeatureDataSource id="my-source" />
            <YMapLayer source="my-source" type="markers" zIndex={1800} />
            <YMapDefaultFeaturesLayer />
            <YMapClusterer
              marker={marker}
              cluster={cluster}
              method={gridSizedMethod}
              features={featuresData}
            />
            <YMapControls position="right">
              <YMapZoomControl />
            </YMapControls>
            <YMapControls position="bottom left">
              <YMapOpenMapsButton />
            </YMapControls>
          </YMap>
        </React.Fragment>
      );
    }

    ReactDOM.render(
      <YandexMap />,
      document.getElementById("yandexMapContainer")
    );
  }

  return (
    <Box
      id="yandexMapContainer"
      sx={{ width: { width }, height: { height } }}></Box>
  );
}
