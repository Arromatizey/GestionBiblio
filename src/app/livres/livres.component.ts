import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from '../services/livre/livre.service';
import {CommonModule, NgClass} from '@angular/common';

// Déclaration de l'interface Livre
interface Livre {
  titre: string;
  auteur: string;
  genre: string;
  anneePublication: number;
  exemplairesDisponibles: number;
  disponible: boolean; // Déduit à partir de exemplairesDisponibles
}

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  imports: [
    NgClass,
    CommonModule
  ],
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres: Livre[] = [];
  confirmationMessage: string | null = null;

  constructor(private livreService: LivreService, private router: Router) {}

  ngOnInit(): void {
    // Récupération des livres depuis le backend
    this.livreService.getLivres(0, 20, []).subscribe(
      (response) => {
        // Extraction des livres depuis la structure JSON
        this.livres = response._embedded.livres.map((livre: any) => ({
          titre: livre.titre,
          auteur: livre.auteur,
          genre: livre.genre,
          anneePublication: livre.anneePublication,
          exemplairesDisponibles: livre.exemplairesDisponibles,
          disponible: livre.exemplairesDisponibles > 0
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres', error);
      }
    );
  }

  emprunterLivre(livre: Livre): void {
    if (livre.disponible) {
      livre.exemplairesDisponibles--; // Réduit le nombre d'exemplaires disponibles
      livre.disponible = livre.exemplairesDisponibles > 0; // Met à jour la disponibilité
      this.confirmationMessage = `Vous avez demandé à emprunter le livre "${livre.titre}"`;
      setTimeout(() => {
        this.confirmationMessage = null; // Efface le message après 3 secondes
      }, 3000);
    }
  }

  naviguerVersProfil(): void {
    this.router.navigate(['/user']);
  }

  naviguerVersValidation(): void {
    this.router.navigate(['/validation']);
  }

  naviguerVersAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
