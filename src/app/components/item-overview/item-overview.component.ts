import { Component, OnInit } from '@angular/core';
import { Material } from "../../models/material";
import { MistralaiService } from "../../services/mistralai.service";
import { JsonDataServiceService } from "../../services/json-data-service.service";
import { ActivatedRoute } from '@angular/router';
import { generatePrompt } from "../../utils/prompt";
import {Item} from "../../models/item";
import {parseResponse} from "../../utils/parse";

@Component({
  selector: 'app-item-overview',
  standalone: true,
  imports: [],
  templateUrl: './item-overview.component.html',
  styleUrl: './item-overview.component.scss'
})
export class ItemOverviewComponent implements OnInit {
  isLoading: boolean = true;
  materials: Array<Material> = [];
  itemName: string = '';
  response: string = '';
  item!: Item;
  materialDescription: string = '';

  constructor(
    private mistrallaiService: MistralaiService,
    private jsonDataService: JsonDataServiceService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async params => {
      this.itemName = params['itemName'];

      this.jsonDataService.getJsonData<Array<Material>>('data/materials.json').subscribe(materials => {
        this.materials = <Array<Material>>materials;

          this.mistrallaiService.sendMessage(generatePrompt(this.itemName, this.materials)).subscribe(response => {
            this.response = response;

            this.item = parseResponse(response, this.itemName, this.materials) || {
              name: this.itemName,
              materials: [],
              reuse: [],
              recycle: [],
              valuable: false,
            };

            if (this.item.materials.length > 0) {
              this.selectMaterial(this.item.materials[0].name);
            }

            this.isLoading = false;
          });
      });
    });
  }

  selectMaterial(materialName: string) {
    this.materialDescription = this.item.materials.find(material =>
      material.name === materialName)?.description || '';
  }
}
