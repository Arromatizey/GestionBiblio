import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent {
  constructor(private router: Router) {}

  demandes = [
    { id: 1, livre: 'Le Petit Prince', utilisateur: 'Jean Dupont', statut: 'En attente' },
    { id: 2, livre: '1984', utilisateur: 'Marie Curie', statut: 'En attente' },
    { id: 3, livre: 'Harry Potter', utilisateur: 'Luc Durand', statut: 'En attente' },
  ];

  empruntsEnCours = [
    { id: 101, livre: 'Les Misérables', utilisateur: 'Alice', dateRetour: '2024-12-01' },
    { id: 102, livre: 'Le Comte de Monte-Cristo', utilisateur: 'Bob', dateRetour: '2024-12-15' },
  ];

  // Méthode pour valider une demande
  validerDemande(id: number) {
    const demande = this.demandes.find((d) => d.id === id);
    if (demande) {
      demande.statut = 'Validée';
      // Simuler l'ajout de l'emprunt en cours
      this.empruntsEnCours.push({
        id: Math.random(), // ID unique simulé
        livre: demande.livre,
        utilisateur: demande.utilisateur,
        dateRetour: '2024-12-30', // Exemple de date de retour
      });
    }
  }

  // Méthode pour rejeter une demande
  rejeterDemande(id: number) {
    const demande = this.demandes.find((d) => d.id === id);
    if (demande) {
      demande.statut = 'Rejetée';
    }
  }

  // Méthode pour marquer un emprunt comme retourné
  marquerCommeRetourne(id: number) {
    this.empruntsEnCours = this.empruntsEnCours.filter((e) => e.id !== id);
    alert('Emprunt marqué comme retourné !');
  }

  retour() {
    this.router.navigate(['/livres']);
  }
}
