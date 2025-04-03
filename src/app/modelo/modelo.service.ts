import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from './modelo.model';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  private apiUrl = 'http://localhost:3000/modelos';

  constructor(private http: HttpClient) {}
  listar(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.apiUrl);
  }
  buscarPorId(id: string): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}`);
  }
  criar(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.apiUrl, modelo);
  }
  atualizar(id: string, modelo: Modelo): Observable<Modelo> {
    return this.http.put<Modelo>(`${this.apiUrl}/${id}`, modelo);
  }
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
