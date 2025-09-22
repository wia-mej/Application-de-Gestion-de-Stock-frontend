import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-nouveau-clt-frs',
  imports: [],
  templateUrl: './nouveau-clt-frs.html',
  styleUrl: './nouveau-clt-frs.scss'
})
export class NouveauCltFrs implements OnInit {


  origin: string = '';

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });

  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ){}

  cancelClick(): void {
    if (this.origin === 'client') {
      this.router.navigate(['client']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['fournisseur']);
    }
  }

  enregistrer(): void{

  }

}
