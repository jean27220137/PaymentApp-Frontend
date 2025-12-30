import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode"; // <--- IMPORTANTE: Importar esto

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; // Tu URL real

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // --- NUEVO MÉTODO: ¿Está vencido el token? ---
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true; // Si no hay token, cuenta como vencido

    try {
      const decoded: any = jwtDecode(token);
      const fechaExpiracion = decoded.exp * 1000; // Convertir a milisegundos
      const ahora = Date.now();

      // Si la fecha de expiración es MENOR a ahora, ya venció
      return fechaExpiracion < ahora; 
    } catch (error) {
      return true; // Si el token está corrupto, cuenta como vencido
    }
  }

  // Método para cerrar sesión limpio
  logout() {
    localStorage.removeItem('token');
  }
}