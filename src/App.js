import React from "react";
import ReactDOM from "react-dom/client";
import {
  NEW_LOCATION,
  lock,
  rangeRandom,
  TOP_DEFAULT_MARKER_POPUP,
  LEFT_DEFAULT_MARKER,
  RIGHT_DEFAULT_MARKER,
  TOP_DEFAULT_MARKER,
  TOP_MARKER,
  RIGHT_MARKER,
  LEFT_MARKER,
  LOCATION,
} from "./common";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
export default function YMapComponent() {
  const [location, setLocation] = useState(LOCATION);
  main();
  async function main() {
    console.log(React.version);
    const [ymaps3React] = await Promise.all([
      window.ymaps3.import("@yandex/ymaps3-reactify"),
      window.ymaps3.ready,
    ]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

    const { YMap, YMapDefaultSchemeLayer } = reactify.module(window.ymaps3);

    function YandexMap() {
      const map = React.useRef(null);
      const [camera, setCamera] = React.useState({
        tilt: 0,
        azimuth: 0,
        duration: 0,
      });
      const [location, setLocation] = React.useState(LOCATION);
      const [state, setState] = React.useState({
        resetByMouse: null,
        location: true,
        fly: null,
      });

      const changeCenter = React.useCallback(() => {
        setLocation({
          ...(state.location ? NEW_LOCATION : LOCATION),
          duration: 1000,
        });
        setState((s) => ({ ...s, location: !s.location }));
      }, [state]);

      const rotateCamera = React.useCallback((angle) => {
        setCamera((camera) => ({
          ...camera,
          azimuth: map.current.azimuth + angle,
          duration: 1000,
        }));
      });

      const tiltCamera = React.useCallback((angle) => {
        setCamera((camera) => ({
          ...camera,
          tilt: map.current.tilt + angle,
          duration: 1000,
        }));
      });

      const changeAzimuthLeft = React.useCallback(() =>
        rotateCamera(Math.PI / 4)
      );
      const changeAzimuthRight = React.useCallback(() =>
        rotateCamera(-Math.PI / 4)
      );
      const downTilt = React.useCallback(() => tiltCamera(Math.PI / 4));
      const upTilt = React.useCallback(() => tiltCamera(-Math.PI / 4));
      const flyAway = React.useCallback(() => {
        const previousPoint = state.fly
          ? { ...state.fly }
          : {
              center: [rangeRandom(30, 50), rangeRandom(30, 50)],
              zoom: Math.round(rangeRandom(4, 9)),
              azimuth: map.current.azimuth + Math.random() * Math.PI,
              tilt: map.current.tilt + Math.random() * Math.PI,
            };

        setState((state) => ({
          ...state,
          fly: {
            center: map.current.center,
            zoom: map.current.zoom,
            tilt: map.current.tilt,
            azimuth: map.current.azimuth,
          },
        }));

        setLocation({
          center: previousPoint.center,
          zoom: previousPoint.zoom,
          duration: 1000,
        });

        setCamera(previousPoint);
      }, [state]);

      const byMouse = React.useCallback(() => {
        if (state.resetByMouse) {
          state.resetByMouse();
          return;
        }

        const onMouseMove = (e) => {
          !lock &&
            setCamera({
              tilt: (e.clientY / 2 / window.innerHeight) * Math.PI,
              azimuth: (e.clientX / window.innerWidth) * Math.PI,
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        setState((state) => ({
          ...state,
          resetByMouse: () => {
            setState((state) => ({
              ...state,
              resetByMouse: null,
            }));
            window.removeEventListener("mousemove", onMouseMove);
          },
        }));
      }, [state]);

      return (
        <React.Fragment>
          <button type="button" onClick={changeCenter}>
            Плавно переместить центр
          </button>
          <button type="button" onClick={changeAzimuthRight}>
            Плавно камеру против часовой
          </button>
          <button type="button" onClick={changeAzimuthLeft}>
            Плавно камеру по часовой
          </button>
          <button type="button" onClick={upTilt}>
            Поднять камеру
          </button>
          <button type="button" onClick={downTilt}>
            Наклонить камеру
          </button>
          <button type="button" onClick={flyAway}>
            Полет
          </button>
          <button type="button" onClick={byMouse}>
            Управление мышкой
          </button>
          <YMap location={location} ref={map} camera={camera}>
            <YMapDefaultSchemeLayer />
          </YMap>
        </React.Fragment>
      );
    }

    const yaMapRoot = ReactDOM.createRoot(
      document.getElementById("yandexMapContainer")
    );
    yaMapRoot.render(<YandexMap />);
  }

  return (
    <Box id="yandexMapContainer" sx={{ width: "500px", height: "500px" }}></Box>
    // <>
    //   {map !== null ? (
    //     <YMap location={location}>
    //       <YMapControls position="right">
    //         <YMapZoomControl />
    //       </YMapControls>

    //       <YMapDefaultSchemeLayer />
    //       <YMapDefaultFeaturesLayer />
    //       <YMapFeatureDataSource id="popups" />
    //       <YMapLayer source="popups" />

    //       {/* <MyMarkerWithPopup
    //                     coordinates={LEFT_MARKER}
    //                     popupContent="Incredible content!"
    //                 />
    //                 <MyMarkerWithPopup
    //                     coordinates={RIGHT_MARKER}
    //                     popupContent="More very interesting text!"
    //                 />
    //                 <MyMarkerWithPopup
    //                     coordinates={TOP_MARKER}
    //                     popupContent="Good text here"
    //                     popupPosition="top"
    //                 /> */}
    //       <YMapDefaultMarker
    //         coordinates={TOP_DEFAULT_MARKER}
    //         popup={TOP_DEFAULT_MARKER_POPUP}
    //       />
    //       {/* <YMapDefaultMarker
    //                     coordinates={LEFT_DEFAULT_MARKER}
    //                     popup={leftPopup}
    //                 />
    //                 <YMapDefaultMarker
    //                     coordinates={RIGHT_DEFAULT_MARKER}
    //                     popup={rightPopup}
    //                 /> */}
    //     </YMap>
    //   ) : (
    //     <>{console.log("helllllooo")}</>
    //   )}
    // </>
  );
}
