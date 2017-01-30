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

var EstudioListaTemas = require('./EstudioListaTemas')

/* REDUX */
var { connect } = require('react-redux');
var {
  studiesRendered,
  loadStudies,
  fetchStudies,
} = require('../../actions')

class EstudioLista extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadStudies()
  }

  _rowPressed(serie) {
    this.props.navigator.push({
      title: serie.nombre,
      name: 'EstudioListaTemas',
      component: EstudioListaTemas,
      passProps: {serie: serie}
    });
  }

  render() {
    var _this = this
    var list = null
    if(this.props.estudio.studies != null) {
      list = (
        <ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.props.estudio.isFetching}
              onRefresh={this.props.fetchStudies}
              tintColor='rgba(255,255,255,0.7)'
            />
          }>
          {this.props.estudio.studies.map(function(result, id){
            return (
              <TouchableOpacity key={id} onPress={() => _this._rowPressed(result)}>
                <Card data={result} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )
    } else {
      if(!this.props.estudio.isFetching && this.props.estudio.error != null) {
        list = (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {
              this.props.loadStudies();
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
    estudio: store.estudioReducer,
  };
}

function actions(dispatch) {
  return {
    loadStudies: () => dispatch(loadStudies()),
    fetchStudies: () => dispatch(fetchStudies(true)),
    studiesRendered: () => dispatch(studiesRendered()),
  };
}

module.exports = connect(select, actions)(EstudioLista);
