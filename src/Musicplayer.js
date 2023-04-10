import React from "react"
import {
    View, Text, Modal, TouchableOpacity,
    TextInput, ToastAndroid, ScrollView, Share,
    ActivityIndicator,
    Image, Dimensions,
} from "react-native"
import styles from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native";
import ytdl from 'react-native-ytdl';
import { Download, getInfo } from "./Download";
import ImageComponent from './ImageComponent';


const MusicPlayer = () => {
    const [visible, setVisible] = React.useState(false);
    const [scr, setScreen] = React.useState(true);
    let [loading, setLoading] = React.useState(false);
    let [url, setUrl] = React.useState('');
    let [value, setValue] = React.useState('');
    let [metadata, setMetadata] = React.useState('')
    let [image, setImage] = React.useState('')
    const { width, height } = Dimensions.get('window');


    function ImageComponent(imageUrl) {

        if (imageUrl != null || !imageUrl != undefined || imageUrl != '') {
            return (
                <View style={{
                    borderWidth: 1, borderColor: 'rgb(132, 128, 19)',
                    borderRadius: 10, margin: 10, padding: 10,
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
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
                            style={{ color: 'rgb(237, 153, 28)', fontSize: 15,
                            display: loading ? 'none' : 'flex',
                            fontWeight: 'normal', marginTop: 10 }}
                        >
                            {metadata}
                        </Text>
                </View>
            )
        }

    };


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
                                style={{ width: '80%', borderWidth: 1, borderColor: 'rgb(132, 128, 19)', borderRadius: 10, margin: 10, padding: 10 }}
                                // style={styles.input}
                                placeholder="Enter URL"
                                placeholderTextColor="rgb(237, 153, 28)"
                                color="rgb(66, 203, 165)"

                                onChangeText={(text) => setUrl(text)}
                                onSubmitEditing={() => {

                                }}
                            />

                            <TouchableOpacity style={styles.searchicon}
                                onPress={async () => {
                                    try {
                                        setLoading(true);
                                        let result = await Download(url);
                                        let info = await getInfo(url);
                                        setUrl(" " + String(info[0]) + " " + String(info[1]) + " " + String(info[2]) + " " + String(info[3]));
                                        // setUrl(result);
                                        setMetadata(info[0] + '\n' + info[3])
                                        setImage(info[1]);
                                        console.log(info[1]);

                                    } catch (err) {
                                        ToastAndroid.show("Error", ToastAndroid.SHORT);
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


                            <View style={{ borderWidth: 1, borderColor: 'rgb(132, 128, 19)', borderRadius: 10, margin: 10, padding: 10 }}>
                                <ActivityIndicator
                                    size="large"
                                    color={'rgb(237, 153, 28)'}
                                    animating={loading}
                                />
                                <Text style={{ color: 'rgb(237, 153, 28)' }}>
                                    {url}
                                </Text>
                            </View>

                            {ImageComponent(image)}
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

