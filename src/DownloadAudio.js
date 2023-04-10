import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export async function downloadAudio(url,title) {
    console.log(url);
  const fileName = `${title.substring(10, 30).split(' ').join('')}.mp3`;
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
      description: 'Downloading audio file',
      mime: 'audio/mpeg',
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
    console.error('Error downloading audio file:', error);
    showMessage({
      message: 'Error downloading audio file',
      description: error.message,
      type: 'danger',
    });
    return null;
  }

  return downloadDest;
}
