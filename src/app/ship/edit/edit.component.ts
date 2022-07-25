import { Component, OnInit } from '@angular/core'; // importar objeto e interfaz
import { ShipService } from '../services/ship.service'; // se importa el servicio para consumir los endpoints
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../models/ship';  // se importa la interfaz de nave
import { FormGroup, FormControl, Validators } from '@angular/forms'; // se importa objetos de tipo form

// este decorador realiza sobreescritura
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class EditComponent implements OnInit {
  types: Ship[] = []; // variable para obtener tipos de naves
  id!: number; // variable para almacenar el id de la nave que se obtiene como parametro en la ruta
  ship!: Ship; // variable para almacenar una nave obtenida por id
  form!: FormGroup; // objeto de tipo Form para agrupar elementos de la nave

  constructor( // inyección de dependencias para consumir los metodos de otra clase
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.getTypes();
    this.id = this.route.snapshot.params['shipId']; // obtener id de la nave de los parametros de la ruta

    // llamar al endpoint para Obtener nave por id
    this.shipService.find(this.id).subscribe((data: any) => {
      this.ship = data.result[0];
    });

    this.form = new FormGroup({ //agregar elementos al objeto de la nave
      name: new FormControl('', [Validators.required]),
      date_creation: new FormControl('', [Validators.required]),
      date_destruction: new FormControl('', [Validators.required]),
      id_type: new FormControl('', Validators.required),
    });
  }

  // Metodo para obtener los tipos de naves mediante el metodo subscribe
  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result;
      console.log(this.types);
      
    });
  }

  get f() {
    return this.form.controls;
  }

  // Metodo para consumir el endpoint de actualizar una caracteristica
  submit() {
    console.log(this.form.value);
    this.shipService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Ship updated successfully!');
      this.router.navigateByUrl('ship/view'); // se usa para redirigirse a otra ruta
    });
  }
}
