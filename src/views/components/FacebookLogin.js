import React, {Component} from 'react';
import {
  TouchableHighlight,
  TextInput,
  Image,
  StyleSheet,
  AsyncStorage,
  Platform,
  Text,
  View
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {TextN, normalize} from './common/Text';
import FitImage from './common/FitImage'
import Header from './common/Header'
import Loader from './common/Loader'

/* REDUX */
import type {State as User} from '../../reducers/user';
var { connect } = require('react-redux');
var {
  logIn,
  registerUser,
} = require('../../actions');
type Props = {
  user: User;
  logIn: () => void;
  registerUser: () => void;
};

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: '',
    };
  }

  _onInputTextChanged(event) {
    this.setState({ userCode: event.nativeEvent.text });
  }

  componentDidUpdate() {
    if(this.props.user.isLoggedIn && !this.props.user.isFetching) {
      this.props.appnavigator.pop();
      if(typeof this.props.callback != 'undefined') {
        this.props.callback()
      }
    }
  }

  render() {
    var registerButton;

    var loginSection;
    if(!this.props.user.isLoggedIn && !this.props.user.isFetching) {
      var error = null;
      if(this.props.user.error!=null) {
        error = (
          <View style={{marginTop:20}}>
            <Text style={[ styles.texto, { fontSize: 13 }]}>
              Ocurrió un error al iniciar sesión: {this.props.user.error}
            </Text>
            <Text style={[ styles.texto, { fontSize: 13 }]}>
              Por favor inténtalo nuevamente
            </Text>
          </View>
        );
      }
      // Pantalla de log in con facebook
      loginSection = (
      <View style={styles.centerAlign}>
        <Text style={[ styles.texto, { fontSize: 26 }]}>
          ¡Bienvenido!
        </Text>
        <Text style={[ styles.texto, { fontSize: 16 }]}>
          Inicia sesión para conocer más sobre el Rally Enciende 2016. Descubre noticias y entérate de los próximos eventos.
        </Text>
        {error}
        <TouchableHighlight style={ styles.button } onPress={() => this.props.logIn()}
          underlayColor='#99d9f4'>
          <View style={ styles.botonFacebook }>
            <Image source={{uri:'flogo'}} style={ styles.logoFacebook }/>
            <Text style={[ styles.buttonText, { fontSize: 13, fontWeight: '800', marginLeft: 10 } ]}>
              INICIAR SESIÓN CON FACEBOOK
            </Text>
          </View>
        </TouchableHighlight>
      </View>);
    } else if (this.props.user.isLoggedIn && !this.props.user.isFetching) {
      // Pantalla de registro de código
      if(!this.props.user.isRegistered && false) {
        loginSection = (
          <View style={[ styles.centerAlign ]}>
            <Text style={[ styles.texto, { fontSize: 16 }]}>
              Ahora ingresa el código que te fue asignado por correo electrónico cuando te inscribiste al rally.
              Si no tienes código, contáctanos para asignarte uno.
            </Text>
            <View style={ styles.input }>
              <TextInput placeholder='ID' onChange={this._onInputTextChanged.bind(this)} autoCapitalize='characters'
                underlineColorAndroid='rgba(0,0,0,0)' style={{height: 35, width: 80, borderColor:'#cccccc',borderWidth: 1,borderRadius: 4, padding:7}}/>
            </View>
          </View>
        );
        registerButton = (
          <TouchableHighlight style={ styles.button } onPress={() => this.props.registerUser(this.props.user, this.state.userCode)}
            underlayColor='#99d9f4'>
            <View style={{flexDirection: 'row'}}>
              <Text style={[ styles.buttonText, { fontSize: 18, fontWeight: '800' } ]}>
                REGISTRAR
              </Text>
            </View>
          </TouchableHighlight>
        );
      } else {
        // El usuario ya inició sesión
        loginSection = (
          <View style={[ styles.centerAlign ]}>
            <Text style={[ styles.texto, { fontSize: 26 }]}>
              ¡Bienvenido!</Text>
          </View>
        );
      }
    } else {
      // Loader
      loginSection = (
        <View style={[ styles.centerAlign ]}>
          <Loader/>
        </View>
      );
    }

    return (
      <View style={ styles.mainContainer}>
        <View style={ styles.container }>
          <FitImage source={{uri:'loginbg'}} style={ styles.mainContainer }
            content={
              <View style={{flex: 1}}>
                <View style={{flex: 5}}>
                  <Header
                    title="Iniciar sesión"
                    style={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    leftItem={{
                      layout: 'icon',
                      iconstyle: { height: 15, width: 15 },
                      title: 'Menu',
                      icon: {uri:'x'},
                      onPress: this.props.appnavigator.pop,
                    }}/>
                  <View style={{ alignItems: 'center', flex:1, justifyContent:'center', marginTop: -10}}>
                    <Image source={{uri:'logo_letras'}} style={styles.logo}/>
                  </View>
                </View>
                <View style={{flex: 4}}>
                  {loginSection}
                </View>
                <KeyboardSpacer />
                {registerButton}
              </View>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, flexWrap: 'wrap', alignSelf: 'stretch', overflow: 'hidden',
  },
  container: {
    flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'stretch',
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: Image.resizeMode.contain,
  },
  logoFacebook: {
    width: 20, height: 15, resizeMode: Image.resizeMode.contain,
  },
  texto: {
    marginHorizontal: 30, color: 'white', backgroundColor: 'rgba(0,0,0,0)', textAlign: 'center'
  },
  input: {
    backgroundColor: 'white', marginTop: 20, backgroundColor: 'white', borderRadius: 5,
  },
  botonFacebook: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 5
  },
  centerAlign: {
    flex: 2, alignItems: 'center',
  },
  buttonText: {
    color:'white', textAlign: 'center', marginLeft: 10, marginVertical: 5
  },
  button: {
    backgroundColor: 'rgb(59,89,152)', borderRadius: 5, alignItems: 'center', height: 40, left: 30, right: 30, bottom: 30, position: 'absolute'
  },
});


function select(store) {
  return {
    user: store.userReducer,
  };
}

function actions(dispatch) {
  return {
    logIn: () => dispatch(logIn()),
    registerUser: (user, appToken) => dispatch(registerUser(user, appToken)),
  };
}

module.exports = connect(select, actions)(FacebookLogin);
