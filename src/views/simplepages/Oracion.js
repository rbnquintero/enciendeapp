import React, { Component } from 'react'
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'

var Header = require('../common/Header')
var Loader = require('../common/Loader')

var moment = require('moment');
var esLocale = require('moment/locale/es');

/* REDUX */
var { connect } = require('react-redux');
var {
  loadItems,
  itemsRendered,
} = require('../../actions');

class Oracion extends Component {

  componentWillMount() {
    this.props.loadItems();
  }

  render() {
    var _this = this
    var list = null
    if(this.props.oracion.items != null) {
      list = (
        <ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.1)', padding:10}}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.props.oracion.isFetching}
              onRefresh={this.props.loadItems}
              tintColor='rgba(255,255,255,0.7)'
            />
          }>
          {this.props.oracion.items.map(function(result, id){
            var fechaStr = moment(new Date(result.creacion.iso)).locale("es", esLocale).fromNow()
            if(result.mostrar) {
              return (
                <View key={id} style={{marginVertical:10}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>{result.nombre}</Text><Text> dijo: </Text>
                  </View>
                  <Text style={{marginVertical:5, fontSize:20}}>{result.pedido}</Text>
                  <Text style={{fontSize:10}}>{fechaStr}</Text>
                </View>
              );
            }
          })}
        </ScrollView>
      )
    } else {
      if(!this.props.oracion.isFetching && this.props.oracion.error != null) {
        list = (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {
              this.props.loadItems();
            }} >
              <View style={{flex:1, alignItems: 'center'}}>
                <Text style={{ textAlign: 'center', flex: 1 }}>Ocurrió un error al cargar las oraciones.</Text>
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
          title="Pedidos de oración"
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
    oracion: store.oracionReducer,
  };
}

function actions(dispatch) {
  return {
    loadItems: () => dispatch(loadItems()),
    itemsRendered: () => dispatch(itemsRendered()),
  };
}

module.exports = connect(select, actions)(Oracion);
