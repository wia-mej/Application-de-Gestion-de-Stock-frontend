import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SimpleEntrepriseDto {
  nom: string;
  description: string;
  codeFiscal: string;  // Backend expects codeFiscal, not codefiscal
  email: string;
  telephone: string;   // Backend expects telephone, not numtel
  siteWeb?: string;    // Backend expects siteWeb, not siteweb
  photo?: string;
  adresse: {
    adresse1: string;
    adresse2?: string;
    ville: string;
    codePostale: string;  // Backend expects codePostale, not codepostale
    pays: string;
  };
}

export interface RegistrationResponse {
  id: number;
  nom: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'http://localhost:8081/gestiondestock/v1/entreprises';

  constructor(private http: HttpClient) { }

  /**
   * Register a new enterprise without JWT authentication
   */
  registerEnterprise(entreprise: SimpleEntrepriseDto): Observable<RegistrationResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Do NOT include Authorization header
    });

    return this.http.post<RegistrationResponse>(
      `${this.baseUrl}/create`,
      entreprise,
      { headers }
    );
  }

  /**
   * Check if backend is running
   */
  checkBackendHealth(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<any[]>(
      `${this.baseUrl}/all`,
      { headers }
    );
  }
}
