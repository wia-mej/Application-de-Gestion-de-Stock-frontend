import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService, Categorydto } from '../../../../openapi';

@Component({
  selector: 'app-nouvelle-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './nouvelle-category.html',
  styleUrl: './nouvelle-category.scss'
})
export class NouvelleCategory implements OnInit {

  categoryDto: Categorydto = {};
  errorMsg: Array<string> = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    const idCategory = this.activatedRoute.snapshot.params['idCategory'];
    if (idCategory) {
      this.categoryService.findById8(parseInt(idCategory))
        .subscribe({
          next: (cat: Categorydto) => {
            this.categoryDto = cat;
          },
          error: (error: any) => {
            this.errorMsg = error.error?.errors || ['Erreur lors du chargement de la catégorie'];
            console.error('Erreur:', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['categories']);
  }

  enregistrerCategory(): void {
    if (!this.categoryDto.code || !this.categoryDto.designation) {
      this.errorMsg = ['Le code et la désignation sont obligatoires'];
      return;
    }

    this.isLoading = true;
    this.errorMsg = [];

    this.categoryService.save8(this.categoryDto)
      .subscribe({
        next: (res: Categorydto) => {
          this.isLoading = false;
          this.router.navigate(['categories']);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMsg = error.error?.errors || ['Erreur lors de l\'enregistrement'];
          console.error('Erreur:', error);
        }
      });
  }
}
