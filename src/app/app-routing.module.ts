import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxasOrdemComponent } from './pages/taxas-ordem/taxas-ordem.component';

const routes: Routes = [
  {path: 'taxas-ordem', component: TaxasOrdemComponent},
  {path: '', redirectTo: 'taxas-ordem', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
