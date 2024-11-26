import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent {
  constructor(private router: Router) {}

  livres = [
    { id: 1, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', disponible: true },
    { id: 2, titre: '1984', auteur: 'George Orwell', disponible: false },
    { id: 3, titre: 'Harry Potter à l\'École des Sorciers', auteur: 'J.K. Rowling', disponible: true },
    { id: 4, titre: 'L\'Étranger', auteur: 'Albert Camus', disponible: false },
    { id: 5, titre: 'Les Misérables', auteur: 'Victor Hugo', disponible: true },
    { id: 6, titre: 'Don Quichotte', auteur: 'Miguel de Cervantes', disponible: true },
    { id: 7, titre: 'Le Seigneur des Anneaux', auteur: 'J.R.R. Tolkien', disponible: true },
    { id: 8, titre: 'Cinquante nuances de Grey', auteur: 'E.L. James', disponible: false },
    { id: 9, titre: 'La Peste', auteur: 'Albert Camus', disponible: true },
    { id: 10, titre: 'Les Fleurs du mal', auteur: 'Charles Baudelaire', disponible: false },
    { id: 11, titre: 'À la recherche du temps perdu', auteur: 'Marcel Proust', disponible: true },
    { id: 12, titre: 'Le Meilleur des mondes', auteur: 'Aldous Huxley', disponible: true },
    { id: 13, titre: 'Crime et Châtiment', auteur: 'Fiodor Dostoïevski', disponible: true },
    { id: 14, titre: 'La Divine Comédie', auteur: 'Dante Alighieri', disponible: false },
    { id: 15, titre: 'Jane Eyre', auteur: 'Charlotte Brontë', disponible: true },
    { id: 16, titre: 'Les Trois Mousquetaires', auteur: 'Alexandre Dumas', disponible: true },
    { id: 17, titre: 'Dracula', auteur: 'Bram Stoker', disponible: true },
    { id: 18, titre: 'Le Rouge et le Noir', auteur: 'Stendhal', disponible: false },
    { id: 19, titre: 'L\'Alchimiste', auteur: 'Paulo Coelho', disponible: true },
    { id: 20, titre: 'Madame Bovary', auteur: 'Gustave Flaubert', disponible: true }
  ];


  confirmationMessage: string | null = null;

  // Méthode pour naviguer vers le profil utilisateur
  naviguerVersProfil() {
    this.router.navigate(['/user']);
  }

  // Méthode pour naviguer vers la page Validation
  naviguerVersValidation() {
    this.router.navigate(['/validation']);
  }

  // Méthode pour emprunter un livre
  emprunterLivre(livre: any) {
    if (livre.disponible) {
      livre.disponible = false; // Marque le livre comme indisponible
      this.confirmationMessage = `Vous avez demandé à emprunté le livre "${livre.titre}"`;
      setTimeout(() => {
        this.confirmationMessage = null; // Efface le message après 3 secondes
      }, 3000);
    }
  }

  naviguerVersAdmin() {
    this.router.navigate(['/admin']);
  }

}
