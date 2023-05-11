import countries from '@/data/countries.json';
import states from '@/data/states.json';

export default class Flagle {
  static states() {
    return states;
  }

  static countries() {
    return countries;
  }

  static getResult(guess, answer) {
    if (guess.name === answer.name) {
      return {
        success: true,
        guess: guess.name,
        distance: 0,
        bearing: 0,
        percent: 1
      };
    }
    return {
      success: false,
      guess: guess.name,
      ...Flagle.geolocate(guess, answer)
    };
  }

  static geolocate(guess, answer) {
    const distance = Flagle.distance(guess, answer);
    return {
      distance,
      bearing: Flagle.bearing(guess, answer),
      percent: 1 - (distance / 12742)
    };
  }

  static bearing(a, b) {
    const dLon = Flagle.deg2rad(b.longitude - a.longitude);
    const y = Math.sin(dLon) * Math.cos(Flagle.deg2rad(b.latitude));
    const x = Math.cos(Flagle.deg2rad(a.latitude)) * Math.sin(Flagle.deg2rad(b.latitude)) -
      Math.sin(Flagle.deg2rad(a.latitude)) * Math.cos(Flagle.deg2rad(b.latitude)) * Math.cos(dLon);
    const bearing = Flagle.rad2deg(Math.atan2(y, x));
    return bearing < 0 ? 360 + bearing : bearing;
  }

  static distance(a, b) {
    // Radius of the earth in km
    const radius = 6378.14;
    const dLat = Flagle.deg2rad(b.latitude - a.latitude);
    const dLon = Flagle.deg2rad(b.longitude - a.longitude);
    const x =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(Flagle.deg2rad(a.latitude)) * Math.cos(Flagle.deg2rad(b.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    // distance in KM
    return radius * c;
  }

  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  static rad2deg(rad) {
    return rad * (180 / Math.PI);
  }
}
