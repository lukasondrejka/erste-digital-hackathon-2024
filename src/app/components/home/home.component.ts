import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);

  protected navigateItemOverview(searchInput: string): void {
    const itemName = searchInput.trim();

    if (!itemName) {
      return;
    }

    this.router.navigate(['/item', itemName]);
  }
}
