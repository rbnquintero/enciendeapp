'use strict';

var store = require('react-native-simple-store');

const key_saved_iglesia = "key_saved_iglesia";
const key_saved_news = "key_saved_news";
const key_saved_studies = "key_saved_studies";
const key_saved_versiculos = "key_saved_versiculos";
const key_saved_oracion = "key_saved_oracion";
const key_profile_info = "key_profile_info";
const key_saved_comments = "key_saved_comments";

const key_current_rally = "key_current_rally";
const key_saved_staff = "key_saved_staff";
const key_saved_activities_user = "key_saved_activities_user";
const key_selfies_to_upload = "key_selfies_to_upload";
const key_subscribed_topics_gcm = "key_subscribed_topics_gcm";

var localRepository = {
  /** PERFIL **/
  getProfileFromStorage : function() {
    return store.get(key_profile_info);
  },
  deleteAll : function() {
    store.delete(key_profile_info);
    store.delete(key_current_rally);
    store.delete(key_saved_staff);
    store.delete(key_saved_activities_user);
    store.delete(key_selfies_to_upload);
    store.delete(key_saved_comments);
  },
  saveProfileToStorage : function(profile) {
    return store.save(key_profile_info, profile);
  },

  /** RALLY **/
  getCurrentRally : function() {
    return store.get(key_current_rally);
  },
  saveCurrentRally : function(rally) {
    return store.save(key_current_rally, rally);
  },

  /* IGLESIA */
  getSavedIglesia : function() {
    return store.get(key_saved_iglesia);
  },
  saveIglesia : function(iglesia) {
    return store.save(key_saved_iglesia, iglesia);
  },

  /** NEWS **/
  getSavedNews : function() {
    return store.get(key_saved_news);
  },
  saveNews : function(news) {
    return store.save(key_saved_news, news);
  },

  /** STUDIES **/
  getSavedStudies : function() {
    return store.get(key_saved_studies);
  },
  saveStudies : function(studies) {
    return store.save(key_saved_studies, studies);
  },

  /** COMMENTS **/
  getSavedComments : function() {
    return store.get(key_saved_comments);
  },
  saveComments : function(comments) {
    return store.save(key_saved_comments, comments);
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
