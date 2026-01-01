"use client";

import { Map, Marker } from "@vis.gl/react-google-maps";

export function MapComponent() {
  const position = { lat: 34.052235, lng: -118.243683 }; // Downtown Los Angeles

  return (
    <div style={{ height: "450px", width: "100%" }}>
      <Map
        defaultCenter={position}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="a2b4c6d8e0f1g2h3" // Example Map ID for custom styling
      >
        <Marker position={position} />
      </Map>
    </div>
  );
}
