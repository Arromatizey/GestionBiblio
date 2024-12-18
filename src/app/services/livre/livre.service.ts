import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Rend ce service disponible dans toute l'application
})
export class LivreService {
  private apiUrl = 'http://localhost:8080/livres';
  private apiLivre = 'http://localhost:8080/emprunt/borrow';

  constructor(private http: HttpClient) {}

  getLivres(page: number = 0, size: number = 21, sort: string[] = []): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach((sortCriteria) => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get(this.apiUrl, { params });
  }

  empruntBorrow(userID: number, livreID: number){
    const url = `http://localhost:8080/emprunt/borrow?userId=${userID}&livreId=${livreID}`;
    return this.http.post<any>(url, {});
  }

  notification(){

    const url = `http://localhost:8080/notifications/trigger`;
    return this.http.get(url);
    console.log("ici");
  }

  getUser(userID: number): Observable<any>{
    const url = `http://localhost:8080/utilisateurs/${userID}`

    return this.http.get(url);
  }

}
