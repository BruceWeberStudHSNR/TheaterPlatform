import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

interface NavItem {
  label: string;
  path: string;
  requiresAuth?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  isMenuOpen = false;

  navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Rollenverteilung', path: '/roles', requiresAuth: true },
  ];

  constructor(public authService: AuthService) { }
  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }

  logout(): void {
    this.toggleMenu()
    this.authService.logout()
  }

  visibleItems(): NavItem[] {
    return this.navItems.filter(item =>
      !item.requiresAuth || this.authService.isLoggedIn()
    );
  }
}