# Tutorial Angular - Criação de Módulos, Rotas, Componentes e Serviços (com Bootstrap)

Este tutorial tem como objetivo ensinar de forma didática como adicionar e configurar módulos, rotas, componentes, serviços e como integrar o Bootstrap em um projeto Angular. Usaremos um exemplo prático de um módulo chamado **Carro**.

### Pré-requisitos
- Ter o **Node.js** e o gerenciador de pacotes **npm** instalados.
- Angular CLI instalado globalmente:
```shell script
npm install -g @angular/cli
```
- Um projeto Angular já iniciado. Se não tiver, crie um novo projeto utilizando o comando:
```shell script
ng new angular-mecanica-app
```

---

## 1. Configurando o Bootstrap no Angular

O Bootstrap será utilizado para estilizar nossa aplicação. Para isso, precisamos instalá-lo no projeto e configurá-lo.

### Passo 1: Instalar Bootstrap

No terminal, rode o comando abaixo dentro do diretório do seu projeto:
```shell script
npm install bootstrap
```

### Passo 2: Adicionar o CSS do Bootstrap no projeto

Abra o arquivo `angular.json` e adicione o caminho do CSS do Bootstrap na seção `styles`:
```json
...
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
...
```

Agora podemos usar as classes do Bootstrap em nossos componentes.

---

## 2. Criando um Módulo: Carro

No Angular, usamos **módulos** para organizar nosso projeto em unidades reutilizáveis e independentes. Vamos criar o módulo `Carro` e adicionar lógica de componentes e rotas nele.

### Passo 1: Criar o Módulo

No terminal, rode o comando:
```shell script
ng g module carro --routing
```

Isso cria os seguintes arquivos:
- `carro.module.ts`: Define o módulo `Carro`.
- `carro-routing.module.ts`: Gerencia as rotas do módulo.

O arquivo `carro-routing.module.ts` começará assim (modificaremos mais tarde):
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

---

## 3. Criando Componentes

Um **componente** define a lógica e a apresentação de uma parte da interface do usuário na aplicação.

### Passo 1: Criar os Componentes do Módulo

Criando dois componentes:
1. `CarroList` - Para listar os carros.
2. `CarroForm` - Para criar ou editar um carro.

Execute os comandos no terminal:
```shell script
ng g component carro/carro-list
ng g component carro/carro-form
```

Isso criará dois diretórios (`carro-list` e `carro-form`), cada um com os arquivos necessários.

### Passo 2: Registrar os Componentes no Módulo

Abra `carro.module.ts` e registre os componentes no decorator `@NgModule`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarroListComponent } from './carro-list/carro-list.component';
import { CarroFormComponent } from './carro-form/carro-form.component';
import { CarroRoutingModule } from './carro-routing.module';

@NgModule({
  declarations: [
    CarroListComponent,
    CarroFormComponent
  ],
  imports: [
    CommonModule,
    CarroRoutingModule
  ]
})
export class CarroModule { }
```

### Passo 3: Configurar Rotas

Adicione as rotas no arquivo `carro-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarroListComponent } from './list/carro-list.component';
import { CarroFormComponent } from './form/carro-form.component';

const routes: Routes = [
  { path: '', component: CarroListComponent },
  { path: 'form', component: CarroFormComponent },
  { path: 'form/:id', component: CarroFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarroRoutingModule { }
```

Aqui definimos:
- `path: ''` para exibir a lista de carros.
- `path: 'form'` para exibir o formulário de criação.
- `path: 'form/:id'` para exibir o formulário de edição.

---

## 4. Criando um Serviço

Os **serviços** são usados para gerenciar a lógica de negócios e lidar com APIs (HTTP). Vamos criar um serviço para gerenciar os dados dos carros.

### Passo 1: Criar o Serviço

Execute o comando:
```shell script
ng g service carro/carro
```

Isso criará o arquivo `carro.service.ts` no diretório `carro`.

### Passo 2: Implementar o Serviço

No arquivo `carro.service.ts`, implementaremos métodos para retornar dados simulados. Substitua o conteúdo por:

```typescript
import {Injectable} from '@angular/core';
import {Carro} from './carro.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  urlBackend: string =
    'http://localhost:3000/carros'; /* URL DO BACKEND PARA FAZER A INTEGRACAO */

  constructor(private readonly httpClient: HttpClient) {
  }

  listar(): Observable<Carro[]> {
    return this.httpClient.get<Carro[]>(this.urlBackend);
  }

  criar(novoCarro: Carro): Observable<Carro> {
    return this.httpClient.post<Carro>(this.urlBackend, novoCarro);
  }

  excluir(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBackend}/${id}`);
  }
}
```

### Passo 3: Consumir o Serviço no Componente

No arquivo `carro-list.component.ts`:
```typescript
import {Component, OnInit} from '@angular/core';
import {Carro} from '../carro.model';
import {CarroService} from '../carro.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carro-list',
  templateUrl: './carro-list.component.html',
  styleUrls: ['./carro-list.component.css'],
})
export class CarroListComponent implements OnInit {
  carros?: Carro[];

  constructor(
    private readonly carroService: CarroService,
    private readonly router: Router
  ) {
    this.carregarTabela();
  }

  ngOnInit(): void {
  }

  carregarTabela() {
    this.carroService.listar().subscribe({
      next: (resultadoBackend) => {
        this.carros = resultadoBackend;
      },
    });
  }

  navegarParaFormulario() {
    this.router.navigate(['/carro/form']);
  }

  excluir(id: string) {
    this.carroService.excluir(id).subscribe({
      next: () => {
        this.carregarTabela();
      },
    });
  }
}
```

No arquivo `carro-list.component.html`:
```html
<div class="container mt-5">
  <h2 class="h2">Manutenção de Carros</h2>

  <button (click)="navegarParaFormulario()" class="btn btn-success mt-5">
    Cadastrar
  </button>

  <table class="table table-striped">
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
          <button class="btn btn-primary">Editar</button>
          <button (click)="excluir(carro.id!)" class="btn btn-danger">Excluir</button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
```

---

## 5. Importar o Módulo no AppModule

Por fim, precisamos importar o módulo `CarroModule` no arquivo `app.module.ts`:
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

---

## Conclusão

Agora você tem um exemplo básico de como criar e organizar **módulos**, **componentes**, **rotas** e **serviços** em Angular, além de como usar o **Bootstrap** para estilizar a aplicação. Sinta-se à vontade para expandir este projeto e praticar mais!

---
