import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { SidePanelService } from './services/side-panel.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ProductGridComponent,
    SearchComponent,
    FooterComponent,
    SidePanelComponent,
  ],
  template: `
    <div class="flex flex-col gap-8 min-h-screen">
      <app-header />
      <main class="flex flex-col gap-4">
        <div class="w-1/2 mx-auto">
          <app-search (changeSearchEvent)="onSearch($event)" />
        </div>
        <app-product-grid [searchTerm]="searchTerm" />
        <router-outlet />
      </main>
      <app-footer />
      @if (sidePanelService.isOpen$ | async) {
      <app-side-panel />
      }
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ng-harrypotter';
  searchTerm: string = '';

  constructor(public sidePanelService: SidePanelService) {}

  onSearch(term: string) {
    this.searchTerm = term;
  }
}
