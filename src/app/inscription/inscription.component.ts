import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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

  constructor() {}

  // Méthode appelée lors de la soumission du formulaire
  onInscription() {
    if (this.user.password !== this.user.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    console.log("Informations d'inscription :", this.user);
    // Ici, tu pourras ajouter la logique pour envoyer les données au backend
    // Par exemple : this.authService.register(this.user).subscribe(...)
  }
}
