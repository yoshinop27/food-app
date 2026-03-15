import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { APIProvider, Marker, Map } from '@vis.gl/react-google-maps';
import { useGeolocated } from 'react-geolocated';
import { PriceContext, DistanceContext, TypeContext, SubmitContext } from '../contexts/contexts';
import { milesToMeters } from '../util/helpers';
import api from '../api'

const MapComponent = () => {

  const {price, setPrice} = useContext(PriceContext);
  const {distance, setDistance} = useContext(DistanceContext);
  const {type, setType} = useContext(TypeContext);
  const {submitted, setSubmitted} = useContext(SubmitContext);
  const hasFetchedOnMount = useRef(false);

  const [restaurants, setRestaurants] = useState({ places: [] });
  
  // Retrieve user coordinates 
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // Fetch once after coordinates are available, then on submit
  useEffect(() => {
    if (!coords) return;
    if (hasFetchedOnMount.current && !submitted) return;

    // convert miles from UI to meters for backend
    const meters = milesToMeters(distance);

    const fetchRestaurants = async () => {
      try {
        const res = await api.post('/restaurants', {
          latitude: coords.latitude,
          longitude: coords.longitude,
          radius: meters,
          maxprice: price,
        });
        setRestaurants(res.data);
      } catch (error) {
        console.error('Fetch restaurants failed', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      } finally {
        hasFetchedOnMount.current = true;
        if (submitted) setSubmitted(false);
      }
    };

    fetchRestaurants();
  }, [submitted, coords]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 0, lng: 0 }}
        defaultZoom={13}
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
