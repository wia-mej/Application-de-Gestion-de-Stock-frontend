import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-boutton-action',
  imports: [CommonModule],
  templateUrl: './boutton-action.html',
  styleUrl: './boutton-action.scss'
})
export class BouttonAction implements OnInit{

  
  @Input()
  isNouveauVisible = true;
  @Input()
  isExporterVisible = true;
  @Input()
  isImporterVisible = true;

  @Output()
  clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  bouttonNouveauClick(): void {
    this.clickEvent.emit();
  }
}
