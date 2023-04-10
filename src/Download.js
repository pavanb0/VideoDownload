import React from 'react';
import { View, Text } from 'react-native';
import ytdl from 'react-native-ytdl';

export async function Download(url){

    const urls = await ytdl(url, { quality: 'highestaudio' });
    let link = JSON.stringify(urls);
    return link;

}

export async function getInfo(url){
    const info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    let thumbnail = info.videoDetails.thumbnails[0].url;
    let duration = info.videoDetails.lengthSeconds;
    let author = info.videoDetails.author.name;
    
    return [title,thumbnail,duration,author];
}




