import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Material } from "../../models/material";
import { Item } from "../../models/item";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { ItemOverviewService } from "../../services/item-overview.service";

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [
    TitleCasePipe,
    NavbarComponent
  ],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.scss'
})
export class ItemOverviewComponent implements OnInit {
  isLoading: boolean = false;
  itemName: string = '';
  materials: Array<Material> = [];
  item: Item | null = null;
  materialDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private itemOverviewService: ItemOverviewService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async params => {
      this.itemName = params['itemName'];

      this.itemOverviewService.getItemOverview(this.itemName).subscribe(item => {
        this.item = item

        if (this.item && this.item.materials.length > 0) {
          this.selectMaterial(this.item.materials[0].name);
        }

        this.isLoading = false;
      });
    });
  }

  selectMaterial(materialName: string) {
    if (!this.item) {
      return;
    }

    const material = this.item.materials.find(material => material.name === materialName);
    this.materialDescription = material ? material.description : '';
  }
}
