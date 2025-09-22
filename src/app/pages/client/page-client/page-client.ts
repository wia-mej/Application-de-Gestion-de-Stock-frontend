import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { Pagination } from '../../../composants/pagination/pagination';
import { ClientsService, ClientDto } from '../../../../openapi';

@Component({
  selector: 'app-page-client',
  imports: [BouttonAction, Pagination, CommonModule],
  templateUrl: './page-client.html',
  styleUrl: './page-client.scss'
})
export class PageClient implements OnInit {

  listClient: Array<ClientDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {
    this.findAllClients();
  }

  findAllClients(): void {
    this.clientService.findAll7()
      .subscribe({
        next: (clients: ClientDto[]) => {
          this.listClient = clients;
        },
        error: (error: any) => {
          this.errorMsg = error.error?.message || 'Erreur lors du chargement des clients';
          console.error('Erreur:', error);
        }
      });
  }

  nouveauClient(): void {
    this.router.navigate(['nouveauclient']);
  }

  modifierClient(id?: number): void {
    this.router.navigate(['nouveauclient', id]);
  }

  supprimerClient(id?: number): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.delete7(id)
        .subscribe({
          next: () => {
            this.findAllClients();
          },
          error: (error: any) => {
            this.errorMsg = error.error?.message || 'Erreur lors de la suppression';
            console.error('Erreur:', error);
          }
        });
    }
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllClients();
    } else {
      this.errorMsg = event;
    }
  }

  trackByClientId(index: number, client: ClientDto): number | undefined {
    return client.id;
  }
}
