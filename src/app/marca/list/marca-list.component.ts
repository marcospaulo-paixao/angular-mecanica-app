import { Component, OnInit } from '@angular/core';
import { Marca } from '../marca.model';
import { MarcaService } from '../marca.service';
import { Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css'],
})
export class MarcaListComponent implements OnInit {
  marcas?: Marca[];

  constructor(
    private readonly marcaService: MarcaService,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {}

  carregarTabela() {
    /* VAI NO BACKEND E BUSCA OS DADOS ATUALIZADOS */
    this.marcaService.listar().subscribe({
      next: (resultadoBackend) => {
        this.marcas = resultadoBackend;
      },
    });
  }

  navegarParaFormulario(id?: string) {
    // VERIFICA SE O ID FOI ENVIADO NA PARAMETRO
    if (id) {
      this.router.navigate(['/marca/form', id]);
    } else {
      this.router.navigate(['/marca/form']);
    }
  }

  excluir(id: string) {
    this.marcaService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
        this.alert.add({summary: "Sucesso", detail: 'Registro excluído com sucesso', severity: "success", life: 3000})
      },
    });
  }
}
