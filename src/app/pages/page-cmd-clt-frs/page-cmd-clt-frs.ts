import { Component, OnInit } from '@angular/core';
import { DetailCmdCltFrs } from "../../composants/detail-cmd-clt-frs/detail-cmd-clt-frs";
import { DetailCmd } from "../../composants/detail-cmd/detail-cmd";
import { Pagination } from '../../composants/pagination/pagination';
import { BouttonAction } from '../../composants/boutton-action/boutton-action';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-cmd-clt-frs',
  imports: [DetailCmdCltFrs, DetailCmd, Pagination, BouttonAction, CommonModule],
  templateUrl: './page-cmd-clt-frs.html',
  styleUrl: './page-cmd-clt-frs.scss'
})
export class PageCmdCltFrs implements OnInit{


  origin = '';


   constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  isOpen1: boolean = false;
  isOpen2: boolean = false;

  

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
  }

  // Add any additional methods or lifecycle hooks as necessary

    toggleCollapse(panel: number): void {
    if (panel === 1) {
      this.isOpen1 = !this.isOpen1;
    } else if (panel === 2) {
      this.isOpen2 = !this.isOpen2;
    }
  }

  nouvelleCommande(): void {
    if (this.origin === 'client') {
      this.router.navigate(['nouvellecommandeclt']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouvellecommandefrs']);
    }
  }
}
