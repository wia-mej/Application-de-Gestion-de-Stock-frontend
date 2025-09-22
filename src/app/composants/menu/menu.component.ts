import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';    
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss',]
})
export class MenuComponent implements OnInit {

  public menuProperties: Array<Menu> = [
    {
    id: '1',
    titre: 'Tableau de bord',
    icon: 'fas fa-chart-line',
    url: '',
    sousMenu: [
      {
        id: '11',
        titre: 'Vue d\'ensemble',
        icon: 'fas fa-chart-pie',
        url: ''
      },
      {
        id: '12',
        titre: 'Statistiques',
        icon: 'fas fa-chart-bar',
        url: 'statistiques'
      }
    ]
  },
    {
      id: '2',
      titre: 'Articles',
      icon: 'fas fa-boxes',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'fas fa-boxes',
          url: 'articles'
        },
        {
          id: '22',
          titre: 'Mouvements du stock',
          icon: 'fab fa-stack-overflow',
          url: 'mvtstk'
        }
      ]
    },
    {
      id: '3',
      titre: 'Client',
      icon: 'fas fa-users',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Client',
          icon: 'fas fa-users',
          url: 'client'
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'fas fa-shopping-basket',
          url: 'commandeclient'
        }
      ]
    },
    {
      id: '4',
      titre: 'Fournisseur',
      icon: 'fas fa-users',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseur',
          icon: 'fas fa-users',
          url: 'fournisseur'
        },
        {
          id: '42',
          titre: 'Commandes fournisseurs',
          icon: 'fas fa-truck',
          url: 'commandefournisseur'
        }
      ]
    },
    {
      id: '5',
      titre: 'Parametrages',
      icon: 'fas fa-cogs',
      url: '',
      sousMenu: [
        {
          id: '51',
          titre: 'Categories',
          icon: 'fas fa-tools',
          url: 'categories'
        },
        {
          id: '52',
          titre: 'Utilisateur',
          icon: 'fas fa-users-cog',
          url: 'utilisateur'
        }
      ]
    }
  ];

  private lastSelectedMenu: Menu | undefined;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(menu: Menu): void {
    if (this.lastSelectedMenu) {
      this.lastSelectedMenu.active = false;
    }
    menu.active = true;
    this.lastSelectedMenu = menu;
    this.router.navigate([menu.url]);
  }

  toggleMenu(menu: Menu): void {
    // Fermer tous les autres menus d'abord
    this.menuProperties.forEach(m => {
      if (m.id !== menu.id) {
        m.active = false;
        // Fermer aussi tous les sous-menus actifs
        if (m.sousMenu) {
          m.sousMenu.forEach(sm => sm.active = false);
        }
      }
    });
    
    // Toggle le menu sélectionné
    menu.active = !menu.active;
    
    // Si on ferme le menu, fermer aussi le sous-menu actif
    if (!menu.active && this.lastSelectedMenu) {
      this.lastSelectedMenu.active = false;
      this.lastSelectedMenu = undefined;
    }
  }

}
 