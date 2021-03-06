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
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/common/Header'
var moment = require('moment')
var esLocale = require('moment/locale/es')

class NoticiaDetalle extends Component {

  render() {
    var width = Dimensions.get('window').height;
    var height = width / 3;
    var noticia = this.props.noticia;
    var fecha = new Date(noticia.fecha.iso);
    var fechaStr = moment(fecha).locale("es", esLocale).format('LL');
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={noticia.titulo}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: {uri:'back'},
            onPress: this.props.navigator.pop,
          }}/>
        <View>
          <Text style={styles.newscontainerTitulo}>{noticia.titulo}</Text>
          <Text style={styles.newscontainerResumen}>{noticia.resumen}</Text>
          <Text style={styles.newscontainerDate}>{fechaStr}</Text>
          <View style={styles.bar}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imagenContainer}>
            <Image style={ [styles.imagen, { height: height, width: width }] } source={{ uri: noticia.imagen.url }}>
              <LinearGradient
                locations={[0.5,1]}
                colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)',]}
                style={{backgroundColor: 'rgba(0,0,0,0)', height: height }}>
              </LinearGradient>
            </Image>
          </View>

          <Text style={styles.newscontainerTexto}>{noticia.noticia}</Text>
          <View style={{height:35}}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newscontainerTitulo: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'left',
    fontSize: 13,
    marginHorizontal:10
  },
  newscontainerResumen: {
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 20,
    marginHorizontal:10
  },
  newscontainerDate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#a6a6a6',
    marginHorizontal:10
  },
  bar: {
    borderColor: '#d9d9d9',
    borderTopWidth: 2,
    marginTop: 5
  },
  imagenContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imagen: {
    resizeMode: Image.resizeMode.cover,
    flex: 1,
  },
  newscontainerTexto: {
    marginVertical: 10,
    fontSize: 13,
    fontWeight: '300',
    marginHorizontal:10
  },
})

module.exports = NoticiaDetalle
