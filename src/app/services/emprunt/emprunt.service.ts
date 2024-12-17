import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Rend ce service disponible dans toute l'application
})
export class EmpruntService {
  private apiUrl = 'http://localhost:8080/emprunts';

  constructor(private http: HttpClient) {}

  getEmprunt(page: number = 0, size: number = 20, sort: string[] = []): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach((sortCriteria) => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get(this.apiUrl, { params });
  }
}
