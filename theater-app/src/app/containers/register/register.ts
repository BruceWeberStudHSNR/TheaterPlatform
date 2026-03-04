import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  passwordConfirm = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  async onSubmit() {
    this.errorMessage = '';
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Passwörter stimmen nicht überein.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Passwort muss mindestens 6 Zeichen lang sein.';
      return;
    }
    this.isLoading = true;
    try {
      await this.authService.register(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Diese E-Mail ist bereits registriert.';
      case 'auth/invalid-email':
        return 'Ungültige E-Mail Adresse.';
      case 'auth/weak-password':
        return 'Passwort ist zu schwach.';
      default:
        return 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
    }
  }
}