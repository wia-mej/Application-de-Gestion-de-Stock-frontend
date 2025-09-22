import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitsService, ProduitDto } from '../../../../openapi';
import { CategoriesService, Categorydto } from '../../../../openapi';

@Component({
  selector: 'app-nouvel-article',
  imports: [CommonModule, FormsModule],
  templateUrl: './nouvel-article.html',
  styleUrl: './nouvel-article.scss'
})
export class NouvelArticle implements OnInit {

  articleDto: ProduitDto = {};
  categorieDto: Categorydto = {};
  listeCategorie: Array<Categorydto> = [];
  errorMsg: Array<string> = [];
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/product.png';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ProduitsService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoryService.findAll8()
      .subscribe({
        next: (categories: Categorydto[]) => {
          this.listeCategorie = categories;
        },
        error: (error: any) => {
          this.errorMsg = ['Erreur lors du chargement des catégories'];
          console.error('Erreur:', error);
        }
      });

    const idArticle = this.activatedRoute.snapshot.params['idArticle'];
    if (idArticle) {
      this.articleService.findById2(parseInt(idArticle))
        .subscribe({
          next: (article: ProduitDto) => {
            this.articleDto = article;
            this.categorieDto = this.articleDto.category ? this.articleDto.category : {};
          },
          error: (error: any) => {
            this.errorMsg = ['Erreur lors du chargement de l\'article'];
            console.error('Erreur:', error);
          }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['articles']);
  }

  enregistrerArticle(): void {
    if (!this.articleDto.codeProduit || !this.articleDto.designation) {
      this.errorMsg = ['Le code produit et la désignation sont obligatoires'];
      return;
    }

    this.isLoading = true;
    this.errorMsg = [];
    this.articleDto.category = this.categorieDto;

    this.articleService.save2(this.articleDto)
      .subscribe({
        next: (art: ProduitDto) => {
          this.isLoading = false;
          this.router.navigate(['articles']);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMsg = error.error?.errors || ['Erreur lors de l\'enregistrement'];
          console.error('Erreur:', error);
        }
      });
  }

  calculerTTC(): void {
    if (this.articleDto.prixUnitaire && this.articleDto.tauxTva) {
      // prixHT + (prixHT * (tauxTVA / 100))
      this.articleDto.prixTTC =
        +this.articleDto.prixUnitaire + (+(this.articleDto.prixUnitaire * (this.articleDto.tauxTva / 100)));
    }
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  trackByCategoryId(index: number, category: Categorydto): number | undefined {
    return category.id;
  }
}
