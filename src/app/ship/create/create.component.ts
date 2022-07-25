import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ship } from '../models/ship';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  types: Ship[] = [];
  id!: number;
  ship!: Ship;
  form!: FormGroup;

  constructor(
    public shipService: ShipService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTypes();

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
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.shipService.create(this.form.value).subscribe((res: any) => {
      console.log('Ship Create successfully!');
      this.router.navigateByUrl('ship/view');
    });
  }

}
