import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { Pagination } from '../../../composants/pagination/pagination';
import { FournisseursService, FournisseurDto } from '../../../../openapi';

@Component({
  selector: 'app-page-fournisseur',
  imports: [BouttonAction, Pagination, CommonModule],
  templateUrl: './page-fournisseur.html',
  styleUrl: './page-fournisseur.scss'
})
export class PageFournisseur implements OnInit {

  listFournisseur: Array<FournisseurDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private fournisseurService: FournisseursService
  ) { }

  ngOnInit(): void {
    this.findAllFournisseurs();
  }

  findAllFournisseurs(): void {
    this.fournisseurService.findAll3()
      .subscribe({
        next: (fournisseurs: FournisseurDto[]) => {
          this.listFournisseur = fournisseurs;
        },
        error: (error: any) => {
          this.errorMsg = error.error?.message || 'Erreur lors du chargement des fournisseurs';
          console.error('Erreur:', error);
        }
      });
  }

  nouveauFournisseur(): void {
    this.router.navigate(['nouveaufournisseur']);
  }

  modifierFournisseur(id?: number): void {
    this.router.navigate(['nouveaufournisseur', id]);
  }

  supprimerFournisseur(id?: number): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurService.delete3(id)
        .subscribe({
          next: () => {
            this.findAllFournisseurs();
          },
          error: (error: any) => {
            this.errorMsg = error.error?.message || 'Erreur lors de la suppression';
            console.error('Erreur:', error);
          }
        });
    }
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllFournisseurs();
    } else {
      this.errorMsg = event;
    }
  }

  trackByFournisseurId(index: number, fournisseur: FournisseurDto): number | undefined {
    return fournisseur.id;
  }
}
