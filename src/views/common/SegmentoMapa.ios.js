import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import MapView from 'react-native-maps'
import CustomCallout from './CustomCallout';

class SegmentoMapa extends Component {
  constructor(props){
    super(props);
  }

  render() {
    var lat = parseFloat(this.props.latitud);
    var lon = parseFloat(this.props.longitud);

    return (
      <MapView
        style={ styles.map }
        showsUserLocation={true}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
            animateDrop: true,
            draggable: false
          }}
          title={this.props.titulo}/>
      </MapView>
    );
  }
}

class ChurchIcon extends Component {
  render() {
    return (
      <View>
        <Image source={{uri:'church'}} style={{width:30, height:30, resizeMode:'contain'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    flex: 1, fontWeight: '200', fontSize: 25, marginTop: 15,
  },
  texto: {
    flex: 1, color: 'gray', fontWeight: '200', fontSize: 17, marginTop: 5,
  },
  map: {
    flex: 1
  },
});

module.exports = SegmentoMapa;
