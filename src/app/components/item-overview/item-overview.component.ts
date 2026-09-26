import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { Material } from '../../models/material';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ItemOverviewService } from '../../services/item-overview.service';

@Component({
  selector: 'app-item-overview',
  imports: [
    TitleCasePipe,
    NavbarComponent,
  ],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.scss',
})
export class ItemOverviewComponent {
  private readonly itemOverviewService = inject(ItemOverviewService);

  // Bound from the ':itemName' route param (withComponentInputBinding)
  public readonly itemName = input.required<string>();

  // Reloads automatically when itemName changes, previous request is cancelled
  protected readonly itemResource = rxResource({
    params: () => this.itemName(),
    stream: ({ params: itemName }) => this.itemOverviewService.getItemOverview(itemName),
  });

  protected readonly item = computed(() => this.itemResource.hasValue() ? this.itemResource.value() : null);

  // Defaults to the first material whenever a new item is loaded, user can override it
  protected readonly selectedMaterial = linkedSignal<Material | null>(() => this.item()?.materials[0] ?? null);

  protected selectMaterial(material: Material): void {
    this.selectedMaterial.set(material);
  }
}
