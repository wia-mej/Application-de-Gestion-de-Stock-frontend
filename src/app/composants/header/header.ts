import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../services/user/user';
import { UtilisateurDto } from '../../../openapi';
import { CommonModule } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  connectedUser?: UtilisateurDto | null;

  constructor( 
    private userService: User,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  ngOnInit() {
    this.userService.user$.subscribe(u => {
      this.connectedUser = u;
      console.log('Header: Utilisateur connecté:', u);
    });
    
    if (isPlatformBrowser(this.platformId) && !this.connectedUser) {
      // au besoin, tenter de recharger profil si accessToken existe
      const token = this.userService.getAccessToken();
      console.log('Header: Token trouvé:', token);
      if (token) {
        this.userService.loadProfile().subscribe({
          next: (user) => {
            console.log('Header: Profil chargé:', user);
            this.connectedUser = user;
          },
          error: (error) => {
            console.error('Header: Erreur chargement profil:', error);
          }
        });
      }
    }
  }
}