import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const ModelBlaze = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        async function setupCamera() {
            const video = videoRef.current;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                return new Promise(resolve => {
                    video.onloadedmetadata = () => {
                        resolve(video);
                    };
                });
            } catch (e) {
                console.error('Error accessing camera: ', e);
            }
        }

        async function run() {
            const video = await setupCamera();
            await faceapi.loadSsdMobilenetv1Model('/models');
            await faceapi.loadFaceRecognitionModel('/models');
            const canvas = canvasRef.current;
            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);

            const labeledFaceDescriptors = await loadLabeledImages(); // Charger les images de référence avec les visages étiquetés
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

            async function detectFaces() {
                const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor)); // Comparaison avec les images de référence
                results.forEach((result, i) => {
                    const box = resizedDetections[i].detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
                    drawBox.draw(canvas);
                });
                requestAnimationFrame(detectFaces);
            }

            detectFaces();
        }

        async function loadLabeledImages() {
            const labels = ['Person1', 'Person2']; // Ajoutez les noms des personnes
            return Promise.all(
                labels.map(async label => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) { // Charger deux images par personne pour plus de précision
                        const img = await faceapi.fetchImage(`/images/${label}/${i}.jpg`);
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                        descriptions.push(detections.descriptor);
                    }
                    return new faceapi.LabeledFaceDescriptors(label, descriptions);
                })
            );
        }

        run().catch(console.error);
    }, []);


    return (
        <div>
            <video id="video" width="640" height="480" autoPlay ref={videoRef}></video>
            <canvas id="canvas" width="640" height="480" ref={canvasRef}></canvas>
        </div>
    );
}

export default ModelBlaze;
