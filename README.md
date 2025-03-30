# Tutorial: Criando um CRUD em Angular

Este tutorial ensina como criar um CRUD básico em Angular, utilizando como exemplo a entidade **Carro**. Siga todos os passos a seguir para implementar um sistema funcional.

---

## 1. Criando o Módulo `Carro`

Os **módulos** no Angular servem para organizar nosso código em partes reutilizáveis e independentes. Vamos começar criando o módulo `Carro`, onde organizaremos os componentes, serviços, e rotas.

### Passo 1: Criar o Módulo

No terminal, execute este comando:

```shell script
ng g module carro --routing
```

Após rodar, os seguintes arquivos serão gerados:
- `carro.module.ts`: Define o módulo `Carro`.
- `carro-routing.module.ts`: Gerencia as rotas do módulo.

O arquivo `carro-routing.module.ts` inicialmente será assim:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarroRoutingModule { }
```

### Passo 2: Importar o Módulo no `app.module.ts`

Agora, registre o `CarroModule` no seu módulo principal (`app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarroModule } from './carro/carro.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Passo 3: Criar e Configurar as Rotas no AppRoutingModule

As rotas são responsáveis por definir os caminhos de navegação na aplicação. Aqui estamos adicionando a rota para o módulo `Carro`.

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'carro',
    loadChildren: () =>
      import('./carro/carro.module').then((m) => m.CarroModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

## 2. Criar o Modelo (`Model`)

Os **modelos** são usados para definir a estrutura da entidade que estamos manipulando. Na pasta gerada (`carro`), crie o arquivo `carro.model.ts` e insira o seguinte código:

```typescript
export interface Carro {
  id?: string;        // Campo opcional
  proprietario: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
}
```

Este arquivo define os atributos de um carro e será usado em toda a aplicação.

---
<div style="page-break-after: always"></div>

## 3. Criar o Serviço (`Service`)

Os **serviços** ajudam a lidar com a lógica de negócio e com a comunicação com APIs.

### Passo 1: Gerar o Serviço

No terminal, rode:

```shell script
ng g service carro/carro
```

Isso criará o arquivo `carro.service.ts` dentro da pasta `carro`.

### Passo 2: Implementar o Serviço

Adicione os métodos necessários para realizar as operações CRUD no arquivo `carro.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from './carro.model';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private apiUrl = 'http://localhost:3000/carros';

  constructor(private http: HttpClient) {}

  listar(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${id}`);
  }

  criar(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }

  atualizar(id: string, carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${id}`, carro);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

<div style="page-break-after: always"></div>

Agora registre o serviço no `carro.module.ts`, embora o Angular já trate serviços com o escopo `@Injectable`.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarroRoutingModule } from './carro-routing.module';
import { CarroService } from './carro.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarroRoutingModule
  ],
  providers: [CarroService],
})
export class CarroModule { }
```

---

## 4. Criar Componentes do CRUD

Um **componente** define a lógica e a apresentação de uma parte da interface do usuário na aplicação.

### Passo 1: Gerar Componentes

Para este CRUD, precisamos de dois componentes:
1. **CarroList**: Para listar os carros.
2. **CarroForm**: Para adicionar ou editar carros.

No terminal, execute:

```shell script
ng g component carro/carro-list
ng g component carro/carro-form
```

Renomeie os diretórios para `list` e `form`, ajustando os imports no `carro.module.ts`:
```typescript
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CarroRoutingModule} from './carro-routing.module';
import {CarroService} from './carro.service';
import {CarroListComponent} from './list/carro-list.component'; // AJUSTAR
import {CarroFormComponent} from './form/carro-form.component'; // AJUSTAR

@NgModule({
  declarations: [
    CarroListComponent,
    CarroFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarroRoutingModule],
  providers: [CarroService],
})
export class CarroModule {
}
```

### Passo 2: Configurar as Rotas

No arquivo `carro-routing.module.ts`, adicione as rotas dos componentes criados:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarroListComponent } from './list/carro-list.component';
import { CarroFormComponent } from './form/carro-form.component';

const routes: Routes = [
  { path: '', component: CarroListComponent },              // Listagem
  { path: 'form', component: CarroFormComponent },          // Cadastro
  { path: 'form/:id', component: CarroFormComponent }       // Edição
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarroRoutingModule { }
```

<div style="page-break-after: always"></div>

### Passo 3: Implementar o Componente de Lista

No arquivo `carro-list.component.ts`, adicione a lógica para exibir e excluir carros:

```typescript
import {Component, OnInit} from '@angular/core';
import {Carro} from '../carro.model';
import {CarroService} from '../carro.service';
import {Router} from '@angular/router';
import {AlertService} from "../../@core/service/alert.service";

@Component({
  selector: 'app-carro-list',
  templateUrl: './carro-list.component.html',
  styleUrls: ['./carro-list.component.css'],
})
export class CarroListComponent implements OnInit {
  carros?: Carro[];

  constructor(
    private readonly carroService: CarroService,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {
  }

  carregarTabela() {
    /* VAI NO BACKEND E BUSCA OS DADOS ATUALIZADOS */
    this.carroService.listar().subscribe({
      next: (resultadoBackend) => {
        this.carros = resultadoBackend;
      },
    });
  }

  navegarParaFormulario(id?: string) {
    // VERIFICA SE O ID FOI ENVIADO NA PARAMETRO
    if (id) {
      this.router.navigate(['/carro/form', id]);
    } else {
      this.router.navigate(['/carro/form']);
    }
  }

  excluir(id: string) {
    this.carroService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
        this.alert.add({summary: "Sucesso", detail: 'Registro excluído com sucesso', severity: "success", life: 3000})
      },
    });
  }
}

```
<div style="page-break-after: always"></div>

No `carro-list.component.html`, insira a interface de listagem:

```html
<div class="container mt-5">
  <h2 class="h2">Manutenção de Carros</h2>
  <button (click)="navegarParaFormulario()" class="btn btn-success mt-5">
    <i class="fas fa-plus"></i> Cadastrar
  </button><table class="table table-striped">
  <thead>
  <tr>
    <th>Proprietário</th>
    <th>Marca</th>
    <th>Modelo</th>
    <th>Ano</th>
    <th>Cor</th>
    <th></th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let carro of carros">
    <td>{{ carro.proprietario }}</td>
    <td>{{ carro.marca }}</td>
    <td>{{ carro.modelo }}</td>
    <td>{{ carro.ano }}</td>
    <td>{{ carro.cor }}</td>
    <td>
      <div class="d-flex gap-2">
        <button
          (click)="navegarParaFormulario(carro.id)"
          class="btn btn-primary"
        >
          <i class="fas fa-edit"></i> Editar
        </button>
        <button (click)="excluir(carro.id!)" class="btn btn-danger">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    </td>
  </tr>
  </tbody>
</table>
  <ng-container [ngPlural]="carros?.length ?? 0">
    <ng-template ngPluralCase="=0">Nenhum item encontrado.</ng-template>
    <ng-template ngPluralCase="=1">1 item encontrado.</ng-template>
    <ng-template ngPluralCase="other">{{ carros!.length! }} itens encontrados.</ng-template>
  </ng-container>
</div>
```

---
<div style="page-break-after: always"></div>

### Passo 4: Implementar o Componente de Formulário

No arquivo `carro-form.component.ts`, adicione a lógica para criar e editar:

```typescript
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

```
<div style="page-break-after: always"></div>
No `carro-form.component.html`, insira o formulário:

```html
<div class="container mt-5">
  <h2>Manutenção de Carros</h2>

  <div class="mb-3 mt-5">
    <label class="form-label" for="proprietario">Proprietário:</label>
    <input
      [(ngModel)]="proprietario"
      class="form-control"
      id="proprietario"
      name="proprietario"
      type="text"
    />
  </div>

  <div class="mb-3">
    <label class="form-label" for="marca">Marca:</label>
    <input
      [(ngModel)]="marca"
      class="form-control"
      id="marca"
      name="marca"
      type="text"
    />
  </div>

  <div class="mb-3">
    <label class="form-label" for="modelo">Modelo:</label>
    <input
      [(ngModel)]="modelo"
      class="form-control"
      id="modelo"
      name="modelo"
      type="text"
    />
  </div>

  <div class="mb-3">
    <label class="form-label" for="ano">Ano:</label>
    <input
      [(ngModel)]="ano"
      class="form-control"
      id="ano"
      name="ano"
      type="text"
    />
  </div>

  <div class="mb-3">
    <label class="form-label" for="cor">Cor:</label>
    <input
      [(ngModel)]="cor"
      class="form-control"
      id="cor"
      name="cor"
      type="text"
    />
  </div>

  <div class="d-flex justify-content-end gap-2">
    <button (click)="navegarParaListagem()" class="btn btn-outline-danger">
      <i class="fas fa-times"></i> Cancelar
    </button>
    <button (click)="salvar()" class="btn btn-primary">
      <i class="fas fa-check"></i> Salvar
    </button>
  </div>
</div>

```
---

Seguindo este tutorial, você terá um CRUD funcional para gerenciar carros. Teste as rotas e garanta que todas as funcionalidades estejam operando como esperado.

---
**FIM.**
