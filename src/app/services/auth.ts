import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
// Importamos tu modelo (Asegúrate de haber creado este archivo como vimos antes)
import { RegisterRequest } from '../models/register-request.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // CORRECCIÓN: URL directa para no depender del archivo environment que falta
  private apiUrl = 'http://localhost:8080/auth';
  
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Mapeamos 'email' a 'username' si el backend lo requiere así, o enviamos credentials directo
    return this.http.post<any>(`${this.apiUrl}/login`, {
      username: credentials.email, 
      password: credentials.password
    }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}