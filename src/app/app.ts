import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLogin } from "./pages/page-login/page-login";
import { PageInscription } from "./pages/page-inscription/page-inscription";
import { PageArticle } from './pages/articles/page-article/page-article';
import { DetailArticle } from './composants/detail-article/detail-article';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PageDashboard } from './pages/page-dashboard/page-dashboard';
import { AuthInterceptor } from './services/interceptor/Auth-interceptor';
import { ChangerMotDePasse } from './pages/profil/changer-mot-de-passe/changer-mot-de-passe';
import { PageProfil } from './pages/profil/page-profil/page-profil';
import { NouvelUtilisateur } from './pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur';
import { DetailUtilisateur } from './composants/detail-utilisateur/detail-utilisateur';
import { PageUtilisateur } from './pages/utilisateur/page-utilisateur/page-utilisateur';
import { NouvelleCategory } from './pages/categories/nouvelle-category/nouvelle-category';
import { PageCategories } from './pages/categories/page-categories/page-categories';
import { NouvelleCmdCltFrs } from './composants/nouvelle-cmd-clt-frs/nouvelle-cmd-clt-frs';
import { PageCmdCltFrs } from './pages/page-cmd-clt-frs/page-cmd-clt-frs';
import { DetailCmd } from './composants/detail-cmd/detail-cmd';
import { DetailCltFrs } from './composants/detail-clt-frs/detail-clt-frs';
import { NouveauCltFrs } from './composants/nouveau-clt-frs/nouveau-clt-frs';
import { PageFournisseur } from './pages/fournisseur/page-fournisseur/page-fournisseur';
import { PageClient } from './pages/client/page-client/page-client';
import { DetailMvtStk } from './composants/detail-mvt-stk/detail-mvt-stk';
import { DetailMvtStkArticle } from './composants/detail-mvt-stk-article/detail-mvt-stk-article';
import { PageMvtstk } from './pages/mvtstk/page-mvtstk/page-mvtstk';
import { NouvelArticle } from './pages/articles/nouvel-article/nouvel-article';
import { BouttonAction } from './composants/boutton-action/boutton-action';
import { Pagination } from './composants/pagination/pagination';
import { Header } from './composants/header/header';
import { MenuComponent } from './composants/menu/menu.component';
import { PageStatistiques } from './pages/page-statistiques/page-statistiques';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    PageLogin, 
    PageInscription, 
    PageArticle ,
    DetailArticle, 
    FormsModule,
    HttpClientModule,
    PageDashboard,
    ChangerMotDePasse,
    PageProfil,
    NouvelUtilisateur,
    DetailUtilisateur,
    PageUtilisateur,
    NouvelleCategory,
    PageCategories,
    NouvelleCmdCltFrs,
    PageCmdCltFrs,
    DetailCmd,
    DetailCltFrs,
    NouveauCltFrs,
    PageFournisseur,
    PageClient,
    DetailMvtStk,
    DetailMvtStkArticle,
    PageMvtstk,
    NouvelArticle,
    BouttonAction,
    Pagination,
    Header,
    MenuComponent,
    PageStatistiques,
    



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Gestion De Stock');
}
