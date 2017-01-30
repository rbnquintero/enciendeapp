import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Header from '../components/common/Header'
var moment = require('moment')
var esLocale = require('moment/locale/es')

var FitImage = require('../components/common/FitImage');
import LinearGradient from 'react-native-linear-gradient';

class EstudioListaTemasTema extends Component {

  render() {
    var width = Dimensions.get('window').height;
    var height = width / 3;
    var tema = this.props.tema;
    var fecha = new Date(tema.fecha.iso);
    var fechaStr = moment(fecha).locale("es", esLocale).format('LL');
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={tema.nombre}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: {uri:'back'},
            onPress: this.props.navigator.pop,
          }}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <FitImage source={{uri: tema.serie.imagen.url}} style={styles.newscontainer}
              ref={component => this._root = component} {...this.props} content={
              <LinearGradient
                locations={[0,0.6]}
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)',]}
                style={{backgroundColor: 'rgba(0,0,0,0)', paddingHorizontal: 20}}>
                <Text style={styles.newscontainerTitulo}>{tema.nombre}</Text>
                <Text style={styles.newscontainerResumen}>{tema.resumen}</Text>
                <Text style={styles.newscontainerDate}>{fechaStr}</Text>
              </LinearGradient>
            }/>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.newscontainerTexto}>{tema.serie.introduccion}</Text>
            <View style={{height:35}}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newscontainerTitulo: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'left',
    fontSize: 13,
  },
  newscontainerResumen: {
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 20,
  },
  newscontainerDate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#a6a6a6',
  },
  bar: {
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 25,
  },
  imagenContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imagen: {
    resizeMode: Image.resizeMode.contain,
  },
  newscontainerTexto: {
    marginVertical: 25,
    fontSize: 13,
    fontWeight: '300'
  },
})

module.exports = EstudioListaTemasTema
