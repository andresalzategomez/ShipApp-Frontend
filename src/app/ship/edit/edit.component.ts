import { Component, OnInit } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../models/ship';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  types: Ship[] = [];
  id!: number;
  ship!: Ship;
  form!: FormGroup;

  constructor(
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // Se maneja Poliformismo al implementar el metodo ngOnInit y modificar el comportamiento normal del OnInit
  ngOnInit(): void {
    this.getTypes();
    this.id = this.route.snapshot.params['shipId'];

    this.shipService.find(this.id).subscribe((data: any) => {
      this.ship = data.result[0];
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date_creation: new FormControl('', [Validators.required]),
      date_destruction: new FormControl('', [Validators.required]),
      id_type: new FormControl('', Validators.required),
    });
  }

  getTypes() {
    this.shipService.getTypes().subscribe((data: any) => {
      this.types = data.result;
      console.log(this.types);
      
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.shipService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Ship updated successfully!');
      this.router.navigateByUrl('ship/view');
    });
  }
}
