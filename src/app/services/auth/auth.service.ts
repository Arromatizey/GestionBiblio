import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/login'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  // Utilisation de POST pour envoyer l'email et le mot de passe dans le corps de la requête
  getAuth(email: string, password: string): Observable<any> {
    // Ajouter les paramètres à l'URL en utilisant query params
    const url = `http://localhost:8080/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return this.http.post<any>(url, {}); // Le corps de la requête est vide car les données sont dans l'URL
  }
}
