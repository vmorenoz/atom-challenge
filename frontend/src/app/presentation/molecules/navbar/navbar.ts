import {Component, inject} from '@angular/core';
import {AuthService} from '@data/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  async handleLogout() {
    await this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
