import { Component, OnInit } from '@angular/core';
import { Carro } from '../carro.model';
import { CarroService } from '../carro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AlertType } from '../../@core/service/alert.service';

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
      this.alert.show({
        description: 'Informe o proprietário do carro',
        type: AlertType.DANGER,
        delay: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.marca) {
      this.alert.show({
        description: 'Informe a marca do carro',
        type: AlertType.DANGER,
        delay: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.modelo) {
      this.alert.show({
        description: 'Informe o modelo do carro',
        type: AlertType.DANGER,
        delay: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.ano) {
      this.alert.show({
        description: 'Informe o ano do carro',
        type: AlertType.DANGER,
        delay: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.cor) {
      this.alert.show({
        description: 'Informe a cor do carro',
        type: AlertType.DANGER,
        delay: 3000,
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
            this.alert.show({description: 'Registro atualizado com sucesso', type: AlertType.SUCCESS, delay: 3000})
          },
        });
      } else {
        this.carroService.criar(carro).subscribe({
          next: () => {
            this.navegarParaListagem()
            this.alert.show({description: 'Registro criado com sucesso', type: AlertType.SUCCESS, delay: 3000})
          },
        });
      }
    }
  }
}
