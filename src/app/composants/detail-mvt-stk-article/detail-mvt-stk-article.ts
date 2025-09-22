import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-mvt-stk-article',
  imports: [CommonModule],
  templateUrl: './detail-mvt-stk-article.html',
  styleUrl: './detail-mvt-stk-article.scss'
})
export class DetailMvtStkArticle implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here
  }

  
  showDeleteModal = false;

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }


}
