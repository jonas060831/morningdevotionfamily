"use client"
import React from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent: React.FC = () => {
  return (
    <Map
      initialViewState={{
        latitude: 33.82496,
        longitude: -118.26407,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    />
  );
};

export default MapComponent;