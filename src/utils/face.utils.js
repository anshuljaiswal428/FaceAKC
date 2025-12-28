import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";
import { Canvas, Image, ImageData, loadImage } from "canvas";

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let modelsLoaded = false;

export const loadFaceModels = async () => {
  if (modelsLoaded) return;

  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");

  modelsLoaded = true;
  console.log("✅ Face models loaded (Node 22)");
};

export const getFaceEmbedding = async (imageBuffer) => {
  await loadFaceModels();

  const img = await loadImage(imageBuffer);

  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) {
    throw new Error("No face detected");
  }

  return Array.from(detection.descriptor); 
};
