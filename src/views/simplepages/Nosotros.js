import React, { Component } from 'react'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'

var Header = require('../common/Header')
var SegmentoMapa = require('../common/SegmentoMapa')

class Nosotros extends Component {

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  openDirections() {
    var latitud = '39.13573795263808';
    var longitud = '-75.77022923518251';
    var platform = 'google';
    if(Platform.OS === 'ios') {
      platform = 'apple';
    }
    var directions = 'http://maps.' + platform + '.com/?daddr=' + latitud + ',' + longitud + '&dirflg=d&t=m'
    Linking.canOpenURL(directions).then(supported => {
      if (supported) {
        Linking.openURL(directions);
      } else {
        console.log('Don\'t know how to open URI: ' + directions);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="¿Quienes somos?"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.welcome}>Templeville Spanish SDA Church</Text>
          <Text style={styles.text}>Welcome to the Templeville Spanish SDA Church in Marydel, MD. We are a Christian community and would love to have you join our family. To learn more about what we believe you can visit our About Us page. Please join us for Bible study, worship, and prayer.</Text>
          <Text style={[styles.text, {color: 'rgb(75,32,127)'}]}>Services:</Text>
          <Text style={[styles.text, {marginVertical:0}]}>Sabath School 9:15 am</Text>
          <Text style={[styles.text, {marginVertical:0}]}>Worship Service 11:00 am</Text>
          <Text style={[styles.text,{color: 'rgb(75,32,127)',marginTop:20}]}>Address:</Text>
          <Text style={[styles.text, {marginVertical:0}]}>3703 Barclay Rd, Marydel, MD 21649-1147</Text>
          <TouchableOpacity onPress={() => this.handleClick('http://templevillespanishmd.adventistchurch.org/')}><Text style={[styles.text, {marginTop:20}]}>http://templevillespanishmd.adventistchurch.org/</Text></TouchableOpacity>
          <View style={{height:300, flex:1, marginTop:30}}>
            <SegmentoMapa  latitud={'39.13573795263808'} longitud={'-75.77022923518251'} titulo={"Templeville Spanish SDA Church"}/>
            <TouchableOpacity style={{position:'absolute', right:0}} onPress={() => this.openDirections()}>
              <View style={{backgroundColor:'rgba(255,255,255,0.85)', margin:5, borderRadius:4}}>
                <Image source={{uri:'route', width:30, height:30, marginTop:30, marginRight:30}}/>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgb(75,32,127)',
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: '#575a5c',
    margin: 10,
  },
});

module.exports = Nosotros
