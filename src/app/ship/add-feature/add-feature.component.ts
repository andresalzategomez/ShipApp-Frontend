import { Component, OnInit } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../models/ship';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feature } from '../models/feature';

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss'],
})
export class AddFeatureComponent implements OnInit {
  types: Ship[] = [];
  id!: number;
  ship!: Ship;
  feature!:any[];
  featureList!:Feature[];
  form!: FormGroup;
  formAdd!: FormGroup;
  isAdd: boolean = false;

  constructor(
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTypes();
    this.id = this.route.snapshot.params['shipId'];
    this.getShip();
    this.getFeatures();
    this.getFeaturesList();

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date_creation: new FormControl('', [Validators.required]),
      date_destruction: new FormControl('', [Validators.required]),
      id_type: new FormControl('', Validators.required),
    });

    this.formAdd = new FormGroup({
      id_ship:  new FormControl(this.route.snapshot.params['shipId']),
      id_feature: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
    

    this.form.controls['name'].disable();
    this.form.controls['date_creation'].disable();
    this.form.controls['date_destruction'].disable();
    this.form.controls['id_type'].disable();
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

  getFeaturesList() {
    this.shipService.findFeaturesList(this.id).subscribe((data: any) => {
      this.featureList = data.result;
      console.log(this.featureList);
      
    });
  }

  getShip() {
    this.shipService.find(this.id).subscribe((data: any) => {
      this.ship = data.result[0];
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  submit() {
    console.log(this.formAdd.value);
    this.shipService.createFeatureList(this.formAdd.value).subscribe((res: any) => {
      console.log('Feature List Created successfully!');
      window.location.reload();
    });
  }
}
