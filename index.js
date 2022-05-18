const { fetchMyIP,  fetchCoordsByIp , fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIp('186.233.185.235' , (error, data) =>{
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates: ', data);
  return data;
});

const coordsIp = { latitude: 25.762859344482422, longitude: -80.31195831298828 };

fetchISSFlyOverTimes(coordsIp , (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned response: ', data);
});
