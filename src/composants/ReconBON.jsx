import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import universite from '../assets/universite.jpg'
const RecognitionComponent = () => {
  const videoRef = useRef();
  const canvasRef = useRef(); // Utilisez useRef pour créer une référence au canevas

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);

      startVideo();
    };

    const startVideo = () => {
      navigator.getUserMedia(
        { video: {} },
        stream => videoRef.current.srcObject = stream,
        err => console.error(err)
      );
    };

    loadModels();

    return () => {};
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video.paused || video.ended) return;
    const canvas = canvasRef.current; // Utilisez la référence au canevas
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  };

  return (
    <div style={{ position: 'relative', margin: 'auto', height:"100vh", backgroundImage:`url(${universite})`, backgroundSize:"100%" }}>
      <video
        ref={videoRef}
        onPlay={handlePlay}
        autoPlay
        muted
        playsInline
        width="640"
        height="480"
        style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto' }}
        width="640"
        height="480"
      />
    </div>
  );
};

export default RecognitionComponent;
