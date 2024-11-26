import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private router: Router) {}

  // Emprunts en cours
  empruntsEnCours = [
    { titre: 'Les Misérables', auteur: 'Victor Hugo', dateRetour: '2024-12-01' },
    { titre: 'Le Comte de Monte-Cristo', auteur: 'Alexandre Dumas', dateRetour: '2024-12-15' },
  ];

  historique = [
    {
      titre: '1984',
      auteur: 'George Orwell',
      dateEmprunt: '2024-09-01',
      dateRetour: '2024-09-20',
    },
    {
      titre: 'Le Petit Prince',
      auteur: 'Antoine de Saint-Exupéry',
      dateEmprunt: '2024-07-15',
      dateRetour: '2024-08-10',
    },
  ];

  retour() {
    this.router.navigate(['/livres']);
  }

}
