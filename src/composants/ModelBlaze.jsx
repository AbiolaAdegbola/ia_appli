import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import universite from '../assets/universite.jpg'

function RecognitionComponent() {
  const [videoStream, setVideoStream] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const videoRef = useRef();
  const canvasRef = useRef(); 
  const [detectedPeople, setDetectedPeople] = useState([]);

  useEffect(() => {
    
      //recuperation des photo de profil depuis la base de données
      const photo_all_db = async () =>{
        const response = await axios.get('http://localhost:7575/api/profil/images_all/')
        setImageUrls(response.data['imageUrls'])
      }
  
      photo_all_db()
  }, []);

  useEffect(() => {
    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setVideoStream(stream);
      } catch (error) {
        console.error(error);
      }
    }

    startWebcam();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    async function loadModelsAndStartDetection() {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);

      const video = videoRef.current;
      video.srcObject = videoStream;

      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const canvas = canvasRef.current;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvas);
        });

        // Mise à jour des personnes détectées
        setDetectedPeople(results.map(result => result.toString()));
      }, 100);
    }

    if (videoStream) {
      loadModelsAndStartDetection();
    }
  }, [videoStream]);

  async function getLabeledFaceDescriptions() {
    const labels = ["abiola", "akesse", "gore"];
    return Promise.all(
      imageUrls.map(async (label, index) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`http://localhost:7575/image_profil/${label}`);
          // console.log(img)
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(labels[index], descriptions);
      })
    );
  }

  return (
    
        <div style={{ position: 'relative', margin: 'auto', height:"100vh", backgroundImage:`url(${universite})`, backgroundSize:"100%" }}>
        <video
          ref={videoRef}
          // onPlay={handlePlay}
          autoPlay
          muted
          playsInline
          width="640"
          height="480"
          id="video"
          style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto' }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto' }}
          width="640"
          height="480"
        />
        {console.log(detectedPeople)}
      </div>
  );
}

export default RecognitionComponent;