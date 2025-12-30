import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$')]],
      // Validamos 8 DIGITOS para teléfonos
      username: ['', [Validators.required, Validators.pattern(/^(\d{8,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['Perú', Validators.required]
    });
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: () => {
          Swal.fire('¡Cuenta creada!', 'Ahora puedes iniciar sesión', 'success').then(() => this.router.navigate(['/login']));
        },
        error: (err) => Swal.fire('Error', 'No se pudo registrar.', 'error')
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}