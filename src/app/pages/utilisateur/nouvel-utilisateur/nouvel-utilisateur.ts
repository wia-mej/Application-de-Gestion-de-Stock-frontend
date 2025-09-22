import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-nouvel-utilisateur',
  imports: [],
  templateUrl: './nouvel-utilisateur.html',
  styleUrl: './nouvel-utilisateur.scss'
})
export class NouvelUtilisateur {

   constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['utilisateur']);
  }

  enregistrer(): void {
    this.router.navigate(['statistiques']);
  }

}
