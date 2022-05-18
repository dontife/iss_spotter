const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      return callback(error,null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip

    request(`https://freegeoip.app/json/${ip} `, (error, response , body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);

      request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
        if (error) {
          return callback(error, null);
        }

        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
        callback(null, JSON.parse(body).response);
      })
    })
  })  
}


module.exports = {
  nextISSTimesForMyLocation
};