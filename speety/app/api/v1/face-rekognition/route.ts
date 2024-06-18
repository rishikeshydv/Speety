import {RekognitionClient, CompareFacesCommand} from '@aws-sdk/client-rekognition';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const config = {
    region: process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
}

const client = new RekognitionClient(config);

export async function POST(req:NextRequest){
    const urlData = await req.json();
    //getting the arraybuffer of the images
    const source = await axios.get(urlData.input1, {responseType: 'arraybuffer'});
    const target = await axios.get(urlData.input2, {responseType: 'arraybuffer'});
//converting the arraybuffer to a buffer
    const sourceBuffer = Buffer.from(source.data, 'binary');
    const targetBuffer = Buffer.from(target.data, 'binary');
//setting a parameter
const params = {
    SourceImage: {
        Bytes: sourceBuffer,
    },
    TargetImage: {
        Bytes: targetBuffer,
    },
    SimilarityThreshold: 0,
}
//comparing the faces
const command = new CompareFacesCommand(params);

//getting the response
const response = await client.send(command);
if(response.FaceMatches === undefined){
    return NextResponse.json([]);
}
console.log(response.FaceMatches[0]['Similarity'] as any);
return NextResponse.json(response.FaceMatches);

}
