import { Injectable } from '@angular/core';
import { EntrepriseDto, EntreprisesService } from '../../../openapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Entreprise {
  constructor(
    private entrepriseService: EntreprisesService
  ) { }

  sinscrire(entreprise : EntrepriseDto) : Observable<EntrepriseDto> {
    return this.entrepriseService.save4(entreprise);
  }
}
