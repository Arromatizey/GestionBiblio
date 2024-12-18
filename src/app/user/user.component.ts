import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntUserService } from '../services/EmpruntUser/empruntUser.service';
import { AppComponent } from '../app.component';
import { JsonPipe, NgForOf } from '@angular/common';

interface Livre {
  id: number;
  titre: string;
  auteur: string;
  genre: string;
  anneePublication: number;
  exemplairesDisponibles: number;
}

interface Emprunt {
  id: number;
  livreId: number;
  dateEmprunt: string;
  dateRetour: string | null;
  livre?: Livre; // Détails du livre (récupérés via API)
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports: [NgForOf],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  empruntsEnCours: Emprunt[] = [];
  historique: Emprunt[] = [];
  utilisateurID: number = AppComponent.userID;
  jsonResponse: any;

  constructor(
    private empruntUserService: EmpruntUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //AppComponent.userID = 1; // Simuler un utilisateur connecté
    this.utilisateurID = AppComponent.userID;

    this.empruntUserService.getEmpruntUser(this.utilisateurID).subscribe(
      (data) => {
        const emprunts: Emprunt[] = data._embedded.emprunts;

        // Filtrer les emprunts en cours et l'historique
        this.empruntsEnCours = emprunts.filter((e) => !e.dateRetour);
        this.historique = emprunts.filter((e) => e.dateRetour);

        // Charger les détails des livres
        this.loadBookDetails(this.empruntsEnCours);
        this.loadBookDetails(this.historique);

        this.jsonResponse = data; // Optionnel pour debug
      },
      (error) => {
        console.error('Erreur lors de la récupération des emprunts', error);
      }
    );
  }

  loadBookDetails(emprunts: Emprunt[]): void {
    emprunts.forEach((emprunt) => {
      this.empruntUserService.getLivre(emprunt.livreId).subscribe(
        (livre: Livre) => {
          emprunt.livre = livre; // Associer les détails du livre à l'emprunt
        },
        (error) => {
          console.error('Erreur lors de la récupération du livre', error);
        }
      );
    });
  }

  retour(): void {
    this.router.navigate(['/livres']);
  }
}
