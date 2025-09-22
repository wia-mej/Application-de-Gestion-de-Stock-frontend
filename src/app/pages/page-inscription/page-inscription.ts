import { Component, NgModule } from '@angular/core';
import { AdresseDto, AuthentificationRequest, EntrepriseDto, EntreprisesService, UtilisateursService } from '../../../openapi';
import { Entreprise } from '../../services/entreprise/entreprise';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-page-inscription',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './page-inscription.html',
  styleUrl: './page-inscription.scss'
})
export class PageInscription {
  
  errorsMsg: string[] = [];
  entrepriseDto: EntrepriseDto = {};
  adresse: AdresseDto = {};


  constructor(
    private entrepriseService: Entreprise,
    private router: Router,
    private userService: User,
  ) {}


  inscrire(): void {
    this.errorsMsg = [];
    this.entrepriseDto.adresse = this.adresse;
    this.entrepriseService.sinscrire(this.entrepriseDto)
    .subscribe(entrepriseDto => {
      this.connectEntreprise();
    }, error => {
      this.errorsMsg.push('Inscription refusée : ' + (error?.status || 'erreur serveur'));
      console.error(error);     
    });
  }

  connectEntreprise(): void {
    const authentificationRequest : AuthentificationRequest = {
        email: this.entrepriseDto.email,
        password: 'som3R@nd0mP@$$word'
      };
      this.userService.login(authentificationRequest).subscribe({
    next: () => {
      localStorage.setItem('origin', 'inscription');
      this.router.navigateByUrl('changermotdepasse');
    },
    error: err => {
      console.error("Erreur lors de la connexion après inscription", err);
    }
  });
  }

  
}
