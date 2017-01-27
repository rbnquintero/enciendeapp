import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

class MenuLogin extends Component {
  render() {
    const { button } = styles;

    var iglesia = this.props.iglesia
    if(iglesia==null) {
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
      <View style={{flexDirection:'row'}}>
        <View style={{backgroundColor:'rgb(75,32,127)', flex:1, paddingVertical:20, alignItems:'center'}}>
          <View style={{alignItems:'center', marginVertical:10}}>
            <Image source={{uri:'logo'}} style={{resizeMode:'contain', height:90, width:90}}/>
          </View>
          <Text style={{color:'white', textAlign:'center', fontSize:16}}>
            {iglesia.nombre}
          </Text>
          {loginSection}
        </View>
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
