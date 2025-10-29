import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { SKIP_LOADER } from '../interceptors/api-response.interceptor';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  role: string;
}
export interface UserProfile {
  userId: number;
  name: string;
  email?: string;
  phone?: string;
  role: 'employee' | 'customer' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}`;
  private userProfiles$ = new BehaviorSubject<UserProfile | null>(null);
  readonly user$ = this.userProfiles$.asObservable();
  private refreshInterval: any;
  isLoggedIn = false;
  private readonly User_PROFILE_KEY = 'userProfile'

  constructor(private http: HttpClient) {
    //  read userinfo saved user profile from browser session storage
   // repopulates your BehaviorSubject/Observable, so all subscribed 
   // components (like navbar, dashboard, etc.) instantly know the user 
   // is already logged in.
    const savedProfile = sessionStorage.getItem(this.User_PROFILE_KEY);
    // If found, convert the JSON string back into an object
    if (savedProfile) {
      this.userProfiles$.next(JSON.parse(savedProfile));
    }
  }

  login(payload: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, payload, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {
      withCredentials: true,
    });
  }

  hasAuthCookie(): boolean {
    // Can't read HttpOnly, but you can infer login from app state (like a flag after login)
    return !!this.isLoggedIn; //!! return a "strict" boolean from a function
  }

  /** Fetch current user profile from backend */
  getUserProfile(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/auth/me`, {
        context: new HttpContext().set(SKIP_LOADER, true),
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          const profile = response.data;
          {
            this.userProfiles$.next(profile);
          }
          sessionStorage.setItem(this.User_PROFILE_KEY, JSON.stringify(profile)); // set profile details on session storage
        })
      );
  }
  //** Initialize session -call once durring app startup**/
  async initUserSession(): Promise<void> {
    return new Promise((resolve) => {
      this.getUserProfile().subscribe({
        next: () => {
          this.startAutoRefresh(); // setup periodic refresh
          resolve();
        },
        error: () => {
          this.clearUserProfile();
          resolve();
        },
      });
    });
  }

          //**Refresh /auth/me every 15min  */
  private startAutoRefresh(): void {
    // Clear any existing timer before creating a new one
    this.stopAutoRefresh();
    const REFRESH_INTERVAL_MS = 10 * 1000; // 10 seconds
    //const REFRESH_INTERVAL_MS = 15 * 60 * 1000; //15 minutes

    this.refreshInterval = window.setInterval(() => {
      //only refresh if user still logged in
      if (this.currentUser) {
        this.getUserProfile().subscribe({
          error: (err) => {
            console.warn('Auto-refresh:', err);
            //if api returns 401/403 - auto logout
            if (err.status === 401 || err.status === 403) {
              this.clearUserProfile();
            }
          },
        });
      }else{
        this.stopAutoRefresh();
      }
    },REFRESH_INTERVAL_MS);
  }


  stopAutoRefresh(){
    if(this.refreshInterval){
      clearInterval(this.refreshInterval);//stops the timer created by setInterval()
      this.refreshInterval = 0;// clears holds the old timer ID
    }
  }
  /** Clear everything on logout */
  clearUserProfile(): void {
    this.userProfiles$.next(null); // clear the observable  
    sessionStorage.removeItem(this.User_PROFILE_KEY);
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval); //angular default function clears the set interval
    }
  }

  get currentUser(): UserProfile | null {
    // return value
    return this.userProfiles$.value;
  }
}
