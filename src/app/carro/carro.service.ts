import { Injectable } from '@angular/core';
import { Carro } from './carro.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  /* URL DO BACKEND PARA FAZER A INTEGRACAO */
  urlBackend: string = 'http://localhost:3000/carros';

  constructor(private readonly httpClient: HttpClient) {}

  listar(): Observable<Carro[]> {
    return this.httpClient.get<Carro[]>(this.urlBackend);
  }

  buscarCarroPorId(id: string): Observable<Carro> {
    return this.httpClient.get<Carro>(`${this.urlBackend}/${id}`);
  }

  criar(novoCarro: Carro): Observable<Carro> {
    return this.httpClient.post<Carro>(this.urlBackend, novoCarro);
  }

  atualizar(id: string, carro: Carro): Observable<Carro> {
    return this.httpClient.put<Carro>(`${this.urlBackend}/${id}`, carro);
  }

  excluir(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBackend}/${id}`);
  }
}
