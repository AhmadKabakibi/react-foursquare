import Foursquare from 'node-foursquare-venues'

// @NOTE NOT TO EXPOSE IN A PRODUCTION ENVIRONMENT
// ONLY FOR DEMONSTRATION PURPOSES
const API_KEYS = {
  id: 'XOCL5ENNNQXAMNXBD2BAE1B44OEXCEF5IAKFC5W2AM4TCS2B',
  secret: 'SIPENK43OEKMPK5ZC2YJQ24FZLTWJCQ5OG0BBOSSWTJHSECM'
}

export default class VenueFinder {
  constructor () {
    this.api = new Foursquare(API_KEYS.id, API_KEYS.secret)
    this.defaultRange = 25
    this.limit = 50
    this.userLocation = window.sessionStorage ? window.sessionStorage.getItem('userLocation') : null
  }

  getUserLocation () {
    return new Promise((resolve, reject) => {
      if (this.userLocation) {
        resolve(this.userLocation)
      }
      const onGeoSuccess = (location) => {
        this.userLocation = `${location.coords.latitude},${location.coords.longitude}`
        window.sessionStorage.setItem('userLocation', this.userLocation)
        resolve(this.userLocation)
      }
      const onGeoError = (error) => {
        reject(error)
      }
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError)
    })
  }

  getVenues (radius, query) {
    return new Promise((resolve, reject) => {
      this.getUserLocation()
        .then(() => {
          radius = parseInt(radius, 10) || this.defaultRange
          this.api.venues.explore({
            ll: this.userLocation,
            limit: this.limit,
            query,
            radius
          }, (e, r) => {
            e ? reject(e) : resolve(r)
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
