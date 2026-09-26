import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemOverviewComponent } from './components/item-overview/item-overview.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:itemName', component: ItemOverviewComponent },
  { path: '**', redirectTo: '' },
];
