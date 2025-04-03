import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proprietario } from './proprietario.model';

@Injectable({
  providedIn: 'root',
})
export class ProprietarioService {
  private apiUrl = 'http://localhost:3000/proprietarios';

  constructor(private http: HttpClient) {}
  listar(): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(this.apiUrl);
  }
  buscarPorId(id: string): Observable<Proprietario> {
    return this.http.get<Proprietario>(`${this.apiUrl}/${id}`);
  }
  criar(proprietario: Proprietario): Observable<Proprietario> {
    return this.http.post<Proprietario>(this.apiUrl, proprietario);
  }
  atualizar(id: string, proprietario: Proprietario): Observable<Proprietario> {
    return this.http.put<Proprietario>(`${this.apiUrl}/${id}`, proprietario);
  }
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
