import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ship } from '../models/ship';
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'app-behaviors',
  templateUrl: './behaviors.component.html',
  styleUrls: ['./behaviors.component.scss'],
})
export class BehaviorsComponent implements OnInit {
  form!: FormGroup;
  ships: Ship[] = [];
  shipFound: any[] = [];
  resCalculated: number;
  velCalculated: string;
  timeCalculated: string;
  ShipSelected: string;
  PlaceSelected: string;
  TimeSelected: string;

  constructor(public shipService: ShipService) {}

  ngOnInit(): void {
    this.GetShips();

    this.form = new FormGroup({
      velocity: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      result: new FormControl('', [Validators.required]),
      displacement: new FormControl('', [Validators.required]),
    });

    this.form.controls['result'].disable();
    this.form.controls['displacement'].disable();
  }

  changeShipSelect(e: any) {
    this.ShipSelected = e.target.value;
    this.getDisplacement(parseInt(this.ShipSelected))
  }

  async changePlaceSelect(e: any) {
    
    this.PlaceSelected = e.target.value;

    if (this.PlaceSelected === 'moon') {
      this.TimeSelected = '384400';
    } else {
      if (this.PlaceSelected === 'sun') {
        this.TimeSelected = '150000000';
      } else {
        this.TimeSelected = '1103760000';
      }
    }
  }

  GetShips() {
    this.shipService.getAll().subscribe((data: any) => {
      this.ships = data.result;
    });
  }

  Calculate() {
    // this.form.controls['displacement'].setValue()
    this.resCalculated =
      parseInt(this.TimeSelected) / parseInt(this.velCalculated) / 8760;
  }

  async getDisplacement(ship: number) {
    return await this.shipService
      .findFeaturesList(ship)
      .subscribe((data: any) => {
        this.shipFound = data.result;
        console.log(data.result);

        let swFound: boolean = false;
        this.shipFound.forEach((element) => {
          console.log('dentro del ciclo');
          if (element.id_feature === 6) {
            swFound = true;
            this.velCalculated = element.value_feature;
            this.form.controls['displacement'].setValue(this.velCalculated);
          }
        });
        if (!swFound) {
          console.log('Después del ciclo');

          alert('This ship does not have a displacement feature.');
          this.velCalculated = '0';
          this.form.controls['displacement'].setValue(this.velCalculated);
        }
      });
  }
}
