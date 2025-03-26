import { Component, OnInit } from '@angular/core';
import { Marca } from '../marca.model';
import { MarcaService } from '../marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../@core/service/alert.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css'],
})
export class MarcaFormComponent implements OnInit {
  id?: string;
  nome?: string;

  constructor(
    private readonly marcaService: MarcaService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ id /* opcional */ }) => {
        if (id) {
          this.buscarMarcaPorId(id);
        }
      },
    });
  }

  buscarMarcaPorId(id: string): void {
    this.marcaService.buscarMarcaPorId(id).subscribe({
      next: (marca) => {
        this.id = marca.id;
        this.nome = marca.nome;
      },
    });
  }

  cancelar() {
    this.router.navigate(['/marca']);
  }

  salvar() {
    let formularioPreenchido: boolean = true;

    if (!this.nome) {
      this.alert.add({
        summary: "Erro!",
        detail: 'Informe o nome da marca',
        severity: "danger",
        life: 3000,
      });
      formularioPreenchido = false;
    }

    if (formularioPreenchido) {
      const marca: Marca = {
        nome: this.nome!,
      };

      if (this.id) {
        this.marcaService.atualizar(this.id, marca).subscribe({
          next: () => {
            this.router.navigate(['/marca']);
            this.alert.add({summary: "Sucesso",detail: 'Registro atualizado com sucesso', severity: "success", life: 3000})
          },
        });
      } else {
        this.marcaService.criar(marca).subscribe({
          next: () => {
            this.router.navigate(['/marca']);
            this.alert.add({summary: "Sucesso",detail: 'Registro criado com sucesso', severity: "success", life: 3000})
          },
        });
      }
    }
  }
}
