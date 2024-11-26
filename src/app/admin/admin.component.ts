import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router) {}

  utilisateurs = [
    { id: 1, nom: 'Alice Dupont', statut: 'Lecteur' },
    { id: 2, nom: 'Bob Martin', statut: 'Libraire' },
    { id: 3, nom: 'Charlie Durand', statut: 'Lecteur' },
    { id: 4, nom: 'Diane Roche', statut: 'Libraire' },
    { id: 5, nom: 'Eve Lambert', statut: 'Lecteur' },
  ];

  // Méthode pour changer le statut
  changerStatut(utilisateur: any) {
    utilisateur.statut = utilisateur.statut === 'Libraire' ? 'Lecteur' : 'Libraire';
  }

  retour() {
    this.router.navigate(['/livres']);
  }

}
