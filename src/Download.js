import React from 'react';
import { View, Text } from 'react-native';
import ytdl from 'react-native-ytdl';
import RNFetchBlob from 'rn-fetch-blob';

export async function DownloadAudio(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(formats, { quality: 'highestaudio' });
    const audioUrl = audioFormat.url;
    return audioUrl;
}


export async function DownloadHighestVideo(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(formats, { quality: '18' });
    const videoUrl = videoFormat.url;
    return videoUrl;
}

export async function DownloadMediumVideo(url){
    const { videoDetails: { title }, formats } = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(formats, { quality: 'medium' });
    const videoUrl = videoFormat.url;
    return videoUrl;
}




export async function getInfo(url){
    const info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    let thumbnail = info.videoDetails.thumbnails[0].url;
    let duration = info.videoDetails.lengthSeconds;
    let author = info.videoDetails.author.name;
    
    return ['• Title :- '+title,thumbnail,duration,author];
}




