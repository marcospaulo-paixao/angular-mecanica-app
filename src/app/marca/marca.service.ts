import { Injectable } from '@angular/core';
import { Marca } from './marca.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  /* URL DO BACKEND PARA FAZER A INTEGRACAO */
  urlBackend: string = 'http://localhost:3000/marcas';

  constructor(private readonly httpClient: HttpClient) {}

  listar(): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(this.urlBackend);
  }

  buscarMarcaPorId(id: string): Observable<Marca> {
    return this.httpClient.get<Marca>(`${this.urlBackend}/${id}`);
  }

  criar(novoMarca: Marca): Observable<Marca> {
    return this.httpClient.post<Marca>(this.urlBackend, novoMarca);
  }

  atualizar(id: string, marca: Marca): Observable<Marca> {
    return this.httpClient.put<Marca>(`${this.urlBackend}/${id}`, marca);
  }

  excluir(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBackend}/${id}`);
  }
}
