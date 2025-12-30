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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      // Validamos 8 DIGITOS o Email
      email: ['', [Validators.required, Validators.pattern(/^(\d{8,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true; 
      // Enviamos como 'username' para que Java lo entienda
      const loginData = {
        username: this.loginForm.value.email, 
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (res: any) => {
          const tokenValue = res.token || res; 
          localStorage.setItem('token', tokenValue);
          Swal.fire({ title: '¡Bienvenido!', icon: 'success', timer: 1500, showConfirmButton: false })
            .then(() => this.router.navigate(['/products'])); 
        },
        error: (err) => {
          Swal.fire({ title: 'Error', text: 'Credenciales incorrectas', icon: 'error' });
          this.loading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}