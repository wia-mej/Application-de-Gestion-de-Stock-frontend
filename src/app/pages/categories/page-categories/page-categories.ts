import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { Pagination } from '../../../composants/pagination/pagination';
import { CategoriesService, Categorydto } from '../../../../openapi';

@Component({
  selector: 'app-page-categories',
  imports: [BouttonAction, Pagination, CommonModule],
  templateUrl: './page-categories.html',
  styleUrl: './page-categories.scss'
})
export class PageCategories implements OnInit {

  listCategories: Categorydto[] = [];
  selectedCatIdToDelete: number = -1;
  errorMsgs: string = '';

  constructor(
    private router: Router,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.findAllCategories();
  }

  nouvelleCategory(): void {
    this.router.navigate(['nouvellecategorie']);
  }

  findAllCategories(): void {
    this.categoryService.findAll8()
      .subscribe({
        next: (res: Categorydto[]) => {
          this.listCategories = res;
        },
        error: (error: any) => {
          this.errorMsgs = error.error?.message || 'Erreur lors du chargement des catégories';
          console.error('Erreur:', error);
        }
      });
  }

  modifierCategory(id?: number): void {
    this.router.navigate(['nouvellecategorie', id]);
  }

  confirmerEtSupprimerCat(): void {
    if (this.selectedCatIdToDelete !== -1) {
      this.categoryService.delete8(this.selectedCatIdToDelete)
        .subscribe({
          next: (res: any) => {
            this.findAllCategories();
            this.selectedCatIdToDelete = -1;
          },
          error: (error: any) => {
            this.errorMsgs = error.error?.message || 'Erreur lors de la suppression';
            console.error('Erreur:', error);
          }
        });
    }
  }

  annulerSuppressionCat(): void {
    this.selectedCatIdToDelete = -1;
  }

  selectCatPourSupprimer(id?: number): void {
    this.selectedCatIdToDelete = id || -1;
  }

  trackByCategoryId(index: number, category: Categorydto): number | undefined {
    return category.id;
  }
}
