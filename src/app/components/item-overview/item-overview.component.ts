import { Component, OnInit } from '@angular/core';
import { Material } from "../../models/material";
import { MistralaiService } from "../../services/mistralai.service";
import { JsonDataServiceService } from "../../services/json-data-service.service";
import { ActivatedRoute } from '@angular/router';
import { generatePrompt } from "../../utils/prompt";
import {Item} from "../../models/item";

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

      this.item = {
        name: 'bicycle',
        materials: [
          {
            name: 'metal',
            description: 'Metal is a material that is used in many items.',
            impact: 'low',
          },
          {
            name: 'rubber',
            description: 'Rubber is a material that is used in many items.',
            impact: 'medium',
          },
          {
            name: 'plastic',
            description: 'Plastic is a material that is used in many items.',
            impact: 'high',
          },
          {
            name: 'glass',
            description: 'glass is a material that is used in many items.',
            impact: 'high',
          },
        ],
        reuse: ['reuse center'],
        recycle: ['recycling center', 'landfill'],
        valuable: true,
      }
      this.isLoading = false;

      // TODO: Implement loading data from JSON files and sending a message to MistralAI
      // try {
      //   const materials =
      //     await this.jsonDataService.getJsonData<Array<Material>>('data/materials.json').toPromise();
      //   this.materials = <Array<Material>>materials;
      //
      //   this.response = await this.mistrallaiService.sendMessage(generatePrompt(this.itemName));
      // } catch (error) {
      //   console.error('Error loading data', error);
      // } finally {
      //   this.isLoading = false;
      // }

      if (this.materials.length > 0) {
        this.materialDescription = this.item.materials[0].description;
      }
    });
  }

  selectMaterial(materialName: string) {
    this.materialDescription = this.item.materials.find(material =>
      material.name === materialName)?.description || '';
  }
}
