import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {UtilisateurService} from '../utilisateur.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  // constructor(private router: Router) {}

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

  utilisateurs: any[] = [];
  jsonResponse: any;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs(0, 20, []).subscribe(
      (data) => {
        this.utilisateurs = data.content;
        this.jsonResponse = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

}
