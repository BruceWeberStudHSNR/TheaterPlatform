import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-pending',
  standalone: true,
  templateUrl: './pending.html'
})
export class PendingComponent {
  constructor(private authService: AuthService) {}

  async logout() {
    await this.authService.logout();
  }
}