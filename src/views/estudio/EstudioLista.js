import React, { Component } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Loader from '../components/common/Loader'
import Header from '../components/common/Header'
import Card from '../components/common/Card'

var NoticiaDetalle = require('../noticias/NoticiaDetalle')

/* REDUX */
var { connect } = require('react-redux');
var {
  studiesRendered,
  loadStudies,
} = require('../../actions')

class EstudioLista extends Component {
  constructor(props) {
    super(props)

    this.props.loadStudies()
  }

  _rowPressed(noticia) {
    this.props.navigator.push({
      title: "Noticia",
      name: 'NoticiaDetalle',
      component: NoticiaDetalle,
      passProps: {noticia: noticia}
    });
  }

  render() {
    var _this = this
    var list = null
    if(this.props.news.news != null) {
      list = (
        <ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.props.news.isFetching}
              onRefresh={this.props.loadNews}
              tintColor='rgba(255,255,255,0.7)'
            />
          }>
          {this.props.news.news.map(function(result, id){
            return (
              <TouchableOpacity key={id} onPress={() => _this._rowPressed(result)}>
                <Card data={result} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )
    } else {
      if(!this.props.news.isFetching && this.props.news.error != null) {
        list = (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {
              this.props.loadNews();
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
          title="Series de estudio"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.navigator.props.openDrawer,
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
    news: store.newsReducer,
  };
}

function actions(dispatch) {
  return {
    loadStudies: () => dispatch(loadStudies()),
    studiesRendered: () => dispatch(studiesRendered()),
  };
}

module.exports = connect(select, actions)(EstudioLista);
