import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RequestService } from 'src/app/core/request.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './home.html'
})
export class HomeComponent {
  email = '';
  loading = false;
  success = false;
  error = '';

  constructor(private requestService: RequestService, private cdr: ChangeDetectorRef) { }

  async submit() {
    if (!this.email || !this.email.includes('@')) {
      this.error = 'Bitte gib eine gültige E-Mail ein.';
      this.cdr.detectChanges();
      return;
    }
    this.loading = true;
    this.error = '';
    try {
      await this.requestService.requestAccount(this.email);
      this.success = true;
      this.email = '';
    } catch (e) {
      this.error = 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}