import { Component, OnInit } from '@angular/core';
import { Carro } from '../carro.model';
import { CarroService } from '../carro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carro-list',
  templateUrl: './carro-list.component.html',
  styleUrls: ['./carro-list.component.css'],
})
export class CarroListComponent implements OnInit {
  carros?: Carro[];

  constructor(
    private readonly carroService: CarroService,
    private readonly router: Router
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {}

  carregarTabela() {
    /* VAI NO BACKEND E BUSCA OS DADOS ATUALIZADOS */
    this.carroService.listar().subscribe({
      next: (resultadoBackend) => {
        this.carros = resultadoBackend;
      },
    });
  }

  navegarParaFormulario(id?: string) {
    // VERIFICA SE O ID FOI ENVIADO NA PARAMETRO
    if (id) {
      this.router.navigate(['/carro/form', id]);
    } else {
      this.router.navigate(['/carro/form']);
    }
  }

  excluir(id: string) {
    this.carroService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
      },
    });
  }
}
