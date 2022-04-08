import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import styled from "styled-components";

export default function TheMap() {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2NyYXRjaGN1YmUiLCJhIjoiY2lqcjlxZXY2MDg5cnV5bHgxaGJpdWd4aiJ9.vGl5MrAJi3xHvyQSnuK1ug";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: ["/{z}/{x}/{y}/tileserver.png"],
            tileSize: 128,
            attribution: "MRT-MAP",
          },
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 14,
            maxzoom: 22,
          },
        ],
      },
      center: [0, 0], // starting position
      zoom: 19, // starting zoom
    });
  });

  return <StyledMap id="map"></StyledMap>;
}

const StyledMap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
