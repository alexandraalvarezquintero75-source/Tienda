import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { User } from '../../shared/components/models/user.model';

// ¿Qué es? Define la estructura de
// la respuesta que viene del backend cuando haces login.
interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://api.escuelajs.co/api/v1';

  // signals para el estado
  private userProfile = signal<User | null>(null); // Crea un signal privado que puede contener un User o null,
  //  valor inicial, null, nadie ha hecho login

  public currentUser = this.userProfile.asReadonly; //Crea una versión de solo lectura del signal

  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn = this._isLoggedIn.asReadonly(); //asReadonly() convierte  la signal en solo lectura

  constructor(private http: HttpClient) {
    const token = this.getToken(); //Intenta obtener el token del localStorage
    if (token) {
      this.getProfile().subscribe({
        error: () => this.logout(),
      });
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            this._isLoggedIn.set(true);
          }
        }),

        switchMap(() => this.getProfile())
      );
  }

  getProfile(): Observable<User> {
    const token = this.getToken(); //Obtiene el token del localStorage

    return this.http
      .get<User>(`${this.API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        //cuadno llega la respuesta con los datos del usuario
        tap((user) => {
          this.userProfile.set(user); //actualiamos el signal userProfile con esos datos
          console.log('Perfil cargado:', user.role);
        })
      );
  }

  isAdmin(): boolean {
    const user = this.userProfile(); //Lee el valor actual del signal
    return user?.role === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token'); //Retorna el token del localStorage o null si no existe.
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userProfile.set(null);
    this._isLoggedIn.set(false);
  }
  register(data: {
    //Spread operator ...data copia todas las propiedades
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    // const newUser = { ...data, avatar: 'https://picsum.photos/800' };
    const newUser = { ...data, avatar: 'https://placebear.com/640/480' };
    return this.http.post(`${this.API_URL}/users`, newUser);
  }
}
