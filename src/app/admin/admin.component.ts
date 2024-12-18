import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AdminService} from '../services/admin/admin.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  utilisateurs: any[] = []; // Liste des utilisateurs
  page: number = 0; // Page courante pour la pagination
  size: number = 21; // Taille de la page

  constructor(private router: Router, private userService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Charger les utilisateurs depuis l'API
  loadUsers() {
    this.userService.getUsers(this.page, this.size).subscribe({
      next: (data: any) => {
        const bibliothecaires = data._embedded?.bibliothecaires || [];
        const membres = data._embedded?.membres || [];

        // Fusionner les bibliothécaires et membres dans un tableau unique avec leur rôle
        this.utilisateurs = [
          ...bibliothecaires.map((user: any) => ({
            id: user._links.self.href.split('/').pop(),
            nom: `${user.prenom} ${user.nom}`,
            statut: 'Libraire',
          })),
          ...membres.map((user: any) => ({
            id: user._links.self.href.split('/').pop(),
            nom: `${user.prenom} ${user.nom}`,
            statut: 'Lecteur',
          }))
        ];
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
  }

  // Changer le statut d'un utilisateur
  changerStatut(utilisateur: any) {
    // Logique pour changer le statut (ajoutez votre propre logique ici si nécessaire)
    utilisateur.statut = utilisateur.statut === 'Libraire' ? 'Lecteur' : 'Libraire';
    alert(`Le statut de ${utilisateur.nom} a été changé en ${utilisateur.statut}`);
  }

  // Retour à la page des livres
  retour() {
    this.router.navigate(['/livres']);
  }
}
