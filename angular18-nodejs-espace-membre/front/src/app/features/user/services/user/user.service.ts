import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  createUser(user: { firstName: string, lastName: string }) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl, user, { headers });
  }

  getUsers(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(this.apiUrl));
  }
}
