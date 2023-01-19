export default class FetchCountrise {
  constructor() {
    this.nameCountry = '';
  }

  fetch() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.nameCountry}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      // .then(data => {
      //   return data;
      // })
      .catch(error => {
        return error;
      });
  }

  get name() {
    return this.nameCountry;
  }

  set name(name) {
    this.nameCountry = name;
  }
}
