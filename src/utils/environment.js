var env = {
  facebookURL: 'https://graph.facebook.com/v2.6/',
  facebookAuth: 'oauth/access_token?client_id=1204063346326877&client_secret=7550bf008121f029a713ae8c9d3e695c&grant_type=client_credentials',
  facebookFeed: '884137674996645/feed?fields=id,message,link,created_time,attachments{media}&limit=25&access_token=',
  timeout: function(ms, promise) {
    if(ms == null){
      ms = 30000
    }
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  },
}

module.exports = env
