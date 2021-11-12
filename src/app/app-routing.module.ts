import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  { path:'', redirectTo:'listing', pathMatch: 'full'},
  { path: 'listing', component: ListingComponent},
  { path: 'create', component: CreateComponent},
  { path: 'edit', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
