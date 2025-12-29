import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importante para simular HTTP
import { AuthService } from './auth'; // <--- CORREGIDO: Importamos AuthService

describe('AuthService', () => {
  let service: AuthService; // <--- CORREGIDO: Tipo AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <--- Necesario porque tu servicio usa HttpClient
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService); // <--- CORREGIDO: Inyectamos AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});