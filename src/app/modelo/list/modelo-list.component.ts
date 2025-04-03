import { Component, OnInit } from '@angular/core';
import { Modelo } from '../modelo.model';
import { ModeloService } from '../modelo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';
@Component({
  selector: 'app-modelo-list',
  templateUrl: './modelo-list.component.html',
  styleUrls: ['./modelo-list.component.css'],
})
export class ModeloListComponent implements OnInit {
  modelos?: Modelo[];
  constructor(
    private readonly modeloService: ModeloService,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {
    this.carregarTabela();
  }
  ngOnInit(): void {}
  carregarTabela() {
    this.modeloService.listar().subscribe({
      next: (resultadoBackend) => {
        this.modelos = resultadoBackend;
      },
    });
  }
  navegarParaFormulario(id?: string) {
    if (id) {
      this.router.navigate(['/modelo/form', id]);
    } else {
      this.router.navigate(['/modelo/form']);
    }
  }
  excluir(id: string) {
    this.modeloService.excluir(id).subscribe({
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
