import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Servicio para retornar noticias y colaboradores de la universidad de los andes con su respectiva informacion
 * @export
 * @class BackService
 */

@Injectable()
export class BackService {

  // address = "172.24.100.104";
  address = '127.0.0.1';
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

}
