import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppComponent} from '../../app.component';

@Injectable({
  providedIn: 'root', // Rend ce service disponible dans toute l'application
})
export class EmpruntUserService {
  private apiUrlEmprunt = 'http://localhost:8080/emprunts/search/findByUtilisateurId';
  private apiUrlLivre = 'http://localhost:8080/livres'
  private apiUrlUser = 'http://loclalhost:8080/utilisateurs'

  constructor(private http: HttpClient) {}

  getEmpruntUser(utilisateurID: number = AppComponent.userID, sort: string[] = []): Observable<any> {
    let params = new HttpParams()
      .set('utilisateurId', utilisateurID.toString());

    sort.forEach((sortCriteria) => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get(this.apiUrlEmprunt, { params });
  }

  // response example :
  //   {
  //     "_embedded": {
  //       "emprunts": [
  //         {
  //           "utilisateurId": 1,
  //           "livreId": 1,
  //           "dateEmprunt": "2024-10-01",
  //           "dateRetour": "2024-10-15",
  //           "_links": {
  //             "self": {
  //               "href": "http://localhost:8080/emprunts/1"
  //             },
  //             "emprunt": {
  //               "href": "http://localhost:8080/emprunts/1"
  //             },
  //             "status": {
  //               "href": "http://localhost:8080/emprunts/1/status"
  //             }
  //           }
  //         },
  //         {
  //           "utilisateurId": 1,
  //           "livreId": 1,
  //           "dateEmprunt": "2024-12-16",
  //           "dateRetour": null,
  //           "_links": {
  //             "self": {
  //               "href": "http://localhost:8080/emprunts/25"
  //             },
  //             "emprunt": {
  //               "href": "http://localhost:8080/emprunts/25"
  //             },
  //             "status": {
  //               "href": "http://localhost:8080/emprunts/25/status"
  //             }
  //           }
  //         },
  //         {
  //           "utilisateurId": 1,
  //           "livreId": 10,
  //           "dateEmprunt": "2024-12-17",
  //           "dateRetour": "2025-01-01",
  //           "_links": {
  //             "self": {
  //               "href": "http://localhost:8080/emprunts/29"
  //             },
  //             "emprunt": {
  //               "href": "http://localhost:8080/emprunts/29"
  //             },
  //             "status": {
  //               "href": "http://localhost:8080/emprunts/29/status"
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     "_links": {
  //       "self": {
  //         "href": "http://localhost:8080/emprunts/search/findByUtilisateurId?utilisateurId=1"
  //       }
  //     }
  //   }

  getLivre(livreID: number): Observable<any>{
    const url = `${this.apiUrlLivre}/${livreID}`

    return this.http.get(url);
  }

  // response example :
  //   {
  //     "titre": "Le Petit Prince",
  //     "auteur": "Antoine de Saint-Exupéry",
  //     "genre": "Fiction",
  //     "anneePublication": 1943,
  //     "exemplairesDisponibles": 5,
  //     "_links": {
  //       "self": {
  //         "href": "http://localhost:8080/livres/1"
  //       },
  //       "livre": {
  //         "href": "http://localhost:8080/livres/1"
  //       }
  //     }
  //   }

  //TODO: afficher le nom du gars
  getUser(userID: number): Observable<any>{
    const url = `${this.apiUrlUser}/${userID}`

    return this.http.get(url);
  }

  // response example :
  //   {
  //     "nom": "Dupont",
  //     "prenom": "Pierre",
  //     "email": "pierre.dupont@example.com",
  //     "motDePasse": "password123",
  //     "_links": {
  //       "self": {
  //         "href": "http://localhost:8080/utilisateurs/1"
  //       },
  //       "utilisateur": {
  //         "href": "http://localhost:8080/utilisateurs/1"
  //       },
  //       "role": {
  //         "href": "http://localhost:8080/utilisateurs/1/role"
  //       }
  //     }
  //   }
}
