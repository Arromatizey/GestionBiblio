import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  constructor(private router: Router) {}

  demandes = [
    { id: 1, livre: 'Le Petit Prince', utilisateur: 'Jean Dupont', statut: 'En attente' },
    { id: 2, livre: '1984', utilisateur: 'Marie Curie', statut: 'En attente' },
    { id: 3, livre: 'Harry Potter', utilisateur: 'Luc Durand', statut: 'En attente' }
  ];

  // Méthode pour valider une demande
  validerDemande(id: number) {
    const demande = this.demandes.find(d => d.id === id);
    if (demande) {
      demande.statut = 'Validée';
    }
  }

  // Méthode pour rejeter une demande
  rejeterDemande(id: number) {
    const demande = this.demandes.find(d => d.id === id);
    if (demande) {
      demande.statut = 'Rejetée';
    }
  }

  retour() {
    this.router.navigate(['/livres']);
  }

}
