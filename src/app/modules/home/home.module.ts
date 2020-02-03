import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
          },
          {
            path: 'productos',
            loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
