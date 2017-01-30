import React, { Component } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import FacebookLogin from './FacebookLogin'
import MenuItem from './MenuItem'
import MenuLogin from './MenuLogin'
import MenuUser from './MenuUser'

/* REDUX */
var { connect } = require('react-redux');
var {
  toNoticias,
  toNosotros,
  toBiblia,
  toEstudio,
  toCreencias,
  toVersiculos,
  toOracion,
  toCalendario,
  toSamplePage,
  logOut,
} = require('../../actions');

class Menu extends Component {
  goToLogIn() {
    this.props.appnavigator.push({
      title: "Inicio de Sesión",
      name: 'LogIn',
      component: FacebookLogin,
      fromBottom: true,
    });
  }

  render() {
    const { container, welcome } = styles;

    var selected = false;
    if(this.props.nav.pantalla === 'noticias') {
      selected = true;
    }
    var noticias = (
      <MenuItem titulo="Noticias enciende" icon={{uri:'icon_noticias'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toNoticias();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'nosotros') {
      selected = true;
    }
    var nosotros = (
      <MenuItem titulo="¿Quienes somos?" icon={{uri:'icon_world'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toNosotros();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'estudio') {
      selected = true;
    }
    var estudio = (
      <MenuItem titulo="Estudio enciende" icon={{uri:'icon_class'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toEstudio();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'creencias') {
      selected = true;
    }
    var creencias = (
      <MenuItem titulo="Creencias adventistas" icon={{uri:'icon_church'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toCreencias();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'versiculos') {
      selected = true;
    }
    var versiculos = (
      <MenuItem titulo="Versículo del día" icon={{uri:'icon_sun'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toVersiculos();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'calendario') {
      selected = true;
    }
    var calendario = (
      <MenuItem titulo="Calendario" icon={{uri:'icon_calendar'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toCalendario();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'biblia') {
      selected = true;
    }
    var biblia = (
      <MenuItem titulo="Santa Biblia" icon={{uri:'icon_bible'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toBiblia();}}/>
    );

    selected = false;
    if(this.props.nav.pantalla === 'oracion') {
      selected = true;
    }
    var oracion = (
      <MenuItem titulo="Pedidos de oración" icon={{uri:'icon_heaven'}} selected={selected} action={() => {this.props.closeDrawer(); this.props.toOracion();}}/>
    );

    var cerrar = null;
    if(this.props.user.isRegistered) {
      cerrar = (<MenuItem titulo="Cerrar sesión" icon={{uri:'icon_logout'}}
                action={() => {
                  Alert.alert(
                    'Cerrar sesión',
                    '¿Estas seguro de cerrar sesión?',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => {this.props.toNoticias(); this.props.logOut(this.props.navigator);}},
                    ]
                  )
                }}
              />);
    }

    return (
      <View style={container}>
        <MenuLogin iglesia={this.props.app.iglesia} user={this.props.user} goToLogIn={ this.goToLogIn.bind(this) }/>
        <MenuUser iglesia={this.props.app.iglesia} user={this.props.user} goToLogIn={ this.goToLogIn.bind(this) }/>
        <ScrollView>
          {noticias}
          <View style={ styles.seccionTextContainer }>
            <Text style={ styles.seccionText }>Estudio</Text>
          </View>
          {estudio}
          {versiculos}
          <View style={ styles.seccionTextContainer }>
            <Text style={ styles.seccionText }>Información</Text>
          </View>
          {nosotros}
          {creencias}
          {calendario}
          <View style={ styles.seccionTextContainer }>
            <Text style={ styles.seccionText }>Comunión</Text>
          </View>
          {biblia}
          {oracion}
          {cerrar}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(36,40,51)',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  seccionText: {
    color: 'rgb(156,158,162)', fontSize: 13, },
  seccionTextContainer: {
    flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: 'rgb(29,30,37)',paddingHorizontal: 10, height: 20 },
};

function select(store) {
  return {
    nav: store.navReducer,
    app: store.appReducer,
    user: store.userReducer,
  };
}

function actions(dispatch) {
  return {
    toNoticias: () => dispatch(toNoticias()),
    toEstudio: () => dispatch(toEstudio()),
    toCreencias: () => dispatch(toCreencias()),
    toNosotros: () => dispatch(toNosotros()),
    toBiblia: () => dispatch(toBiblia()),
    toVersiculos: () => dispatch(toVersiculos()),
    toOracion: () => dispatch(toOracion()),
    toCalendario: () => dispatch(toCalendario()),
    toSamplePage: () => dispatch(toSamplePage()),
    logOut: () => dispatch(logOut()),
  };
}

module.exports = connect(select, actions)(Menu);
