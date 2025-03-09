import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemOverviewComponent } from "./components/item-overview/item-overview.component";
import { CommonModule } from "@angular/common";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:itemName', component: ItemOverviewComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    CommonModule,
    RouterModule,
  ],
})
export class AppRoutingModule {}
