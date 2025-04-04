import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id /* opcional */ }) => {
        if (id) {
          this.buscarUsuarioPorId(id);
        }
      },
    });
  }

  buscarUsuarioPorId(id: string): void {
    this.usuarioService.buscarPorId(id).subscribe({
      next: (usuario) => {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.senha = usuario.senha;
      },
    });
  }

  navegarParaListagem() {
    this.router.navigate(['/usuario']);
  }

  salvar() {
    let formularioPreenchido: boolean = true;

    if (!this.nome) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o nome do usuario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.email) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe o email do usuario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (!this.senha) {
      this.alert.add({
        summary: 'Erro!',
        detail: 'Informe a senha do usuario',
        severity: 'danger',
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (formularioPreenchido) {
      const usuario: Usuario = {
        nome: this.nome!,
        email: this.email!,
        senha: this.senha!,
      };

      if (this.id) {
        this.usuarioService.atualizar(this.id, usuario).subscribe({
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
        this.usuarioService.criar(usuario).subscribe({
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
