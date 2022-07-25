import { Component, OnInit } from '@angular/core';  // importar objeto e interfaz
import { ActivatedRoute, Router } from '@angular/router'; 
import { Ship } from '../models/ship'; // se importa la interfaz de nave
import { FormGroup, FormControl, Validators } from '@angular/forms'; // se importa objetos de tipo form
import { ShipService } from '../services/ship.service'; // se importa el servicio para consumir los endpoints

// este decorador realiza sobreescritura
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

//se implementa la interfaz OnInit, por lo tanto se requiere un metodo "ngOnInit"
export class CreateComponent implements OnInit {

  types: Ship[] = []; // variable par almacenar los tipos de naves
  form!: FormGroup; // objeto de tipo Form para agrupar elementos de la nave

  constructor(  // inyección de dependencias para consumir los metodos de otra clase
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.getTypes();

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
    });
  }

  get f() {
    return this.form.controls;
  }

  // Metodo para consumir el endpoint de crear nave
  submit() {
    console.log(this.form.value);
    this.shipService.create(this.form.value).subscribe((res: any) => {
      console.log('Ship Create successfully!');
      this.router.navigateByUrl('ship/view'); // se usa para redirigirse a otra ruta
    });
  }

}
