import { Component, OnInit } from '@angular/core';
import { Proprietario } from '../proprietario.model';
import { ProprietarioService } from '../proprietario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-proprietario-form',
  templateUrl: './proprietario-form.component.html',
  styleUrls: ['./proprietario-form.component.css'],
})
export class ProprietarioFormComponent implements OnInit {
  id?: string;
  nome?: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;

  constructor(
    private readonly proprietarioService: ProprietarioService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id /* opcional */ }) => {
        if (id) {
          this.buscarProprietarioPorId(id);
        }
      },
    });
  }

  buscarProprietarioPorId(id: string): void {
    this.proprietarioService.buscarPorId(id).subscribe({
      next: (proprietario) => {
        this.id = proprietario.id;
        this.nome = proprietario.nome;
        this.cpf = proprietario.cpf;
        this.telefone = proprietario.telefone;
        this.endereco = proprietario.endereco;
      },
    });
  }

  navegarParaListagem() {
    this.router.navigate(['/proprietario']);
  }

  salvar() {
    let formularioPreenchido: boolean = true;

    if (!this.nome) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o nome do proprietario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.cpf) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o cpf do proprietario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.telefone) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o telefone do proprietario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.endereco) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o endereço do proprietario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (formularioPreenchido) {
      const proprietario: Proprietario = {
        nome: this.nome!,
        cpf: this.cpf!,
        telefone: this.telefone!,
        endereco: this.endereco!,
      };

      if (this.id) {
        this.proprietarioService.atualizar(this.id, proprietario).subscribe({
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
        this.proprietarioService.criar(proprietario).subscribe({
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
