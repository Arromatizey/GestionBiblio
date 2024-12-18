import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Importer le service AuthService
import { AppComponent } from '../app.component'; // Pour accéder à AppComponent et modifier userID
import { FormsModule } from '@angular/forms'; // Importer AppComponent pour modifier userID

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [
    FormsModule
  ]
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onConnexion() {
    // Appel au service pour récupérer les données de connexion
    this.authService.getAuth(this.email, this.password).subscribe(
      (response: { user: { id: number }; }) => {
        // Si la connexion réussit, on sauvegarde l'ID utilisateur
        AppComponent.userID = response.user.id;
        AppComponent.role = response.user;
        console.log('Utilisateur connecté : ', AppComponent.userID);

        // Logique de redirection vers la page des livres
        this.router.navigate(['/livres']);
      },
      (error: any) => {
        // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
        console.error('Erreur de connexion : ', error);
      }
    );
  }

  onSubscribe() {
    this.router.navigate(['/inscription']);
  }
}
