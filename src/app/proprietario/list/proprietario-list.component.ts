import { Component, OnInit } from '@angular/core';
import { Proprietario } from '../proprietario.model';
import { ProprietarioService } from '../proprietario.service';
import { Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-proprietario-list',
  templateUrl: './proprietario-list.component.html',
  styleUrls: ['./proprietario-list.component.css'],
})
export class ProprietarioListComponent implements OnInit {
  proprietarios?: Proprietario[];

  constructor(
    private readonly proprietarioService: ProprietarioService,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {}

  carregarTabela() {
    /* VAI NO BACKEND E BUSCA OS DADOS ATUALIZADOS */
    this.proprietarioService.listar().subscribe({
      next: (resultadoBackend) => {
        this.proprietarios = resultadoBackend;
      },
    });
  }

  navegarParaFormulario(id?: string) {
    // VERIFICA SE O ID FOI ENVIADO NO PARAMETRO
    if (id) {
      this.router.navigate(['/proprietario/form', id]);
    } else {
      this.router.navigate(['/proprietario/form']);
    }
  }

  excluir(id: string) {
    this.proprietarioService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
        this.alert.add({
          summary: 'Sucesso',
          detail: 'Registro excluído com sucesso',
          severity: 'success',
          life: 3000,
        });
      },
    });
  }
}
