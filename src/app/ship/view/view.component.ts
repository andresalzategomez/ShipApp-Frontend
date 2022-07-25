import { Component, OnInit } from '@angular/core'; // importar objeto e interfaz
import { ShipService } from '../services/ship.service'; // se importa el servicio para consumir los endpoints
import { Ship } from '../models/ship'; // se importa la interfaz de nave
import { FormControl, FormGroup, Validators } from '@angular/forms'; // se importa objetos de tipo form

// este decorador realiza sobreescritura
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
}) 

//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class ViewComponent implements OnInit { 
  ships: Ship[] = []; // variable para obtener todas la naves de la base de datos
  types: Ship[] = []; // variable para obterner tipos de naves
  formAddFeature!: FormGroup; // objeto de tipo Form para agrupar elementos de la nave

  // inyección de dependencias para consumir los metodos de otra clase
  constructor(public shipService: ShipService) {}

    // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.getTypes();
    this.GetShips();

    //agregar elementos al objeto de la nave
    this.formAddFeature = new FormGroup({
      description: new FormControl('', [Validators.required])
    });
  }

  // Metodo para obtener los tipos de naves mediante el metodo subscribe
  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result;
    });
  }

  // Metodo para obtener las naves de la base de datos
  GetShips(){
    this.shipService.getAll().subscribe((data: any) => {
      this.ships = data.result;
    });
  }

  // Metodo para eliminar una nave
  deleteShip(id:number){
    this.shipService.delete(id).subscribe(res => {
         this.ships = this.ships.filter(item => item.id !== id); // se elimina tambn del vector
         console.log('Ship deleted successfully!');
    })
  }

  // Metodo para consumir el endpoint de eleiminar una caracteristica
  submit() {
    console.log(this.formAddFeature.value);
    this.shipService.createFeature(this.formAddFeature.value).subscribe((res: any) => {
      console.log('Feature Created successfully!');
      alert("Feature Created successfully");
    });
  }
}
