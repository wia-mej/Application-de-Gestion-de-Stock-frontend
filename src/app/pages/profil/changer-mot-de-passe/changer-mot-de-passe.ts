import { Component, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, ChangerMotDePasseUtilisateurDto } from '../../../../openapi';
import { User } from '../../../services/user/user';
import { FormsModule } from '@angular/forms';
import { OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-changer-mot-de-passe',
  imports: [FormsModule, CommonModule],
  templateUrl: './changer-mot-de-passe.html',
  styleUrl: './changer-mot-de-passe.scss'
})
export class ChangerMotDePasse implements OnInit {

  changerMotDePasseDto: ChangerMotDePasseUtilisateurDto = {};
  ancienMotDePasse = '';
  isLoading = false;

  constructor(
    private router: Router,
    private userService: User,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Vérifier si on est dans le navigateur avant d'accéder à localStorage
    if (isPlatformBrowser(this.platformId)) {
      const origin = localStorage.getItem('origin');
      if (origin && origin === 'inscription') {
        this.ancienMotDePasse = 'som3R@nd0mP@$$word';
        localStorage.removeItem('origin');
      }
    }
  }


  cancel(): void {
    this.router.navigate(['profil']);
  }

  changerMotDePasseUtilisateur() {
    // Validation des champs
    if (!this.changerMotDePasseDto.motDePasse || !this.changerMotDePasseDto.confirmMotDePasse) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (this.changerMotDePasseDto.motDePasse !== this.changerMotDePasseDto.confirmMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    this.isLoading = true;
    console.log('Tentative de changement de mot de passe...');
    
    const dto: ChangerMotDePasseUtilisateurDto = {
      motDePasse: this.changerMotDePasseDto.motDePasse,
      confirmMotDePasse: this.changerMotDePasseDto.confirmMotDePasse,
      // pas d'id ici -> ajouté dans le service
    };

    this.userService.changerMotDePasse(dto).subscribe({
      next: (response) => {
        console.log('Changement de mot de passe réussi:', response);
        this.isLoading = false;
        alert('Mot de passe changé avec succès !');
        this.router.navigate(['profil']);
      },
      error: (err) => {
        console.error('Erreur lors du changement de mot de passe:', err);
        this.isLoading = false;
        alert('Erreur lors du changement de mot de passe: ' + (err.error?.message || err.message || 'Erreur inconnue'));
      }
    });
  }

}