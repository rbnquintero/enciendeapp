import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Drawer from 'react-native-drawer'
var Menu = require('./common/Menu');
var NoticiasMain = require('./noticias/NoticiasMain');
var Creencias = require('./webviews/Creencias');
var Nosotros = require('./simplepages/Nosotros');
var SantaBiblia = require('./webviews/SantaBiblia');
var Versiculos = require('./versiculos/Versiculos');
var Oracion = require('./simplepages/Oracion');

var Sample = require('./simplepages/Sample');

/* REDUX */
import type {State as Navigation} from '../reducers/navReducer';
var { connect } = require('react-redux');
type Props = {
  nav: Navigation;
};

class MainView extends Component {
  closeDrawer = () => {
    this._drawer.close()
  }

  openDrawer = () => {
    this._drawer.open()
  }

  render() {

    var component = null;
    if (this.props.nav.pantalla === 'noticias') {
      component = (<NoticiasMain closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'creencias') {
        component = (<Creencias closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'nosotros') {
        component = (<Nosotros closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'biblia') {
        component = (<SantaBiblia closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'versiculos') {
        component = (<Versiculos closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'oracion') {
        component = (<Oracion closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'calendario') {
        component = (<Sample closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    } else if (this.props.nav.pantalla === 'sample') {
        component = (<Sample closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>)
    }

    return (
      <Drawer
        ref={c => this._drawer = c}
        type="overlay"
        openDrawerOffset={0.2}
        panOpenMask={0.2}
        tapToClose={true}
        content={<Menu closeDrawer={this.closeDrawer} openDrawer={this.openDrawer}/>}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        <View style={{flex:1}}>
          {component}
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function select(store) {
  return {
    nav: store.navReducer,
  };
}

module.exports = connect(select)(MainView);
