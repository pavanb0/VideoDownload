import React from "react"
import {
    View, Text, Modal, TouchableOpacity,
    TextInput, ToastAndroid, ScrollView, Share,
    ActivityIndicator,
    Image, Dimensions,Linking,
} from "react-native"
import styles from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native";
import ytdl from 'react-native-ytdl';
import { DownloadAudio, getInfo, DownloadHighestVideo, DownloadMediumVideo } from "./Download";
import ImageComponent from './ImageComponent';
import {downloadAudio} from "./DownloadAudio";

const MusicPlayer = () => {
    const [visible, setVisible] = React.useState(false);
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

    function AudioDownloadComponent(props){
        if (props != null || props != undefined || props != '') {
            return (


                <View style={{

                    borderWidth: loading ? 0 : 1, borderColor: color ,
                    width: loading ? '50%' : '95%',
                    borderRadius: 10, margin: 10, padding: 10,
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', display: started ? 'flex' : 'none'
                }}>
                    <Text style={{color: 'rgb(237, 153, 28)', fontSize: 13,   width: '80%'}}>
                        Download in Audio Format <Ionicons name="musical-notes-outline" size={20} color={'pink'}/> {'\n'}{'\n'}
                        {metadata.substring(0, 30)+'...'} 


                    </Text>

                    <TouchableOpacity 
                    style={{display: loading? 'none':'flex', flexDirection: 'row',
                     justifyContent: 'space-between', alignItems: 'flex-end', margin: 10}}
                    
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

    function HighVideodownloadComponent(url){
        return(
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10}}>

        {url ? (
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <Text>Open Download Link</Text>
        </TouchableOpacity>
      ) : null}
            </View>
        )
    }

    function LowVideodownloadComponent(props){

    }

   
    function ImageComponent(imageUrl) {

        if (imageUrl != null || imageUrl != undefined || imageUrl != '' || started == false) {
            // setStarted(true);
            return (
                <View style={{
                    borderWidth: loading ? 0 : 1, borderColor: color ,
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

    function showInfo(props){
        if (props == null || props == undefined || props == ''){
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'
                    ,display:started?'none':'flex'}}>
                    <Text style={{color:'rgb(237, 153, 28)', fontSize:20}}>
                    On Mobile Devices: {'\n'}
                      • Open the YouTube app on your mobile device. {'\n'}
                      • Find the video you want to copy the URL for.{'\n'}
                      • Tap on the video to open it.{'\n'}
                      • Tap on the Share button below the video.{'\n'}
                      • Tap on the Copy link option. This will copy the video URL to your clipboard.{'\n'}
                      {'\n'}{'\n'}
                    On Web Devices: {'\n'}

                      • Open the YouTube website in your web browser.{'\n'}
                      • Find the video you want to copy the URL for.{'\n'}
                      • Click on the video to start playing it.{'\n'}
                      • Click on the Share button below the video.{'\n'}
                      • Click on the Copy button next to the video URL. This will copy the video URL to your clipboard.{'\n'}{'\n'}
                      • Note: The Share button on YouTube may be represented by different icons or labels depending on your device or browser.{'\n'}
                    </Text>
                </View>
            )
        }
    }

    const shareApp = () => {
        Share.share({
            message: 'Check out this awesome app!',
            url: 'com.portControl.myapp',
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

    const handleHide = () => {
        setVisible(false);
    };
    const downloadVideo = async (videoUrl) => {
        try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            // do something with the downloadUrl, such as displaying it in a WebView or opening it in a media player
        } catch (error) {
            console.log(error);
        }
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
                                style={{ width: '80%', borderWidth: 1, borderColor: color,
                                 borderRadius: 10, margin: 10, padding: 10 }}
                                // style={styles.input}
                                placeholder="Enter URL"
                                placeholderTextColor="rgb(237, 153, 28)"
                                color="rgb(66, 203, 165)"

                                onChangeText={(text) => setUrl(text)}
                                onSubmitEditing={async() => {
                                    let audiolink = await DownloadAudio(url)
                                    setAudioLink(audiolink);
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
                                        // console.log(audiolink);
                                        setAudioLink(audiolink);
                                         let info = await getInfo(url);
                                        setUrl(" " + String(info[0]) + " " + String(info[1]) + " " + String(info[2]) + " " + String(info[3]));
                                        setMetadata(info[0] + '\n' + info[3])
                                        setImage(info[1]);
                                      

                                    } catch (err) {
                                        ToastAndroid.show(String(err)+'🙃', ToastAndroid.SHORT);
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
                        ToastAndroid.show("Play", ToastAndroid.SHORT);
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
                </View>
            </View>
        </SafeAreaView>

    );
}
export default MusicPlayer

