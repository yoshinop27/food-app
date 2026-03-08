import React from 'react';
import { useState } from 'react';
import { APIProvider, Marker, Map } from '@vis.gl/react-google-maps';
import { useGeolocated } from 'react-geolocated';

const MapComponent = (distance, price, type) => {

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <Map
        style={{ width: '100%', height: '100%' }}
        center={coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 0, lng: 0 }}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <Marker position={coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 0, lng: 0 }} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
