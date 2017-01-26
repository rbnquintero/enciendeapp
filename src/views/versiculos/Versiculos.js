import React, { Component } from 'react'
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'

var Loader = require('../common/Loader')
var VersiculoCard = require('./VersiculoCard')

/* REDUX */
var { connect } = require('react-redux');
var {
  loadVersiculos,
  fbRendered,
} = require('../../actions');

var Header = require('../common/Header')
class Versiculos extends Component {
  componentWillMount() {
    this.props.loadVersiculos();
  }

  render() {
    var _this = this
    var list = null
    if(this.props.fb.versiculos != null) {
      list = (
        <ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.props.fb.isFetching}
              onRefresh={this.props.loadVersiculos}
              tintColor='rgba(255,255,255,0.7)'
            />
          }>
          {this.props.fb.versiculos.map(function(result, id){
            return (
              <VersiculoCard key={id} data={result}/>
            );
          })}
        </ScrollView>
      )
    } else {
      if(!this.props.fb.isFetching && this.props.fb.error != null) {
        list = (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {
              this.props.loadVersiculos();
            }} >
              <View style={{flex:1, alignItems: 'center'}}>
                <Text style={{ textAlign: 'center', flex: 1 }}>Ocurrió un error al cargar las noticias.</Text>
                <Text style={{ textAlign: 'center', flex: 1 }}>Haz click aquí para reintentar.</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      } else {
        list = (
          <Loader />
        )
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Versículo del día"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
          <View style={{ flex: 1 }}>
            {list}
          </View>
      </View>
    );
  }
}

function select(store) {
  return {
    fb: store.facebookReducer,
  };
}

function actions(dispatch) {
  return {
    loadVersiculos: () => dispatch(loadVersiculos()),
    fbRendered: () => dispatch(fbRendered()),
  };
}

module.exports = connect(select, actions)(Versiculos);
