import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LivresComponent } from './livres/livres.component';
import { ValidationComponent } from './validation/validation.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {InscriptionComponent} from './inscription/inscription.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'livres', component: LivresComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'inscription', component : InscriptionComponent}
];
