import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CovidData } from './covid-data';

@Injectable({
  providedIn: 'root'
})
export class CovidDetailsService {

  constructor(private router: Router, private httpClient: HttpClient) { }
  getWorldReport() {
    return this.httpClient.get(CovidData.GET_WORLD_REPORT);
  }
}
