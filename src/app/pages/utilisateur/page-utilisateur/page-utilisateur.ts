import { Component } from '@angular/core';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { Pagination } from '../../../composants/pagination/pagination';
import { Router } from '@angular/router';
import { DetailUtilisateur } from '../../../composants/detail-utilisateur/detail-utilisateur';

@Component({
  selector: 'app-page-utilisateur',
  imports: [BouttonAction, Pagination, DetailUtilisateur],
  templateUrl: './page-utilisateur.html',
  styleUrl: './page-utilisateur.scss'
})
export class PageUtilisateur {

   constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }
}
