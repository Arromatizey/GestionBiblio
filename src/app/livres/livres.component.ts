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
    { titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', disponible: true },
    { titre: '1984', auteur: 'George Orwell', disponible: false },
    { titre: 'Harry Potter', auteur: 'J.K. Rowling', disponible: true },
    { titre: 'L\'Étranger', auteur: 'Albert Camus', disponible: false },
    { titre: 'Les Misérables', auteur: 'Victor Hugo', disponible: true }
  ];

  // Méthode pour naviguer vers le profil utilisateur
  naviguerVersProfil() {
    this.router.navigate(['/user']);
  }
}
