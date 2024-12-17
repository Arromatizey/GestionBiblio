import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmpruntService } from '../services/emprunt/emprunt.service'; // Import du service

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  demandes: any[] = [];
  empruntsEnCours: any[] = [];

  constructor(private router: Router, private empruntService: EmpruntService) {}

  ngOnInit() {
    // Appeler le service pour récupérer les demandes
    this.loadDemandes();
  }

  loadDemandes() {
    this.empruntService.getEmprunt().subscribe({
      next: (data: { userId: any; livreTitle: any; userName: any; userSurname: any; }) => {
        // Transformer les données reçues pour correspondre au format attendu
        this.demandes = [
          {
            id: data.userId,
            livre: data.livreTitle,
            utilisateur: `${data.userName} ${data.userSurname}`,
            statut: 'En attente',
          },
        ];
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des demandes :', err);
      },
    });
  }

  // Méthode pour valider une demande
  validerDemande(id: number) {
    const demande = this.demandes.find((d) => d.id === id);
    if (demande) {
      demande.statut = 'Validée';
      this.empruntsEnCours.push({
        id: Math.random(),
        livre: demande.livre,
        utilisateur: demande.utilisateur,
        dateRetour: '2024-12-30',
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
