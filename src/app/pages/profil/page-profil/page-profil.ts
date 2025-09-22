import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../services/user/user';
import { UtilisateurDto } from '../../../../openapi';

@Component({
  selector: 'app-page-profil',
  imports: [CommonModule],
  templateUrl: './page-profil.html',
  styleUrl: './page-profil.scss'
})
export class PageProfil implements OnInit {

  connectedUser?: UtilisateurDto | null;

  constructor(
    private router: Router,
    private userService: User
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.connectedUser = user;
    });

    // Si pas d'utilisateur connecté, essayer de charger le profil
    if (!this.connectedUser) {
      this.userService.loadProfile().subscribe({
        next: (user) => {
          this.connectedUser = user;
        },
        error: (error) => {
          console.error('Erreur lors du chargement du profil:', error);
          // Rediriger vers la page de connexion si pas d'utilisateur
          this.router.navigate(['/login']);
        }
      });
    }
  }

  modifierMotDePasse(): void {
    this.router.navigate(['changermotdepasse']);
  }

  modifierProfil(): void {
    // Pour l'instant, on reste sur la même page
    // TODO: Implémenter la modification du profil
    console.log('Modification du profil à implémenter');
  }

  rechargerProfil(): void {
    console.log('Rechargement du profil...');
    this.userService.loadProfile().subscribe({
      next: (user) => {
        console.log('Profil rechargé:', user);
        this.connectedUser = user;
      },
      error: (error) => {
        console.error('Erreur lors du rechargement du profil:', error);
        alert('Erreur lors du chargement du profil. Vérifiez votre connexion.');
      }
    });
  }
}