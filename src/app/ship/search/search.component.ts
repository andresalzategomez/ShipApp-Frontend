import { Component, OnInit } from '@angular/core';
import { Feature } from '../models/feature';
import { Ship } from '../models/ship';
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  types: Ship[] = [];
  saerch: Ship[] = [];
  feature: any[] = [];
  isFeature: boolean = false;
  isType: boolean = false;
  username: string = '';
  rbSelected: string;
  TypeSelected: string;
  FeatureSelected: string;
  corporationObj: any;

  constructor(public shipService: ShipService) {}

  ngOnInit(): void {
    this.getTypes();
    this.getFeatures();
  }
  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result;
    });
  }

  getFeatures() {
    this.shipService.findFeatures().subscribe((data: any) => {
      this.feature = data.result;
      console.log(this.feature);
    });
  }

  changeTypeSearch(e: any) {
    this.rbSelected = e.target.id;
  }

  changeFeatureShip(e: any) {
    this.FeatureSelected = e.target.value;
  }
  

  changeFeatureSearch(e: any) {
    this.FeatureSelected = e.target.id;
    
  }

  changeTypeShip(e: any) {
    this.TypeSelected = e.target.value;
  }

  submit(valueSearch: string) {
    if (this.rbSelected === 'id_type') {
      this.getShipByName(this.TypeSelected, this.rbSelected);
    } else {
      if (this.rbSelected === 'id_feature') {
        this.findShipByNameInner(this.FeatureSelected);
      } else {
        this.getShipByName(valueSearch, this.rbSelected);
      }
    }
  }

  getShipByName(nameShip: string, nameTable: string) {
    this.shipService
      .findShipByName(nameShip, nameTable)
      .subscribe((data: any) => {
        this.saerch = data.result;
        console.log(data.result);
      });
  }

  
  findShipByNameInner(featureId: string) {
    this.shipService
      .findShipByNameInner(featureId)
      .subscribe((data: any) => {
        this.saerch = data.result;
        console.log(data.result);
      });
  }
}
