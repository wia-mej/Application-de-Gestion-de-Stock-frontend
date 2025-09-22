import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User as UserService } from '../../services/user/user';
import { Router } from '@angular/router';
import { AuthentificationRequest } from '../../../openapi';
import { FormsModule } from '@angular/forms';
import { AuthentificationResponse } from '../../../openapi';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './page-login.html',
  styleUrl: './page-login.scss'
})
export class PageLogin implements OnInit {


  authentificationRequest: AuthentificationRequest = {}
  errorMessage = '';


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
  this.userService.login(this.authentificationRequest).subscribe({
    next: () => {

      this.router.navigate(['']);
    

  }, error: _ => this.errorMessage = 'Login et / ou mot de passe incorrecte'
  });
}



}
