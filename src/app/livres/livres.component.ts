import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from '../services/livre/livre.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Déclaration de l'interface Livre
interface Livre {
  id: number;
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
  imports: [NgClass, CommonModule, FormsModule],
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres: Livre[] = [];
  filteredLivres: Livre[] = []; // Liste filtrée des livres
  confirmationMessage: string | null = null;

  // Critères de recherche
  searchTitre: string = '';
  searchAuteur: string = '';
  searchGenre: string = '';

  constructor(private livreService: LivreService, private router: Router) {}

  ngOnInit(): void {
    // Récupération des livres depuis le backend
    this.livreService.getLivres().subscribe(
      (response: Livre[]) => {
        // Adaptation aux nouvelles données reçues
        this.livres = response.map((livre: any) => ({
          id: livre.id,
          titre: livre.titre,
          auteur: livre.auteur,
          genre: livre.genre,
          anneePublication: livre.anneePublication,
          exemplairesDisponibles: livre.exemplairesDisponibles,
          disponible: livre.exemplairesDisponibles > 0
        }));
        this.filteredLivres = this.livres; // Initialisation de la liste filtrée
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres', error);
      }
    );
  }

  // Méthode pour filtrer les livres en fonction des critères de recherche
  filtrerLivres(): void {
    this.filteredLivres = this.livres.filter((livre) => {
      const matchTitre = this.searchTitre
        ? livre.titre.toLowerCase().includes(this.searchTitre.toLowerCase())
        : true;
      const matchAuteur = this.searchAuteur
        ? livre.auteur.toLowerCase().includes(this.searchAuteur.toLowerCase())
        : true;
      const matchGenre = this.searchGenre
        ? livre.genre.toLowerCase().includes(this.searchGenre.toLowerCase())
        : true;

      return matchTitre && matchAuteur && matchGenre;
    });
  }

  emprunterLivre(livre: Livre): void {
    if (livre.disponible) {
      livre.exemplairesDisponibles--;
      livre.disponible = livre.exemplairesDisponibles > 0;
      this.confirmationMessage = `Vous avez demandé à emprunter le livre "${livre.titre}"`;
      setTimeout(() => (this.confirmationMessage = null), 3000);
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
