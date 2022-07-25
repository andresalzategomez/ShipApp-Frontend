import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Ship } from '../models/ship';
import { Feature } from '../models/feature';

@Injectable({
  providedIn: 'root',
})
export class ShipService{
  private apiURL = 'http://localhost:3000/v1/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/ship/')

      .pipe(catchError(this.errorHandler));
  }

  getTypes(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/type/')

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/ship/' + id)

      .pipe(catchError(this.errorHandler));
  }

  findFeatures(): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/feature/')

      .pipe(catchError(this.errorHandler));
  }

  findFeaturesById(id: number): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/feature/'+ id)

      .pipe(catchError(this.errorHandler));
  }

  findFeaturesList(id: number): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/feature/featureList/' + id)

      .pipe(catchError(this.errorHandler));
  }  

  findShipByName(nameShip: string, nameTable:string): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/ship/name/'+ nameShip + "/" + nameTable)
      .pipe(catchError(this.errorHandler));
  }

  findShipByNameInner(idFeature:string): Observable<any> {
    return this.httpClient
      .get<any>(this.apiURL + '/ship/name/'+ idFeature)
      .pipe(catchError(this.errorHandler));
  }

  create(ship: Ship): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/ship/', JSON.stringify(ship), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  createFeature(feature: Feature): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/feature/', JSON.stringify(feature), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  createFeatureList(featureList: Feature): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/feature/featureList/', JSON.stringify(featureList), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, ship: Ship): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/ship/' + id, JSON.stringify(ship), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/ship/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}