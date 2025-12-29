import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { RegisterRequest } from '../models/register-request.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  
  user: RegisterRequest = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    country: ''
  };

  loading = false;
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signup() {
    if (!this.user.email || !this.user.password) {
      Swal.fire('Error', 'Por favor completa los campos obligatorios', 'warning');
      return;
    }

    this.loading = true;
    
    this.authService.register(this.user).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tu cuenta ha sido creada correctamente',
          icon: 'success',
          confirmButtonColor: '#53B175',
          confirmButtonText: 'Ir al Dashboard'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrarse. Intenta nuevamente.',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
        this.loading = false;
      }
    });
  }
}