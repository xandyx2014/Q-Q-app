import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubproductoPage } from './subproducto.page';

const routes: Routes = [
  {
    path: '',
    component: SubproductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubproductoPageRoutingModule {}
