import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from '../services/emprunt/emprunt.service';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
  imports: [
    NgClass, CommonModule
  ]
})
export class ValidationComponent implements OnInit {
  demandes: any[] = []; // Emprunts en attente de validation
  empruntsEnCours: any[] = []; // Emprunts validés

  constructor(private router: Router, private empruntService: EmpruntService) {}

  ngOnInit() {
    this.loadDemandes();
  }

  // Charger les emprunts depuis le service
  loadDemandes() {
    this.empruntService.getEmprunt().subscribe({
      next: (data) => {
        const emprunts = data._embedded?.emprunts || [];

        // Trier les emprunts selon leur statut
        this.demandes = emprunts
          .filter((emprunt: any) => emprunt.statusId !== 1) // Statuts autres que "Accepted"
          .map((emprunt: any) => this.transformEmprunt(emprunt));

        this.empruntsEnCours = emprunts
          .filter((emprunt: any) => emprunt.statusId === 1) // Statut "Accepted"
          .map((emprunt: any) => this.transformEmprunt(emprunt));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des demandes :', err);
      },
    });
  }

  // Transformer un emprunt brut en un format exploitable
  private transformEmprunt(emprunt: any): any {
    const transformed = {
      id: emprunt._links?.self?.href.split('/').pop() || 'Inconnu',
      livre: 'Chargement...', // Valeur par défaut temporaire
      utilisateur: 'Chargement...',
      statut: emprunt.status?.nom || 'En attente',
      dateRetour: emprunt.dateRetour || 'Non rendu',
    };

    // Récupérer le nom du livre
    if (emprunt.livreId) {
      this.empruntService.getLivre(emprunt.livreId).subscribe({
        next: (data) => (transformed.livre = data.titre),
        error: () => (transformed.livre = 'Livre inconnu'),
      });
    }

    // Récupérer le nom de l'utilisateur
    if (emprunt.utilisateurId) {
      this.empruntService.getUser(emprunt.utilisateurId).subscribe({
        next: (data) => (transformed.utilisateur = `${data.prenom} ${data.nom}`),
        error: () => (transformed.utilisateur = 'Utilisateur inconnu'),
      });
    }

    return transformed;
  }


  // Valider une demande
  validerDemande(id: number) {
    this.empruntService.empruntAccept(id).subscribe({
      next: (response) => {
        // Déplacer la demande validée dans les emprunts en cours
        const demande = this.demandes.find((d) => d.id === id);
        if (demande) {
          demande.statut = 'Accepted';
          this.empruntsEnCours.push(demande);
          this.demandes = this.demandes.filter((d) => d.id !== id);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la validation de la demande :', err);
      },
    });
  }

  // Rejeter une demande
  rejeterDemande(id: number) {
    this.empruntService.empruntReject(id).subscribe({

    });
    console.log("EMPRUNT LA CON DE TA MERE : ");
    const demande = this.demandes.find((d) => d.id === id);
    if (demande) {
      demande.statut = 'Rejetée';
      this.demandes = this.demandes.filter((d) => d.id !== id); // Supprimer après rejet
    }
  }

  // Marquer un emprunt comme retourné
  marquerCommeRetourne(id: number) {
    this.empruntsEnCours = this.empruntsEnCours.filter((e) => e.id !== id);
    alert('Emprunt marqué comme retourné !');
  }

  // Retour à la liste des livres
  retour() {
    this.router.navigate(['/livres']);
  }
}
