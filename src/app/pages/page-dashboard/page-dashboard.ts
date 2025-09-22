import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../composants/menu/menu.component';
import { Header } from "../../composants/header/header";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-dashboard',
  imports: [RouterOutlet, MenuComponent, Header, CommonModule],
  templateUrl: './page-dashboard.html',
  styleUrl: './page-dashboard.scss'
})
export class PageDashboard implements OnInit {
  mobileMenuOpen = false;

  ngOnInit() {
    // Initialisation du dashboard
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
