// import * as faceapi from 'face-api.js';

// //load models
// export async function loadModels() {
//   await faceapi.loadSsdMobilenetv1Model('models/');
//   await faceapi.loadFaceLandmarkModel('models/');
//   await faceapi.loadFaceRecognitionModel('models/');
// }

// //detect face
// export async function detectFace(image: HTMLImageElement) {
//   const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
//   return detections;
// }

// // compare faces
// export function compareFaces(face1:Float32Array, face2:Float32Array) {
//   const distance = faceapi.euclideanDistance(face1, face2);
//   const similarity = sigmoidFunction(distance);
//   return similarity;
// }

// //main function
// export async function main() {
//     await loadModels();

//     const image1 = await loadImage('/elon1.jpeg');
//     const image2 = await loadImage('/elon2.jpg');

//     const face1 = await detectFace(image1);
//     const face2 = await detectFace(image2);

//     // Extract face descriptors
//     const faceDescriptor1 = face1[0]?.descriptor; // Assuming only one face per image
//     const faceDescriptor2 = face2[0]?.descriptor;
    
//         // Compare faces
//         if (faceDescriptor1 && faceDescriptor2) {
//             const similarity = compareFaces(faceDescriptor1, faceDescriptor2);
//             console.log(`Similarity between faces: ${similarity}`);
//         } else {
//             console.log('No faces detected in one or both images.');
//         }
    
// }


// //UTILITY FUNCTIONS

//     // Utility function to calculate similarity score (e.g., using a sigmoid function)
// function sigmoidFunction(distance: number): number {
//     return 1 / (1 + Math.exp(-distance)); // Example sigmoid function
// }

// // Utility function to load an image
// function loadImage(src: string): Promise<HTMLImageElement> {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve(img);
//         img.onerror = (error) => reject(error);
//         img.src = src;
//     });
// }
