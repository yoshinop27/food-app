import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { APIProvider, Marker, Map } from '@vis.gl/react-google-maps';
import { useGeolocated } from 'react-geolocated';
import { PriceContext, DistanceContext, TypeContext, SubmitContext } from '../contexts/contexts';
import api from '../api'

const MapComponent = () => {

  const {price, setPrice} = useContext(PriceContext);
  const {distance, setDistance} = useContext(DistanceContext);
  const {type, setType} = useContext(TypeContext);
  const {submitted, setSubmitted} = useContext(SubmitContext);

  const [restaurants, setRestaurants] = useState({ places: [] });
  
  // Retrieve user coordinates 
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // Run on intiial load
  useEffect(() => {
    if (!coords) return;
    // Fetch Restaurant data
    const fetchRestaurants = async () => {
    try {
      const res = await api.post('/restaurants', {latitude: coords.latitude, longitude: coords.longitude})
      setRestaurants(res.data)
      } catch (error) {
        console.error(error.response?.status)
      }
    }
    fetchRestaurants()
  }, [submitted])

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <Map
        style={{ width: '100%', height: '100%' }}
        center={coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 0, lng: 0 }}
        defaultZoom={18}
        gestureHandling="greedy"
        disableDefaultUI
      >
      {restaurants?.places?.map((restaurant) => {
        const coords = restaurant.geometry?.location
        if (!coords) return null
        return (
          <Marker key={restaurant.place_id} position={{ lat: coords.lat, lng: coords.lng }} />
        )
      })}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
