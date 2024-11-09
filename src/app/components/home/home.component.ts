import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    public router: Router,
  ) {}


  viewItemOverview(searchInput: string) {
    if (!searchInput) {
      return;
    }

    this.router.navigate(['/item', searchInput]);
  }
}
