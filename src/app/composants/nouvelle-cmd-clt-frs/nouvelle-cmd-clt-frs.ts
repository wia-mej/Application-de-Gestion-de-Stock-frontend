import { Component } from '@angular/core';
import { DetailCmd } from '../detail-cmd/detail-cmd';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  imports: [DetailCmd, CommonModule],
  templateUrl: './nouvelle-cmd-clt-frs.html',
  styleUrl: './nouvelle-cmd-clt-frs.scss'
})

export class NouvelleCmdCltFrs {

  origin: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
  }
}
