// src/app/containers/login/login.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  showResetForm = false;
  resetEmail = '';

  constructor(private authService: AuthService,
    private cdr: ChangeDetectorRef) { }

  async onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    try {
      await this.authService.login(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
    this.cdr.detectChanges();
  }

  async onResetPassword() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;
    try {
      await this.authService.resetPassword(this.resetEmail);
    } catch {
      // fehler ignorieren
    } finally {
      this.successMessage = 'Falls ein Konto mit dieser E-Mail existiert, wurde ein Reset-Link gesendet.';
      this.isLoading = false;
      this.cdr.detectChanges(); // ← Angular manuell triggern
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-Mail oder Passwort falsch.';
      case 'auth/too-many-requests':
        return 'Zu viele Versuche. Bitte warte kurz.';
      default:
        return 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
    }
  }
}