import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipRoutingModule } from './ship-routing.module';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { SearchComponent } from './search/search.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';

// este decorador realiza sobreescritura de metadatos
@NgModule({
  declarations: [
    ViewComponent,
    CreateComponent,
    EditComponent,
    AddFeatureComponent,
    SearchComponent,
    BehaviorsComponent
  ],
  imports: [
    CommonModule,
    ShipRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: []
})
export class ShipModule { }
