import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
  ) {}

  navigateItemOverview(searchInput: string) {
    if (!searchInput) {
      return;
    }

    this.router.navigate(['/item', searchInput]);
  }
}
