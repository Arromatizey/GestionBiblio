import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Rend ce service disponible dans toute l'application
})
export class EmpruntService {
  private apiUrl = 'http://localhost:8080/emprunts';
  private apiUrlLivre = 'http://localhost:8080/livres'
  private apiUrlUser = 'http://localhost:8080/utilisateurs'

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

  // reponse example :
  //   {
  //     "_embedded" : {
  //       "emprunts" : [ {
  //         "utilisateurId" : 1,
  //         "livreId" : 1,
  //         "dateEmprunt" : "2024-10-01",
  //         "dateRetour" : "2024-10-15",
  //         "_links" : {
  //           "self" : {
  //             "href" : "http://localhost:8080/emprunts/1"
  //           },
  //           "emprunt" : {
  //             "href" : "http://localhost:8080/emprunts/1"
  //           },
  //           "status" : {
  //             "href" : "http://localhost:8080/emprunts/1/status"
  //           }
  //         }
  //       }, {
  //         "utilisateurId" : 2,
  //         "livreId" : 2,
  //         "dateEmprunt" : "2024-10-05",
  //         "dateRetour" : "2024-10-20",
  //         "_links" : {
  //           "self" : {
  //             "href" : "http://localhost:8080/emprunts/2"
  //           },
  //           "emprunt" : {
  //             "href" : "http://localhost:8080/emprunts/2"
  //           },
  //           "status" : {
  //             "href" : "http://localhost:8080/emprunts/2/status"
  //           }
  //         }
  //       } ]
  //     },
  //     "_links" : {
  //       "first" : {
  //         "href" : "http://localhost:8080/emprunts?page=0&size=2"
  //       },
  //       "self" : {
  //         "href" : "http://localhost:8080/emprunts?page=0&size=2"
  //       },
  //       "next" : {
  //         "href" : "http://localhost:8080/emprunts?page=1&size=2"
  //       },
  //       "last" : {
  //         "href" : "http://localhost:8080/emprunts?page=12&size=2"
  //       },
  //       "profile" : {
  //         "href" : "http://localhost:8080/profile/emprunts"
  //       },
  //       "search" : {
  //         "href" : "http://localhost:8080/emprunts/search"
  //       }
  //     },
  //     "page" : {
  //       "size" : 2,
  //       "totalElements" : 25,
  //       "totalPages" : 13,
  //       "number" : 0
  //     }
  //   }

  denyEmprunt(empruntID: number){

  }


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

  empruntAccept(empruntID: number){
    const url = `http://localhost:8080/emprunt/accept?empruntId=${empruntID}`;
    return this.http.post<any>(url, {});
  }

  empruntReject(empruntID: number){
    const url2 = `http://localhost:8080/emprunt/reject?empruntId=${empruntID}`;
    return this.http.post<any>(url2, {});
  }

}
