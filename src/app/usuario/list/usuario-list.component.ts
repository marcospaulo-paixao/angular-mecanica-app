import {Component, OnInit} from '@angular/core';
import {Usuario} from '../usuario.model';
import {UsuarioService} from '../usuario.service';
import {Router} from '@angular/router';
import {AlertService} from "../../@core/service/alert.service";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  usuarios?: Usuario[];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {
  }

  carregarTabela() {
    /* VAI NO BACKEND E BUSCA OS DADOS ATUALIZADOS */
    this.usuarioService.listar().subscribe({
      next: (resultadoBackend) => {
        this.usuarios = resultadoBackend;
      },
    });
  }

  navegarParaFormulario(id?: string) {
    // VERIFICA SE O ID FOI ENVIADO NA PARAMETRO
    if (id) {
      this.router.navigate(['/usuario/form', id]);
    } else {
      this.router.navigate(['/usuario/form']);
    }
  }

  excluir(id: string) {
    this.usuarioService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
        this.alert.add({summary: "Sucesso", detail: 'Registro excluído com sucesso', severity: "success", life: 3000})
      },
    });
  }
}