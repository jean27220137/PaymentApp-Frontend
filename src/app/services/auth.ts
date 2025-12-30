import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient) { }

  
  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

 
  register(userData: any) {
    
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  
  logout() {
    localStorage.removeItem('token');
  }
}