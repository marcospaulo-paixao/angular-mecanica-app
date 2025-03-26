import { Component, OnInit } from '@angular/core';
import { Carro } from '../carro.model';
import { CarroService } from '../carro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-carro-form',
  templateUrl: './carro-form.component.html',
  styleUrls: ['./carro-form.component.css'],
})
export class CarroFormComponent implements OnInit {
  id?: string;
  proprietario?: string;
  marca?: string;
  modelo?: string;
  ano?: number;
  cor?: string;

  constructor(
    private readonly carroService: CarroService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id /* opcional */ }) => {
        if (id) {
          this.buscarCarroPorId(id);
        }
      },
    });
  }

  buscarCarroPorId(id: string): void {
    this.carroService.buscarCarroPorId(id).subscribe({
      next: (carro) => {
        this.id = carro.id;
        this.proprietario = carro.proprietario;
        this.marca = carro.marca;
        this.modelo = carro.modelo;
        this.ano = carro.ano;
        this.cor = carro.cor;
      },
    });
  }

  navegarParaListagem() {
    this.router.navigate(['/carro']);
  }

  salvar() {
    let formularioPreenchido: boolean = true;

    if (!this.proprietario) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe o proprietário do carro',
        severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.marca) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe a marca do carro',
       severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.modelo) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe o modelo do carro',
        severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.ano) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe o ano do carro',
        severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.cor) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe a cor do carro',
        severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (formularioPreenchido) {
      const carro: Carro = {
        proprietario: this.proprietario!,
        marca: this.marca!,
        modelo: this.modelo!,
        ano: this.ano!,
        cor: this.cor!,
      };

      if (this.id) {
        this.carroService.atualizar(this.id, carro).subscribe({
          next: () => {
            this.navegarParaListagem()
            this.alert.add({summary: "Sucesso",detail: 'Registro atualizado com sucesso', severity: "success", life: 3000})
          },
        });
      } else {
        this.carroService.criar(carro).subscribe({
          next: () => {
            this.navegarParaListagem()
            this.alert.add({summary: "Sucesso", detail: 'Registro criado com sucesso', severity: "success", life: 3000})
          },
        });
      }
    }
  }
}
