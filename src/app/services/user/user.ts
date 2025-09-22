import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthentificationControllerService,
  AuthentificationRequest,
  AuthentificationResponse,
  ChangerMotDePasseUtilisateurDto,
  UtilisateurDto,
  UtilisateursService
} from '../../../openapi';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class User {
    
  private readonly API_BASE = 'http://localhost:8081/api/v1';
  private readonly LS_TOKEN = 'accessToken';
  private readonly LS_USER  = 'connectedUser';

  private userSubject = new BehaviorSubject<UtilisateurDto | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private utilisateursService: UtilisateursService,
    private authentificationService: AuthentificationControllerService,
    private router: Router,
    private http: HttpClient,
  ) {
    // Charger depuis localStorage au démarrage
    const u = this.readUserFromStorage();
    if (u) this.userSubject.next(u);
  }

  // ---------- AUTH ----------
  login(authReq: AuthentificationRequest): Observable<AuthentificationResponse> {
    return this.http.post<AuthentificationResponse>(
      'http://localhost:8081/api/v1/auth/authenticate',
      authReq
    ).pipe(
      tap(response => {
        // Sauvegarde des tokens
        if (response.accessToken) {
          if (this.isBrowser()) {
            localStorage.setItem(this.LS_TOKEN, response.accessToken);
          }
        }

        // Charger ensuite le profil
        this.http.get<UtilisateurDto>('http://localhost:8081/api/v1/auth/profile', {
          headers: this.getAuthHeaders(response.accessToken)
        }).subscribe(user => {
          if (this.isBrowser() && user) {
            localStorage.setItem(this.LS_USER, JSON.stringify(user));
          }
          this.userSubject.next(user); // notifier Angular
        });
      })
    );
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setAccessToken(resp: AuthentificationResponse): void {
    if (this.isBrowser() && resp.accessToken) {
      localStorage.setItem(this.LS_TOKEN, resp.accessToken);
    }
  }

  getAccessToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.LS_TOKEN);
    }
    return null;
  }

  // ---------- PROFIL ----------
  /** Charge le profil depuis /api/v1/auth/profile */
  loadProfile(): Observable<UtilisateurDto> {
    return this.http.get<UtilisateurDto>('http://localhost:8081/api/v1/auth/profile', {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => {
        this.setConnectedUser(user);
      })
    );
  }

  setConnectedUser(user: UtilisateurDto): void {
    this.userSubject.next(user);
    if (this.isBrowser() && user) {
      localStorage.setItem(this.LS_USER, JSON.stringify(user));
    }
  }

  getConnectedUser(): UtilisateurDto | null {
    return this.userSubject.value ?? this.readUserFromStorage();
  }

  private readUserFromStorage(): UtilisateurDto | null {
    if (!this.isBrowser()) return null;
    const raw = localStorage.getItem(this.LS_USER);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { localStorage.removeItem(this.LS_USER); return null; }
  }

  // ---------- UTILITAIRES ----------
  isUserLoggedAndAccessTokenValid(): boolean {
    return !!this.getAccessToken();
  }

  // ---------- CHANGEMENT MDP ----------
  changerMotDePasse(dto: ChangerMotDePasseUtilisateurDto)
      : Observable<ChangerMotDePasseUtilisateurDto> {

    console.log('Service: Tentative de changement de mot de passe');
    
    const user = this.getConnectedUser();
    console.log('Service: Utilisateur connecté:', user);
    
    if (!user?.id) {
      console.error('Service: Utilisateur non chargé');
      throw new Error('Utilisateur non chargé. Veuillez vous reconnecter.');
    }
    
    dto.id = user.id;
    console.log('Service: DTO avec ID:', dto);

    const headers = this.getAuthHeaders();
    console.log('Service: Headers d\'authentification:', headers);

    return this.http.post<ChangerMotDePasseUtilisateurDto>(
      'http://localhost:8081/api/v1/utilisateurs/update/password',
      dto,
      { headers: headers }
    );
  }

  // ---------- DECONNEXION ----------
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.LS_TOKEN);
      localStorage.removeItem(this.LS_USER);
    }
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // ---------- HELPERS ----------
  private getAuthHeaders(token?: string): HttpHeaders {
    const t = token ?? this.getAccessToken();
    let headers = new HttpHeaders();
    if (t && t.trim() !== '') {
      headers = headers.set('Authorization', `Bearer ${t}`);
    }
    return headers;
  }

  register(registerRequest: any): Observable<AuthentificationResponse> {
  return this.http.post<AuthentificationResponse>(
    'http://localhost:8081/api/v1/auth/register',
    registerRequest
  ).pipe(
    tap(response => {
      // Sauvegarde du token après inscription
      if (response.accessToken) {
        this.setAccessToken(response);
        
        // Charger le profil utilisateur immédiatement
        this.loadProfile().subscribe(user => {
          console.log('Profil chargé après inscription:', user);
          // Rediriger vers la page principale ou dashboard
        });
      }
    })
  );
}
}
