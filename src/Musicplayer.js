import React from "react"
import {
    View, Text, Modal, TouchableOpacity,
    TextInput, ToastAndroid, ScrollView, Share,
    ActivityIndicator,TouchableWithoutFeedback,
    Image, Dimensions, Linking, Alert,
} from "react-native"
import styles from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native";
import ytdl from 'react-native-ytdl';
import { DownloadAudio, getInfo, DownloadHighestVideo, DownloadMediumVideo } from "./Download";
import ImageComponent from './ImageComponent';
import { downloadAudio } from "./DownloadAudio";
import { downloadAndMergeVideo } from './HighVideoDownload'


const MusicPlayer = () => {
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [scr, setScreen] = React.useState(true);
    let [loading, setLoading] = React.useState(false);
    let [url, setUrl] = React.useState('');
    let [value, setValue] = React.useState('');
    let [metadata, setMetadata] = React.useState('')
    let [image, setImage] = React.useState('')
    const { width, height } = Dimensions.get('window');
    const color = 'rgb(132, 128, 190)';
    let [started, setStarted] = React.useState(false);
    const [downloadUrl, setDownloadUrl] = React.useState('');
    const [AudioLink, setAudioLink] = React.useState('');
    let [hdVideolink,setHDVideoLink] = React.useState('');
    function AudioDownloadComponent(props) {
        if (props != null || props != undefined || props != '') {
            return (


                <View style={{

                    borderWidth: loading ? 0 : 1, borderColor: color,
                    width: loading ? '50%' : '95%',
                    borderRadius: 10, margin: 10, padding: 10,
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', display: started ? 'flex' : 'none'
                }}>
                    <Text style={{
                        color: 'rgb(237, 153, 28)', fontSize: 13,
                        display: loading ? 'none' : 'flex', width: '80%'
                    }}>
                        Download in Audio Format <Ionicons name="musical-notes-outline" size={20} color={'pink'} /> {'\n'}{'\n'}
                        {metadata.substring(0, 30) + '...'}
                    </Text>

                    <TouchableOpacity
                        style={{
                            display: loading ? 'none' : 'flex', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'flex-end', margin: 10
                        }}

                        onPress={async () => {
                            await downloadAudio(AudioLink, metadata)
                                .then((downloadPath) => {
                                    console.log(`Audio file downloaded to: ${downloadPath}`);
                                })
                                .catch((error) => {
                                    console.error('Error downloading audio file:', error);
                                });
                        }}>
                        <Ionicons name="download-outline" size={30} color="rgb(215, 7, 158)" />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    // function HighVideoDownloadComponent(url){
    //     return(
    //         <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10}}>

    //     {url ? (
    //     <TouchableOpacity onPress={() => Linking.openURL(url)}>
    //       <Text>Open Download Link</Text>
    //     </TouchableOpacity>
    //   ) : null}
    //         </View>
    //     )
    // }
    function HighVideoDownloadComponent(props) {
        if (props != null || props != undefined || props != '') {
            return (
                <View style={{

                    borderWidth: loading ? 0 : 1, borderColor: color,
                    width: loading ? '50%' : '95%',
                    borderRadius: 10, margin: 10, padding: 10,
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', display: started ? 'flex' : 'none'
                }}>
                    <Text style={{
                        color: 'rgb(237, 153, 28)', fontSize: 13,
                        display: loading ? 'none' : 'flex', width: '80%'
                    }}>
                        Download in Video Format{' '}
                        <Ionicons name="videocam-outline" size={20} color={'pink'} /> 
                        
                        {'\n'}{'\n'}
                        {metadata.substring(0, 30) + '...'}
                    </Text>
                    <TouchableOpacity
                        style={{
                            display: loading ? 'none' : 'flex', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'flex-end', margin: 10
                        }}

                        onPress={async () => {
                          console.log('hdVideolink',hdVideolink)
                          console.log('audiolink',AudioLink)
                          await downloadAndMergeVideo(hdVideolink, metadata)
                          .then((downloadPath) => {
                              console.log(`Audio file downloaded to: ${downloadPath}`);
                          })
                          .catch((error) => {
                              console.error('Error downloading audio file:', error);
                          });
                          //   downloadAndMergeVideo(AudioLink, hdVideolink, metadata)
                        //   .then((downloadedFiles) => {
                        //     console.log('Downloaded files:', downloadedFiles);
                        //   })
                        //   .catch((error) => {
                        //     console.error('Error downloading audio and video:', error);
                        //   });
                        }}>
                        <Ionicons name="download-outline" size={30} color="rgb(215, 7, 158)" />
                    </TouchableOpacity>

                </View>
            )

        }
    }

    function LowVideodownloadComponent(props) {

    }


    function ImageComponent(imageUrl) {

        if (imageUrl != null || imageUrl != undefined || imageUrl != '' || started == false) {
            // setStarted(true);
            return (
                <View style={{
                    borderWidth: loading ? 0 : 1, borderColor: color,
                    width: loading ? '50%' : '95%',
                    borderRadius: 10, margin: 10, padding: 10,
                    flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', display: started ? 'flex' : 'none'
                }}>
                    <ActivityIndicator
                        size='large'
                        color={'rgb(237, 153, 28)'}
                        animating={loading}
                        display={loading ? 'flex' : 'none'}
                    />
                    <Image
                        display={loading ? 'none' : 'flex'}
                        resizeMethod="scale"
                        resizeMode="contain"
                        style={{ width: width / 1.2, height: height / 5, borderRadius: 10 }}
                        source={{ uri: imageUrl }} />

                    <Text
                        style={{
                            color: 'rgb(237, 153, 28)', fontSize: 15,
                            display: loading ? 'none' : 'flex',
                            fontWeight: 'normal', marginTop: 10
                        }}
                    >
                        {metadata}
                    </Text>
                </View>
            )
        }

    };

    function showInfo(props) {
        if (props == null || props == undefined || props == '') {
            return (
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center'
                    , display: started ? 'none' : 'flex'
                }}>
                    <Text style={{ color: 'rgb(237, 153, 28)', fontSize: 20 }}>
                        From Youtube App: {'\n'}
                        <Text style={{ color: 'rgb(200, 250, 200)', fontSize: 17 }}>
                            • Open the YouTube app on your mobile device. {'\n'}
                            • Find the video you want to copy the URL for.{'\n'}
                            • Tap on the video to open it.{'\n'}
                            • Tap on the Share button below the video.{'\n'}
                            • Tap on the Copy link option. This will copy the video URL to your clipboard.{'\n'}
                            {'\n'}{'\n'}
                        </Text>
                        From Web : {'\n'}
                        <Text style={{ color: 'rgb(200, 250, 200)', fontSize: 17 }}>
                            • Open the YouTube website in your web browser.{'\n'}
                            • Find the video you want to copy the URL for.{'\n'}
                            • Click on the video to start playing it.{'\n'}
                            • Click on the Share button below the video.{'\n'}
                            • Click on the Copy button next to the video URL. This will copy the video URL to your clipboard.{'\n'}{'\n'}
                            • Note: The Share button on YouTube may be represented by different icons or labels depending on your device or browser.{'\n'}
                        </Text>
                    </Text>
                </View>
            )
        }
    }

    const shareApp = () => {
        Share.share({
            message: 'Check out this awesome app! https://github.com/pavanb0/VideoDownload',
            url: 'https://github.com/pavanb0/VideoDownload',
            title: 'My App',
        })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handlePress = () => {
        setVisible(true);
    };
    const handlePresssocial = () => {
        setModalVisible(true);
    };

    const handleHide = () => {
        setVisible(false);
    };
    const handleHidesocial = () => {
        setModalVisible(false);
    };

  


    function views(props) {
        if (props) {
            return (
                <>


                    <View style={styles.downloaparent}>

                        <View style={styles.topText}>
                            <Text style={{
                                color: 'rgb(97, 218, 251)',
                                fontSize: 15, fontWeight: 'normal'
                            }}>
                                Download Anything From Youtube/Instagram 🔥
                            </Text>
                        </View>


                        <View style={styles.downloadchild}>
                            <TextInput
                                style={{
                                    width: '80%', borderWidth: 1, borderColor: color,
                                    borderRadius: 10, margin: 10, padding: 10
                                }}
                                // style={styles.input}
                                placeholder="Enter URL"
                                placeholderTextColor="rgb(237, 153, 28)"
                                color="rgb(66, 203, 165)"

                                onChangeText={(text) => setUrl(text)}
                                onSubmitEditing={async () => {
                                    let audiolink = await DownloadAudio(url)
                                    setAudioLink(audiolink);
                                    let videolink = await DownloadHighestVideo(url)
                                    setHDVideoLink(videolink);
                                    // let HighVideoLink = await DownloadHighestVideo(url)
                                    // let LowVideoLink = await DownloadHighestVideo(url)
                                    // console.log( AudioLink);
                                }}
                            />

                            <TouchableOpacity style={styles.searchicon}
                                onPress={async () => {
                                    try {
                                        setStarted(true);
                                        setLoading(true);
                                        let audiolink = await DownloadAudio(url);
                                        setAudioLink(audiolink);
                                        let videolink = await DownloadHighestVideo(url)
                                        setHDVideoLink(videolink);
                                        let info = await getInfo(url);
                                        setMetadata(info[0] + '\n' + info[3])
                                        setImage(info[1]);


                                    } catch (err) {
                                        ToastAndroid.show(String(err) + '🙃', ToastAndroid.SHORT);
                                        console.log(err);

                                    }
                                    finally {
                                        setLoading(false);
                                    }
                                    // let info = await ytdl.getInfo(String(url));
                                    // let urls = await ytdl(String(url), { quality: 'highestaudio' });
                                    // let title = info.videoDetails.title;
                                    // urls = String(urls);
                                    // console.log(urls);
                                    // console.log(title);
                                    // setUrl(title);

                                }}
                            >
                                <Ionicons
                                    name="search-outline"
                                    color={'rgb(237, 153, 28)'}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>

                            {showInfo(image)}
                            {/* {()=>{ if(image == null || image == undefined || image == ''){
                            ImageComponent(image)}}} */}
                            {ImageComponent(image)}
                            {AudioDownloadComponent(AudioLink)}
                            {HighVideoDownloadComponent("")}
                            {/* {HighVideodownloadComponent(downloadUrl)} */}
                            {/* {LowVideodownloadComponent(LowVideoLink)}     */}



                            {/* {ImageComponent(image)}
                            {ImageComponent(image)} */}
                            {/* 
                            <View style={{ borderWidth: 1, borderColor: color, borderRadius: 10, margin: 10, padding: 10 }}>
                                <ActivityIndicator
                                    size="large"
                                    color={'rgb(237, 153, 28)'}
                                    animating={loading}
                                />
                                <Text style={{ color: 'rgb(237, 153, 28)' }}>
                                    {url}
                                </Text>
                            </View> */}

                            {/* {ImageComponent(image)} */}
                        </ScrollView>

                    </View>
                </>
            )
        } else {
            return (
                <View>
                    <Text>
                        Music
                    </Text>
                </View>
            )
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topbar}>
                {views(scr)}
                {/* {() => { setStarted(true) }} */}
            </View>

            {/* bottom static part */}

            <View style={styles.bottombar}>

                <View style={styles.bottombuttons}>
                    <TouchableOpacity onPress={() => {
                        handlePresssocial();
                    }}>
                        <Ionicons
                            name="heart-outline"
                            color={'rgb(237, 153, 28)'}
                            size={35}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        ToastAndroid.show("Pause", ToastAndroid.SHORT);
                    }}>
                        <Ionicons
                            name="repeat-outline"
                            color={'rgb(237, 153, 28)'}
                            size={35}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        shareApp();
                    }}>
                        <Ionicons
                            name="share-social-outline"
                            color={'rgb(237, 153, 28)'}
                            size={35}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handlePress();
                        ToastAndroid.show("Play", ToastAndroid.SHORT);
                    }}>
                        <Ionicons
                            name="ellipsis-horizontal-outline"
                            color={'rgb(237, 153, 28)'}
                            size={35}
                        />
                    </TouchableOpacity>

                    <Modal visible={visible} animationType="slide" transparent={true}>
                        <TouchableOpacity style={styles.overlay} onPress={handleHide}>
                            <View style={styles.menu}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setScreen(false)
                                    }}
                                >
                                    <Text style={styles.item}>Music</Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => {
                                    ToastAndroid.show('Download', ToastAndroid.SHORT)
                                    setScreen(true)
                                }}>

                                    <Text style={styles.item}>Download</Text>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                    <Modal visible={modalVisible} animationType="slide" transparent={true}>
                        <TouchableOpacity style={
                            {
                                flex: 1,
                                // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                justifyContent: 'flex-end',
                                alignItems:'flex-start',
                                marginRight: width/30,
                                marginBottom: 45,
                            }
                        } onPress={handleHidesocial}>
                            <View style={styles.menu}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL('https://github.com/pavanb0/').catch((err)=> Alert.alert('Error',String(err)))

                                    }}
                                >
                                    <Text style={styles.item}>Follow me on github </Text>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={() => {
                                   Linking.openURL('https://www.instagram.com/pavanbagwe/').catch((err)=> Alert.alert('Error',String(err)))
                                }}>

                                    <Text style={styles.item}>follow me on Instagram</Text>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    
                </View>
            </View>
        </SafeAreaView>

    );
}
export default MusicPlayer

