    
    /**
     * Enviroment variables required for github authorization.
     */
    const ENV = {};

//     ENV.isProduction = window.location.protocol === 'https:';
//     ENV.productionApiUrl = 'https://shred-fellows-server.herokuapp.com';
//     ENV.developmentApiUrl = 'http://localhost:3000';
    ENV.apiURL = 'http://api.shredfellows.ccs.net';

    let githubURL = "https://github.com/login/oauth/authorize";

    let options = {
      client_id: '4476386c411872159ea9',
      scope: 'user,user:email',
      redirect_uri: `${ENV.apiURL}/oauth`,
    }

    let QueryString = Object.keys(options).map((key, i) => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join("&");

    export const authURL = `${githubURL}?${QueryString}`;
      // res.redirect('https://github.com/login/oauth/authorize?client_id=252d0f262488210326f6&scope=user,user:email&redirect_uri=http://localhost:3000/oauth');