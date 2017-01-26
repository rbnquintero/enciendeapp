'use strict';

var store = require('react-native-simple-store');

const key_saved_news = "key_saved_news";
const key_saved_versiculos = "key_saved_versiculos";
const key_saved_oracion = "key_saved_oracion";

const key_current_rally = "key_current_rally";
const key_saved_staff = "key_saved_staff";
const key_saved_activities_user = "key_saved_activities_user";
const key_selfies_to_upload = "key_selfies_to_upload";
const key_subscribed_topics_gcm = "key_subscribed_topics_gcm";

var localRepository = {
  /** PERFIL **/
  deleteAll : function() {
    store.delete(key_profile_info);
    store.delete(key_current_rally);
    store.delete(key_saved_staff);
    store.delete(key_saved_activities_user);
    store.delete(key_selfies_to_upload);
  },

  /** NEWS **/
  getSavedNews : function() {
    return store.get(key_saved_news);
  },
  saveNews : function(news) {
    return store.save(key_saved_news, news);
  },

  /** PEDIDOS DE ORACIÓN **/
  getSavedOracion : function() {
    return store.get(key_saved_oracion);
  },
  saveOracion : function(pedidos) {
    return store.save(key_saved_oracion, pedidos);
  },

  /** SUBSCRIBED TOPICS **/
  getSavedVersiculos : function(){
    return store.get(key_saved_versiculos);
  },
  saveVersiculos : function(versiculos){
    return store.save(key_saved_versiculos, versiculos);
  },
};

module.exports = localRepository;
