import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  loading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; 

    
      this.authService.login(this.loginForm.value).subscribe({
        next: (token) => {
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión correcto',
            icon: 'success',
            timer: 1500, 
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/dashboard']); 
          });
        },
        error: (err) => {
        
          console.error(err);
          Swal.fire({
            title: 'Error de acceso',
            text: 'Correo o contraseña incorrectos',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Intentar de nuevo'
          });
          this.loading = false;
        }
      });

    } else {
      
      this.loginForm.markAllAsTouched();
      
     
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Por favor completa todos los campos correctamente'
      });
    }
  }
}