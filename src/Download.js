import React from 'react';
import { View, Text } from 'react-native';
import ytdl from 'react-native-ytdl';

// export async function DownloadAudio(url){

//     const urls = await ytdl(url, { quality: 'highestaudio' });
//     let link = JSON.stringify(urls);
//     return link;

// }


// export async function DownloadAudio(url){
//     const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
//     const videoFormat = ytdl.chooseFormat(formats, { quality: '136' });
//     const audioFormat = ytdl.chooseFormat(formats, { quality: 'highestaudio' });

//     const videoUrl = videoFormat.url;
//     const audioUrl = audioFormat.url;

//     const videoData = await fetch(videoUrl);
//     const audioData = await fetch(audioUrl);

//     const videoBlob = await videoData.blob();
//     const audioBlob = await audioData.blob();

//     const mergedBlob = new Blob([videoBlob, audioBlob], { type: 'video/mp4' });

//     const downloadUrl = URL.createObjectURL(mergedBlob);
//     return downloadUrl; 
// }


export async function DownloadAudio(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(formats, { quality: 'highestaudio' });
    const audioUrl = audioFormat.url;
    return audioUrl;
}


export async function DownloadHighestVideo(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(formats, { quality: 'highestvideo' });
    const videoUrl = videoFormat.url;
    return videoUrl;
}

export async function DownloadMediumVideo(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(formats, { quality: 'medium' });
    const videoUrl = videoFormat.url;
    return videoUrl;
}


// async function DownloadHighestVideo(url){
    
//     const urls = await ytdl(url, { quality: 'highestvideo' });
//     let link = JSON.stringify(urls);
//     return link;
// }

// export async function DownloadMediumVideo(url){
//     const urls = await ytdl(url, { quality: 'medium' });
//     let link = JSON.stringify(urls);
//     return link;
// }


export async function getInfo(url){
    const info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    let thumbnail = info.videoDetails.thumbnails[0].url;
    let duration = info.videoDetails.lengthSeconds;
    let author = info.videoDetails.author.name;
    
    return ['• Title :- '+title,thumbnail,duration,author];
}




