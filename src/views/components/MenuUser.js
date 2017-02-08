import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'

class MenuUser extends Component {

  render() {
    var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
    const { button } = styles;

    var iglesia = this.props.iglesia
    if(iglesia==null || !this.props.user.isLoggedIn) {
      return null;
    }

    var userSection=null
    var infoRally = null
    if(this.props.user.isLoggedIn){
      var pictureUri = this.props.user.fbData.picture.data.url;
      pictureUri = 'https://graph.facebook.com/v2.6/' + this.props.user.fbData.id + '/picture?height=200&access_token=' + this.props.user.token;

      if (this.props.user.currentRally != null) {
        infoRally = (
          <View>
            <Text style={ styles.detailsText }>
              Rally {this.props.user.currentRally.grupo.rally.nombre}
            </Text>
            <Text style={ styles.detailsText }>
              Equipo: {this.props.user.currentRally.grupo.nombre}
            </Text>
            <Text style={ styles.detailsText }>
              Playera: {this.props.user.userData.tallaPlayera}
            </Text>
          </View>
        );
      }

      userSection=(
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom:20 }}>
          <Image source={{ uri: pictureUri }} style={ styles.profilePic }/>
            <View>
              <Text style={ styles.nameText }>{this.props.user.userData.nombre}</Text>
              {infoRally}
            </View>
        </View>
      );
    }

    return (
      <View style={{paddingTop: STATUS_BAR_HEIGHT, backgroundColor: 'rgb(29,30,37)'}}>
        <Text style={{color:'white', textAlign:'center', fontSize:16, paddingTop: 20}}>
          {iglesia.nombre}
        </Text>
        {userSection}
      </View>
    );
  }
}

const styles = {
  button: {
    padding:10, width:200, borderRadius:4 ,marginTop:10, marginHorizontal:4, backgroundColor:'white'},
  profilePic: {
    resizeMode: Image.resizeMode.contain, height: 60, width: 60, margin: 10, borderRadius: 30 },
  nameText: {
    color: 'rgb(240,242,245)', fontSize: 16, },
  detailsText: {
    color: 'rgb(156,158,162)', fontSize: 10 },
}

module.exports = MenuUser
