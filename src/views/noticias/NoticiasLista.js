import React, { Component } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

var Loader = require('../common/Loader')
var Card = require('../common/Card')
var Header = require('../common/Header')

var NoticiaDetalle = require('./NoticiaDetalle')

/* REDUX */
import type {State as Noticias} from '../../reducers/noticia';
var { connect } = require('react-redux');
var {
  loadNews,
  newsRendered,
} = require('../../actions');
type Props = {
  news: Noticias;
  user: User;
  loadNews: () => void;
  newsRendered: () => void;
  fetchProfile: () => void;
  fetchAll: () => void;
};

class NoticiasLista extends Component {
  constructor(props) {
    super(props)

    this.props.loadNews()
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
          title="Noticias"
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
    loadNews: () => dispatch(loadNews()),
    newsRendered: () => dispatch(newsRendered()),
  };
}

module.exports = connect(select, actions)(NoticiasLista);
