import { Component, OnInit } from '@angular/core';
import { Material } from "../../models/material";
import { MistralaiService } from "../../services/mistralai.service";
import { JsonDataServiceService } from "../../services/json-data-service.service";
import { ActivatedRoute } from '@angular/router';
import { generatePrompt } from "../../utils/prompt";

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

  constructor(
    private mistrallaiService: MistralaiService,
    private jsonDataService: JsonDataServiceService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async params => {
      this.itemName = params['itemName'];

      try {
        const materials =
          await this.jsonDataService.getJsonData<Array<Material>>('data/materials.json').toPromise();
        this.materials = <Array<Material>>materials;

        this.response = await this.mistrallaiService.sendMessage(generatePrompt(this.itemName));
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        this.isLoading = false;
      }
    });
  }
}
