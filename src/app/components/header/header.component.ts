import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCartShopping } from '@ng-icons/font-awesome/solid';
import { SidePanelService } from '../../services/side-panel.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({ faSolidCartShopping })],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  constructor(public sidePanelService: SidePanelService) {}

  openSidePanel() {
    this.sidePanelService.toggle();
  }
}
