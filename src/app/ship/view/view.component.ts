import { Component, OnInit } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { Ship } from '../models/ship';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
}) 
//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class ViewComponent implements OnInit {
  ships: Ship[] = [];
  types: Ship[] = [];
  formAddFeature!: FormGroup;

  constructor(public shipService: ShipService) {}

  // Metodo
  ngOnInit(): void {
    this.getTypes();
    this.GetShips();

    //Creación de objeto de tipo FormGroup
    this.formAddFeature = new FormGroup({
      description: new FormControl('', [Validators.required])
    });
  }

  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result;
    });
  }

  GetShips(){
    this.shipService.getAll().subscribe((data: any) => {
      this.ships = data.result;
    });
  }

  deleteShip(id:number){
    this.shipService.delete(id).subscribe(res => {
         this.ships = this.ships.filter(item => item.id !== id);
         console.log('Ship deleted successfully!');
    })
  }

  submit() {
    console.log(this.formAddFeature.value);
    this.shipService.createFeature(this.formAddFeature.value).subscribe((res: any) => {
      console.log('Feature Created successfully!');
      alert("Feature Created successfully");
    });
  }
}
