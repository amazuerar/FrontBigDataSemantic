import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Servicio para retornar noticias y colaboradores de la universidad de los andes con su respectiva informacion
 * @export
 * @class BackService
 */

@Injectable()
export class BackService {

  address = '172.24.100.104';
  // address = '127.0.0.1';
  port = '8083';

  /**
   * Crea una instancia del componente servicio RssService.
   * @param {Http} http paquete de angular necesario para hacer peticiones http
   * @memberof BackService
   */
  constructor(private http: Http) { }

  getQuestions() {
    return this.http.get('http://' + this.address + ':' + this.port + '/getQuestions')
      .map(res => res.json())
      .toPromise()
  }

  getEntitiesByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getEntitiesByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getAnswersByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getAnswersByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getLocationsByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getLocationsByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getTracksByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getTracksByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getTweetsByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getTweetsByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getSimilarQuestionsByID(id) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getSimilarQuestionsByID/' + id)
      .map(res => res.json())
      .toPromise()
  }

  getQuestionsByQuery(query) {
    return this.http.get('http://' + this.address + ':' + this.port + '/getQuestionsByQuery/' + query)
      .map(res => res.json())
      .toPromise()
  }

  GetSparqlQueryByID(id) {
    const url = 'http://' + this.address + ':' + this.port + '/getSparqlQuery/' + id;
    return this.http.get(url)
      .map(res => res.json())
      .toPromise()
  }

}
