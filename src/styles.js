

import {StyleSheet, Dimensions

} from 'react-native';

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(33, 39, 48)',
        
    },


    topbar:{
      backgroundColor:'rgb(15, 15, 15)',
      flex:1,
      alignItems:'center',
      // justifyContent:'center',
    },


    bottombar:{
      
      width:width,
      height:height/15,
      alignItems:'center',
      justifyContent:'center',
      borderTopWidth:1,
      borderColor:'rgb(7, 233, 241)',
      backgroundColor:'rgb(15, 15, 15)',
   
    },

    bottombuttons:{
    justifyContent:'space-between',
    width:'80%',
    flexDirection:'row',
    
    }
    ,
    overlay: {
      flex: 1,
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: width/30,
      marginBottom: 45,
    },
    menu: {
      backgroundColor: 'rgb(31, 37, 46)',
      padding: 20,
      borderRadius: 10,
    },
    item: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'rgb(237, 153, 28)',
      marginVertical: 10,
    },
    downloaparent:{
      
      width:width,
      marginTop:height/60,
      height:height,

      alignItems:'center',
      // justifyContent:'center',
      backgroundColor:'rgb(15, 15, 15)',
    },
    downloadchild:{

      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:width/1.05,
      height:height/15,
      backgroundColor:'rgb(40, 40, 34)',
      zIndex:1
    },  
    searchicon:{
      position:'absolute',
      right:width/30,
    },
    topText:{
      marginBottom:10
      // marginTop:50,
      // height:height/15,
    
    },


  });
export default styles;  