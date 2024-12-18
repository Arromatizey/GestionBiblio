import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/utilisateurs'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getUsers(page: number = 0, size: number = 3, sort: string[] = []){
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach((sortCriteria) => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get(this.apiUrl, { params });
  }

  switchUsers(){

  }

}
