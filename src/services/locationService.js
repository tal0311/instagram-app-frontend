

/**
 * user location
 * @returns {Promise} position 
 */
function position() {
 return new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
 });
}

/**
 * lat lag
 * @returns {Promise<{lat,lng}>} position by lat and lng
 */
async function getPosition() {
 try {
  const pos = await position()
  const { latitude, longitude } = pos.coords
  return {
   lat: latitude,
   lng: longitude
  }
 } catch (error) {
  console.info('[could not get position]:', error)
 }

}
// TODO: add google maps search 

export const locationService = {
 getPosition
}
