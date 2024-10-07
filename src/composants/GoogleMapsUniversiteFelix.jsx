// src/MapWithWebGLOverlay.js

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapWithWebGLOverlay = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Remplacez par votre clé API Google Maps
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const google = window.google;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 5.339388, lng: -3.992843 }, // Coordonnées de l'université Félix Houphouët-Boigny de Cocody
        zoom: 16,
        mapId: 'YOUR_MAP_ID', // Optionnel : utilisez un Map ID si vous avez personnalisé votre carte
      });

      // Définir un WebGL Overlay View
      const webglOverlayView = new google.maps.WebGLOverlayView();

      webglOverlayView.onAdd = () => {
        // Code pour initialiser WebGL
      };

      webglOverlayView.onContextRestored = (gl) => {
        // Code pour configurer WebGL après restauration du contexte
      };

      webglOverlayView.onDraw = (options) => {
        const { gl, transformer } = options;
        
        // Code pour dessiner avec WebGL
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      };

      webglOverlayView.onRemove = () => {
        // Code pour nettoyer lorsque WebGL Overlay est retiré
      };

      webglOverlayView.setMap(map);
    });
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default MapWithWebGLOverlay;
