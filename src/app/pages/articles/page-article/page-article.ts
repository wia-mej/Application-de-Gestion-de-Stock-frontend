import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pagination } from "../../../composants/pagination/pagination";
import { BouttonAction } from "../../../composants/boutton-action/boutton-action";
import { ProduitsService, ProduitDto } from '../../../../openapi';

@Component({
  selector: 'app-page-article',
  imports: [Pagination, BouttonAction, CommonModule],
  templateUrl: './page-article.html',
  styleUrl: './page-article.scss'
})
export class PageArticle implements OnInit {

  listArticle: Array<ProduitDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private articleService: ProduitsService
  ) { }

  ngOnInit(): void {
    this.findListArticle();
  }

  findListArticle(): void {
    // Pour l'instant, on initialise avec un tableau vide
    // TODO: Implémenter une vraie méthode pour récupérer tous les articles
    this.listArticle = [];
    this.errorMsg = 'Fonctionnalité de chargement des articles à implémenter';
  }

  nouvelArticle(): void {
    this.router.navigate(['nouvelarticle']);
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findListArticle();
    } else {
      this.errorMsg = event;
    }
  }

  trackByArticleId(index: number, article: ProduitDto): number | undefined {
    return article.id;
  }

  modifierArticle(id?: number): void {
    this.router.navigate(['nouvelarticle', id]);
  }

  supprimerArticle(id?: number): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.delete2(id)
        .subscribe({
          next: () => {
            this.findListArticle();
          },
          error: (error: any) => {
            this.errorMsg = error.error?.message || 'Erreur lors de la suppression';
            console.error('Erreur:', error);
          }
        });
    }
  }
}
