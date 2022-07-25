import { Component, OnInit } from '@angular/core'; // importar objeto e interfaz
import { FormControl, FormGroup, Validators } from '@angular/forms'; // se importa objetos de tipo form
import { Ship } from '../models/ship'; // se importa la interfaz de nave
import { ShipService } from '../services/ship.service'; // se importa el servicio para consumir los endpoints

// este decorador realiza sobreescritura de metodos
@Component({
  selector: 'app-behaviors',
  templateUrl: './behaviors.component.html',
  styleUrls: ['./behaviors.component.scss'],
})

//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class BehaviorsComponent implements OnInit {
  
  form!: FormGroup; // objeto de tipo Form para agrupar elementos de la nave
  ships: Ship[] = []; // variable para almacenar todos las naves que se obtienen de base de datos
  shipFound: any[] = []; // Variable par almacenar una nave obtenida por id
  resCalculated: number; // variable para almacenar el resultado del calculo de tiempo
  velCalculated: string; // variable para almacenar la velocidad de la nave seleccionada
  ShipSelected: string; // variable para almacenar la nave seleccionada para calcualr
  PlaceSelected: string; // variable para almacenar el item seleccionado del select
  DistSelected: string; // variable para almacenar la distancia de cada destino disponible a calcular

  // inyección de dependencias para consumir los metodos de otra clase
  constructor(public shipService: ShipService) {}

  // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.GetShips();

    this.form = new FormGroup({ //agregar elementos al objeto de la nave
      velocity: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      result: new FormControl('', [Validators.required]),
      displacement: new FormControl('', [Validators.required]),
    });

     // Deshabilitar 2 elementos de DOM
    this.form.controls['result'].disable();
    this.form.controls['displacement'].disable();
  }

  // Metodo para almacenar el item del select de naves
  changeShipSelect(e: any) {
    this.ShipSelected = e.target.value;
    this.getDisplacement(parseInt(this.ShipSelected)); // metodo para obtener la distancia de la nave seleccionada
  }

  // Metodo para almacenar el item del select de lugares
  async changePlaceSelect(e: any) {
    this.PlaceSelected = e.target.value;

    // condicional para asignar la distancia de cada lugar
    if (this.PlaceSelected === 'moon') {
      this.DistSelected = '384400';
    } else {
      if (this.PlaceSelected === 'sun') {
        this.DistSelected = '150000000';
      } else {
        this.DistSelected = '1103760000';
      }
    }
  }

  // Metodo para obtener las naves de la base de datos
  GetShips() {
    this.shipService.getAll().subscribe((data: any) => {
      this.ships = data.result;
    });
  }

  // Metodo para calcular el tiempo de vuelo
  Calculate() {
    // this.form.controls['displacement'].setValue()
    this.resCalculated =
      parseInt(this.DistSelected) / parseInt(this.velCalculated) / 8760; // 8760 corresponde a las horas de 1 año
  }

  // Metodo para obtener por id del endpoint el desplazamiento de una nave
  async getDisplacement(ship: number) {
    return await this.shipService // async/await se requiere para hacer que el método sea asyncrono 
      .findFeaturesList(ship) // método para obtener lista de caracteristicas según una nave, el parametro de nave se envía como objeto
      .subscribe((data: any) => { // subscribe se usa para subscribirse a una promesa
        this.shipFound = data.result;

        let swFound: boolean = false; // variable switch para condicionar que se encuentra la caracteristica de velocidad
        this.shipFound.forEach((element) => {
          if (element.id_feature === 6) {
            swFound = true;
            this.velCalculated = element.value_feature; // variable para almacenar la velocidad de la nave
            this.form.controls['displacement'].setValue(this.velCalculated); // se asigna la velocidad al input de velocidad
          }
        });
        if (!swFound) { // condicional para asignar velocidad 0 cuándo no tiene la caracteristica de velocidad
          alert('This ship does not have a displacement feature.');
          this.velCalculated = '0';
          this.form.controls['displacement'].setValue(this.velCalculated);
        }
      });
  }
}
