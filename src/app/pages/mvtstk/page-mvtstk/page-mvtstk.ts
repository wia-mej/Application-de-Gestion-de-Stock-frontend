import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pagination } from "../../../composants/pagination/pagination";
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { MouvementsStockService, MvmStockDto, ProduitsService, ProduitDto } from '../../../../openapi';

@Component({
  selector: 'app-page-mvtstk',
  imports: [Pagination, BouttonAction, CommonModule, FormsModule],
  templateUrl: './page-mvtstk.html',
  styleUrl: './page-mvtstk.scss'
})
export class PageMvtstk implements OnInit {

  // États des panneaux
  isOpen1: boolean = false;
  isOpen2: boolean = false;

  // Données
  listMouvements: MvmStockDto[] = [];
  listProduits: ProduitDto[] = [];
  selectedProduit: ProduitDto | null = null;
  errorMsg = '';

  // Formulaire de mouvement
  nouveauMouvement: MvmStockDto = {
    quantite: 0,
    typeMvt: 'ENTREE',
    sourceMvt: 'COMMANDE_FOURNISSEUR'
  };

  // Types de mouvements
  typesMouvement = [
    { value: 'ENTREE', label: 'Entrée de stock' },
    { value: 'SORTIE', label: 'Sortie de stock' },
    { value: 'CORRECTION_POS', label: 'Correction positive' },
    { value: 'CORRECTION_NEG', label: 'Correction négative' }
  ];

  sourcesMouvement = [
    { value: 'COMMANDE_FOURNISSEUR', label: 'Commande fournisseur' },
    { value: 'COMMANDE_CLIENT', label: 'Commande client' },
    { value: 'VENTE', label: 'Vente' }
  ];

  constructor(
    private mvtStockService: MouvementsStockService,
    private produitsService: ProduitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits(): void {
    // Pour l'instant, on initialise avec un tableau vide
    // TODO: Implémenter une vraie méthode pour récupérer tous les produits
    this.listProduits = [];
  }

  loadMouvements(produitId: number): void {
    this.mvtStockService.mvtStkProduit(produitId)
      .subscribe({
        next: (mouvements: MvmStockDto[]) => {
          this.listMouvements = mouvements;
        },
        error: (error: any) => {
          this.errorMsg = error.error?.message || 'Erreur lors du chargement des mouvements';
          console.error('Erreur:', error);
        }
      });
  }

  toggleCollapse(panel: number): void {
    if (panel === 1) {
      this.isOpen1 = !this.isOpen1;
      if (this.isOpen1 && this.selectedProduit) {
        this.loadMouvements(this.selectedProduit.id!);
      }
    } else if (panel === 2) {
      this.isOpen2 = !this.isOpen2;
    }
  }

  selectProduit(produit: ProduitDto): void {
    this.selectedProduit = produit;
    this.loadMouvements(produit.id!);
  }

  enregistrerMouvement(): void {
    if (!this.selectedProduit || !this.nouveauMouvement.quantite) {
      this.errorMsg = 'Veuillez sélectionner un produit et saisir une quantité';
      return;
    }

    this.nouveauMouvement.produit = this.selectedProduit;
    this.nouveauMouvement.dateMvt = new Date().toISOString();

    let serviceCall;
    switch (this.nouveauMouvement.typeMvt) {
      case 'ENTREE':
        serviceCall = this.mvtStockService.entreeStock(this.nouveauMouvement);
        break;
      case 'SORTIE':
        serviceCall = this.mvtStockService.sortieStock(this.nouveauMouvement);
        break;
      case 'CORRECTION_POS':
        serviceCall = this.mvtStockService.correctionStockPos(this.nouveauMouvement);
        break;
      case 'CORRECTION_NEG':
        serviceCall = this.mvtStockService.correctionStockNeg(this.nouveauMouvement);
        break;
      default:
        this.errorMsg = 'Type de mouvement invalide';
        return;
    }

    serviceCall.subscribe({
      next: (mouvement: MvmStockDto) => {
        this.errorMsg = '';
        this.nouveauMouvement = {
          quantite: 0,
          typeMvt: 'ENTREE',
          sourceMvt: 'COMMANDE_FOURNISSEUR'
        };
        if (this.selectedProduit) {
          this.loadMouvements(this.selectedProduit.id!);
        }
      },
      error: (error: any) => {
        this.errorMsg = error.error?.message || 'Erreur lors de l\'enregistrement du mouvement';
        console.error('Erreur:', error);
      }
    });
  }

  getTypeMouvementLabel(type: string): string {
    const typeObj = this.typesMouvement.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  }

  getSourceMouvementLabel(source: string): string {
    const sourceObj = this.sourcesMouvement.find(s => s.value === source);
    return sourceObj ? sourceObj.label : source;
  }

  trackByMouvementId(index: number, mouvement: MvmStockDto): number | undefined {
    return mouvement.id;
  }

  trackByProduitId(index: number, produit: ProduitDto): number | undefined {
    return produit.id;
  }
}
