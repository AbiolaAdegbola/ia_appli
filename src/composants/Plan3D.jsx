import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Plan3D = ({ mapContainerId }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialiser la carte uniquement si la référence est null
      mapRef.current = L.map(mapContainerId).setView([51.505, -0.09], 13);

      // Ajouter une couche de tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Ajouter un marqueur à une position spécifique sur la carte
      L.marker([51.5, -0.09]).addTo(mapRef.current)
        .bindPopup('Hello, world!')
        .openPopup();
    }
  }, [mapContainerId]);

  return null;
};

export default Plan3D;
