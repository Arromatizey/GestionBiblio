import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionService } from '../services/inscription/inscription.service';
import { AppComponent } from '../app.component'; // Import pour accéder à AppComponent

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  // Objet pour stocker les données de l'utilisateur
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private inscriptionService: InscriptionService, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  onInscription() {
    if (this.user.password !== this.user.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Appeler le service pour enregistrer l'utilisateur
    this.inscriptionService.register(this.user.nom, this.user.prenom, this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log("Réponse du backend :", response);

        // Mettre à jour l'ID de l'utilisateur dans AppComponent
        AppComponent.userID = response.utilisateur.id;

        // Rediriger vers la page des livres
        this.router.navigate(['/livres']);
      },
      error: (err) => {
        console.error("Erreur lors de l'inscription :", err);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/connexion']);
  }

}

