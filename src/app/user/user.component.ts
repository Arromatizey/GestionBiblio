import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // Emprunts en cours
  empruntsEnCours = [
    { titre: '1984', auteur: 'George Orwell', dateRetour: '2024-12-15' },
    { titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', dateRetour: '2024-12-20' },
  ];

  // Historique des emprunts
  historique = [
    { titre: 'Harry Potter', auteur: 'J.K. Rowling', dateEmprunt: '2024-11-01', dateRetour: '2024-11-15' },
    { titre: 'L\'Étranger', auteur: 'Albert Camus', dateEmprunt: '2024-10-05', dateRetour: '2024-10-20' },
  ];
}
