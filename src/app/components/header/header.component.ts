import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidHeart } from '@ng-icons/font-awesome/solid';
import { SidePanelService } from '../../services/side-panel.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ faSolidHeart })],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  constructor(public sidePanelService: SidePanelService) {}

  openSidePanel() {
    this.sidePanelService.toggle();
  }
}
