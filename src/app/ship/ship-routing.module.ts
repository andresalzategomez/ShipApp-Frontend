import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { SearchComponent } from './search/search.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';

const routes: Routes = [
  { path: 'ship', redirectTo: 'ship/view', pathMatch: 'full'},
  { path: 'ship/view', component: ViewComponent },
  { path: 'ship/create', component: CreateComponent },
  { path: 'ship/:shipId/edit', component: EditComponent },
  { path: 'ship/:shipId/addF', component: AddFeatureComponent },
  { path: 'ship/search', component: SearchComponent },
  { path: 'ship/behaviors', component: BehaviorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipRoutingModule { }
