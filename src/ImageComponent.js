import React from 'react';
import { View, Image } from 'react-native';

function ImageComponent ({ imageUrl }){
  return (
    <View style={{ borderWidth: 1, borderColor: 'rgb(132, 128, 19)', borderRadius: 10, margin: 10, padding: 10 }}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} />
      ) : (
        <View>
          {/* Render something else if there is no image URL */}
        </View>
      )}
    </View>
  );
};

export default ImageComponent;
