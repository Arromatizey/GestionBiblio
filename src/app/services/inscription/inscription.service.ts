import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {

  constructor(private http: HttpClient) {}

  register(nom: string, prenom:string, email: string, password: string): Observable<any> {

    const url = `http://localhost:8080/api/createUser?role=membre&nom=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}&email=${encodeURIComponent(email)}&motDePasse=${encodeURIComponent(password)}`;

    return this.http.post<any>(url, {}); // Le corps de la requête est vide car les données sont dans l'URL
  }
}
