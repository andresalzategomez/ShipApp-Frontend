import { Component, OnInit } from '@angular/core'; // importar objeto e interfaz
import { ShipService } from '../services/ship.service'; // se importa el servicio para consumir los endpoints
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../models/ship'; // se importa la interfaz de nave
import { FormGroup, FormControl, Validators } from '@angular/forms'; // se importa objetos de tipo form
import { Feature } from '../models/feature'; // se importa la interfaz de caracteristica

// este decorador realiza sobreescritura
@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss'],
})

//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class AddFeatureComponent implements OnInit { 
  types: Ship[] = []; // Vector de tipo nave para almacenar las naves que se obitnen de la Base de datos
  id!: number; // variable para almacenar el id de la nave que se obtiene como parametro en la ruta
  ship!: Ship; // variable de tipo nave para almacenar la nave que se obtiene de la busqueda por id
  feature!:any[]; // Vector para obtener las caracteristicas de las base de datos
  featureList!:Feature[]; //vector para obtener la lista de caracteristicas que tene asociado todos los usuarios
  form!: FormGroup; // objeto de tipo Form para agrupar elementos de la nave
  formAdd!: FormGroup; // objeto de tipo Form para agrupar elementos de las nuevas caracteristica 
  isAdd: boolean = false; // Variable para condicionar que se muestre el form para agregar caracteristica

  constructor( // inyección de dependencias para consumir los metodos de otra clase
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.getTypes();
    this.id = this.route.snapshot.params['shipId']; // obtener id de la nave de los parametros de la ruta
    this.getShip();
    this.getFeatures();
    this.getFeaturesList();

    this.form = new FormGroup({ //agregar elementos al objeto de la nave
      name: new FormControl('', [Validators.required]),
      date_creation: new FormControl('', [Validators.required]),
      date_destruction: new FormControl('', [Validators.required]),
      id_type: new FormControl('', Validators.required),
    });

    this.formAdd = new FormGroup({ //agregar elementos al objeto de la nueva caracteristica
      id_ship:  new FormControl(this.route.snapshot.params['shipId']),
      id_feature: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
    
    // Deshabilitar 4 elementos de DOM
    this.form.controls['name'].disable();
    this.form.controls['date_creation'].disable();
    this.form.controls['date_destruction'].disable();
    this.form.controls['id_type'].disable();
  }

  // Metodo para obtener los tipos de naves mediante el metodo subscribe
  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result; 
    });
  }

  // metodo para obtener los caracteristicas
  getFeatures() {
    this.shipService.findFeatures().subscribe((data: any) => {
      this.feature = data.result;
      console.log(this.feature);
    });
  }

  // Metodo para obtener la lista de caracteristicas por usuario
  getFeaturesList() {
    this.shipService.findFeaturesList(this.id).subscribe((data: any) => {
      this.featureList = data.result;
      console.log(this.featureList);
      
    });
  }

  // Metodo para obtener una nave por id
  getShip() {
    this.shipService.find(this.id).subscribe((data: any) => {
      this.ship = data.result[0];
    });
  }

  get f() {
    return this.formAdd.controls;
  }

  // Metodo para consumir el endpoint de crear caracteristica
  submit() {
    this.shipService.createFeatureList(this.formAdd.value).subscribe((res: any) => {
      console.log('Feature List Created successfully!');
      window.location.reload();
    });
  }
}
