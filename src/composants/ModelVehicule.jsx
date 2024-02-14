import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const VehicleRecognition = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, []);

  const detectFrame = async () => {
    const video = videoRef.current;
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      return;
    }

    const predictions = await model.detect(video);
    setPredictions(predictions);

    requestAnimationFrame(detectFrame);
  };

  useEffect(() => {
    if (model) {
      const video = videoRef.current;
      if (video) {
        video.width = 640;
        video.height = 480;

        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
            video.play();
            detectFrame();
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
          });
      }
    }
  }, [model]);

  return (
    <div>
      <h1>Vehicle Recognition from Surveillance Camera</h1>
      <video ref={videoRef} />
      {predictions.map((prediction, index) => (
        <div key={index}>
          <p>{prediction.class} - {Math.round(prediction.score * 100)}%</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleRecognition;
