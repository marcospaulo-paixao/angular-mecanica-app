import { Component, OnInit } from '@angular/core';
import { Modelo } from '../modelo.model';
import { ModeloService } from '../modelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';
@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.css'],
})
export class ModeloFormComponent implements OnInit {
  id?: string;
  nome?: string;

  constructor(
    private readonly modeloService: ModeloService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id /* opcional */ }) => {
        if (id) {
          this.buscarModeloPorId(id);
        }
      },
    });
  }
  buscarModeloPorId(id: string): void {
    this.modeloService.buscarPorId(id).subscribe({
      next: (modelo) => {
        this.id = modelo.id;
        this.nome = modelo.nome;
      },
    });
  }
  navegarParaListagem() {
    this.router.navigate(['/modelo']);
  }
  salvar() {
    let formularioPreenchido: boolean = true;
    if (!this.nome) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o modelo do carro',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (formularioPreenchido) {
      const modelo: Modelo = {
        nome: this.nome!,
      };
      if (this.id) {
        this.modeloService.atualizar(this.id, modelo).subscribe({
          next: () => {
            this.navegarParaListagem();
            this.alert.add({
              summary: 'Sucesso',
              detail: 'Registro atualizado com sucesso',
              severity: 'success',
              life: 3000,
            });
          },
        });
      } else {
        this.modeloService.criar(modelo).subscribe({
          next: () => {
            this.navegarParaListagem();
            this.alert.add({
              summary: 'Sucesso',
              detail: 'Registro criado com sucesso',
              severity: 'success',
              life: 3000,
            });
          },
        });
      }
    }
  }
}
