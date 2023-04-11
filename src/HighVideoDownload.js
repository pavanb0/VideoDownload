


import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export async function downloadAndMergeVideo(url,title) {
    console.log(url);
  const fileName = `${title.substring(10, 30).split(' ').join('')}.mp4`;
  const downloadDest =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/${fileName}`
      : `${RNFS.DocumentDirectoryPath}/${fileName}`;
try{
  const { jobId } = RNFetchBlob.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: fileName,
      description: 'Downloading video file',
      mime: 'video/mp4',
      mediaScannable: true,
      path: downloadDest,
    },
  })
    .fetch('GET', url)
    .progress((received, total) => {
      const percentage = ((received / total) * 100).toFixed(2);
      showMessage({
        message: `Downloading... ${percentage}%`,
        type: 'info',
      });
    });

  const res = await RNFetchBlob.fs.stat(downloadDest);
  const fileSize = res.size / 1024 / 1024;

  showMessage({
    message: `Download complete! File size: ${fileSize.toFixed(2)} MB`,
    type: 'success',
  });
}catch (error) {
    console.error('Error downloading video file:', error);
    showMessage({
      message: 'Error downloading video file',
      description: error.message,
      type: 'danger',
    });
    return null;
  }

  return downloadDest;
}






// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';
// import { Platform } from 'react-native';
// import { showMessage } from 'react-native-flash-message';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// const ffmpeg = createFFmpeg({ log: true });

// export async function downloadAndMergeVideo(audioUrl, videoUrl,metadata) {
//   try {
//     const audioFileName = `${metadata.title.substring(10, 30).split(' ').join('')}.mp3`;
//     const videoFileName = `${metadata.title.substring(10, 30).split(' ').join('')}.mp4`;
//     const audioDownloadDest =
//       Platform.OS === 'android'
//         ? `${RNFS.DownloadDirectoryPath}/${audioFileName}`
//         : `${RNFS.DocumentDirectoryPath}/${audioFileName}`;
//     const videoDownloadDest =
//       Platform.OS === 'android'
//         ? `${RNFS.DownloadDirectoryPath}/${videoFileName}`
//         : `${RNFS.DocumentDirectoryPath}/${videoFileName}`;

//     // Download audio file
//     const { jobId: audioJobId } = await RNFetchBlob.config({
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         title: audioFileName,
//         description: 'Downloading audio file',
//         mime: 'audio/mpeg',
//         mediaScannable: true,
//         path: audioDownloadDest,
//       },
//     }).fetch('GET', audioUrl);

//     // Download video file
//     const { jobId: videoJobId } = await RNFetchBlob.config({
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         title: videoFileName,
//         description: 'Downloading video file',
//         mime: 'video/mp4',
//         mediaScannable: true,
//         path: videoDownloadDest,
//       },
//     }).fetch('GET', videoUrl);

//     // Wait for both files to finish downloading
//     await Promise.all([
//       RNFetchBlob.fs.stat(audioDownloadDest),
//       RNFetchBlob.fs.stat(videoDownloadDest),
//     ]);

//     // Load FFmpeg
//     await ffmpeg.load();

//     // Read audio and video files into memory
//     const audioData = await RNFS.readFile(audioDownloadDest, 'base64');
//     const videoData = await RNFS.readFile(videoDownloadDest, 'base64');

//     // Run FFmpeg to merge audio and video files
//     await ffmpeg.write('audio.mp3', audioData);
//     await ffmpeg.write('video.mp4', videoData);
//     await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp3', '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', 'merged.mp4');
//     const mergedData = await ffmpeg.read('merged.mp4');

//     // Write merged file to disk
//     const mergedFileName = 'merged.mp4';
//     const mergedFilePath =
//       Platform.OS === 'android'
//         ? `${RNFS.DownloadDirectoryPath}/${mergedFileName}`
//         : `${RNFS.DocumentDirectoryPath}/${mergedFileName}`;
//     await RNFS.writeFile(mergedFilePath, mergedData, 'base64');

//     // Delete original audio and video files
//     await Promise.all([
//       RNFetchBlob.fs.unlink(audioDownloadDest),
//       RNFetchBlob.fs.unlink(videoDownloadDest),
//     ]);

//     const res = await RNFetchBlob.fs.stat(mergedFilePath);
//     const fileSize = res.size / 1024 / 1024;

//     showMessage({
//       message: `Download complete! File size: ${fileSize.toFixed(2)} MB`,
//       type: 'success',
//     });

//     return mergedFilePath;
//   } catch (error){
//     showMessage({
//       message: error.message,
//       type: 'danger',
//     });

//   }
// }

// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';
// import { Platform } from 'react-native';
// import { showMessage } from 'react-native-flash-message';
// import { spawn } from 'child_process';



// export async function downloadAndMergeVideo(audioUrl, videoUrl,metadata) {
//     try {
//       const audioFileName = `${metadata.substring(10, 30).split(' ').join('')}.mp3`;
//       const videoFileName = `${metadata.substring(10, 30).split(' ').join('')}.mp4`;
//       const audioDownloadDest =
//         Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${audioFileName}`
//           : `${RNFS.DocumentDirectoryPath}/${audioFileName}`;
//       const videoDownloadDest =
//         Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${videoFileName}`
//           : `${RNFS.DocumentDirectoryPath}/${videoFileName}`;
  
//       // Download audio file
//       const { jobId: audioJobId } = await RNFetchBlob.config({
//         addAndroidDownloads: {
//           useDownloadManager: true,
//           notification: true,
//           title: audioFileName,
//           description: 'Downloading audio file',
//           mime: 'audio/mpeg',
//           mediaScannable: true,
//           path: audioDownloadDest,
//         },
//       }).fetch('GET', audioUrl);
  
//       // Download video file
//       const { jobId: videoJobId } = await RNFetchBlob.config({
//         addAndroidDownloads: {
//           useDownloadManager: true,
//           notification: true,
//           title: videoFileName,
//           description: 'Downloading video file',
//           mime: 'video/mp4',
//           mediaScannable: true,
//           path: videoDownloadDest,
//         },
//       }).fetch('GET', videoUrl);
  
//       // Wait for both files to finish downloading
//       await Promise.all([
//         RNFetchBlob.fs.stat(audioDownloadDest),
//         RNFetchBlob.fs.stat(videoDownloadDest),
//       ]);
  
//       // Merge audio and video files
//       const mergedFileName = 'merged.mp4';
//       const mergedFilePath =
//         Platform.OS === 'android'
//           ? `${RNFS.DownloadDirectoryPath}/${mergedFileName}`
//           : `${RNFS.DocumentDirectoryPath}/${mergedFileName}`;
//       await new Promise((resolve, reject) => {
//         const ffmpeg = spawn(
//           'ffmpeg',
//           [
//             '-i',
//             videoDownloadDest,
//             '-i',
//             audioDownloadDest,
//             '-c:v',
//             'copy',
//             '-c:a',
//             'aac',
//             '-strict',
//             'experimental',
//             mergedFilePath,
//           ],
//           { stdio: 'inherit' }
//         );
//         ffmpeg.on('exit', (code) => {
//           if (code === 0) {
//             resolve();
//           } else {
//             reject(new Error(`FFmpeg exited with code ${code}`));
//           }
//         });
//       });
  
//       // Delete original audio and video files
//       await Promise.all([
//         RNFetchBlob.fs.unlink(audioDownloadDest),
//         RNFetchBlob.fs.unlink(videoDownloadDest),
//       ]);
  
//       const res = await RNFetchBlob.fs.stat(mergedFilePath);
//       const fileSize = res.size / 1024 / 1024;
  
//       showMessage({
//         message: `Download complete! File size: ${fileSize.toFixed(2)} MB`,
//         type: 'success',
//       });
  
//       return mergedFilePath;
//     } catch (error) {
//       console.error('Error downloading and merging video file:', error);
//       showMessage({
//         message: 'Error downloading and merging video file',
//         description: error.message,
//         type: 'danger',
//       });
//       return null;
//     }
//   }









// // export async function downloadhighVideo (url,metadata){

// //     try {
// //         // Fetch the video data from the YouTube server
// //         const response = await RNFetchBlob.config({
// //           fileCache: true,
// //           appendExt: 'mp4',
// //         }).fetch('GET', url);
    
// //         // Get the video file path
// //         const filePath = `${RNFS.DocumentDirectoryPath}/${metadata.substring(10, 30).split(' ').join('')}.mp4`;
    
// //         // Write the video data to the file
// //         await RNFS.writeFile(filePath, response.data, 'base64');
    
// //         console.log(`Video downloaded to ${filePath}`);
// //       } catch (error) {
// //         console.error(error);
// //       }

// //     // Get the video info
// //     // console.log(url)
// //     // const info = await ytdl.getInfo(url);
  
// //     // // Find the best video and audio streams
// //     // const video = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
// //     // const audio = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  
// //     // // Download the video and audio streams
// //     // const videoStream = ytdl.downloadFromInfo(info, { format: video });
// //     // const audioStream = ytdl.downloadFromInfo(info, { format: audio });
  
// //     // // Create a file to write the video and audio to
// //     // const filePath = `${RNFS.DocumentDirectoryPath}/${metadata.substring(10, 30).split(' ').join('')}.mp4`;
// //     // const fileStream = RNFS.createWriteStream(filePath);
  
// //     // // Write the video and audio streams to the file
// //     // videoStream.pipe(fileStream);
// //     // audioStream.pipe(fileStream);
  
// //     // // Wait for the streams to finish writing to the file
// //     // await new Promise(resolve => {
// //     //   videoStream.on('end', () => {
// //     //     console.log('Video stream ended');
// //     //     if (audioStream.destroyed) {
// //     //       resolve();
// //     //     }
// //     //   });
  
// //     //   audioStream.on('end', () => {
// //     //     console.log('Audio stream ended');
// //     //     if (videoStream.destroyed) {
// //     //       resolve();
// //     //     }
// //     //   });
// //     // });
  
// //     // console.log(`Video downloaded to ${filePath}`);
// //   };
  