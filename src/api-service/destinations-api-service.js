import ApiService from '../framework/framework/api-service.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

}
