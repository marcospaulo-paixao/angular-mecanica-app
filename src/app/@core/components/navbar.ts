import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { link } from 'fs';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Mecânica App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              *ngFor="let item of menuItems"
            >
              <a
                class="nav-link"
                [class.active]="isActive(item.link)"
                [routerLink]="[item.link]">
                <i [class]="item.icon"></i> {{ item.label }}
              </a>
            </li>
          </ul>
          <button class="btn btn-outline-secondary ms-auto" (click)="toggleTheme()">
            <i class="fas" [class.fa-moon]="isDarkTheme" [class.fa-sun]="!isDarkTheme"></i>
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class Navbar {

  menuItems = [
    {label: 'Inicio', link: '/inicio', icon: 'fas fa-home'},
    {label: 'Marca', link: '/marca', icon: 'fas fa-tag'},
    {label: 'Modelo', link: '/modelo', icon: 'fas fa-car'},
    {label: 'Carro', link: '/carro', icon: 'fas fa-tools'},
    {label: 'Proprietário', link: 'proprietario', icon: 'fas fa-user'}
  ];

  isDarkTheme = true;

  constructor(private router: Router) {
    document.documentElement.setAttribute('data-bs-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  isActive(link: string): boolean {
    return this.router.url.startsWith(link);
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute('data-bs-theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
