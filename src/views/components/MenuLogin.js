import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'

class MenuLogin extends Component {
  render() {
    var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
    const { button } = styles;

    var iglesia = this.props.iglesia
    if(iglesia==null || this.props.user.isLoggedIn) {
      return null;
    }
    var loginSection = null
    if(iglesia.tieneLogin) {
      loginSection = (
        <TouchableOpacity onPress={() => this.props.goToLogIn()} style={ button }>
          <Text style={{textAlign:'center'}}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={{paddingVertical: STATUS_BAR_HEIGHT, alignItems:'center', backgroundColor: 'rgb(29,30,37)'}}>
        <View style={{alignItems:'center', marginVertical:10}}>
          <Image source={{uri:'logo'}} style={{resizeMode:'contain', height:90, width:90}}/>
        </View>
        <Text style={{color:'white', textAlign:'center', fontSize:16}}>
          {iglesia.nombre}
        </Text>
        {loginSection}
      </View>
    );
  }
}

const styles = {
  button: {
    padding:10, width:200, borderRadius:4 ,marginTop:10, marginHorizontal:4, backgroundColor:'white'
  }
}

module.exports = MenuLogin
