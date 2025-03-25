import {Component} from '@angular/core';
import {Router} from '@angular/router';

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
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {

  menuItems = [
    {label: 'Inicio', link: '/inicio', icon: 'fas fa-home'},
    {label: 'Marca', link: '/marca', icon: 'fas fa-tag'},
    {label: 'Modelo', link: '/modelo', icon: 'fas fa-car'},
    {label: 'Carro', link: '/carro', icon: 'fas fa-tools'},
  ];

  constructor(private router: Router) {
  }

  isActive(link: string): boolean {
    return this.router.url.startsWith(link);
  }
}
