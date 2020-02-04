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
          },
          {
            path: 'productos/:id',
            loadChildren: () => import('./pages/productos/producto/producto.module').then( m => m.ProductoPageModule)
          },
          {
            path: 'subproductos',
            loadChildren: () => import('./pages/productos/subproducto/subproducto.module').then(m => m.SubproductoPageModule)
          },
          {
            path: 'carrito',
            loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
          },
          {
            path: 'pedido',
            loadChildren: () => import('./pages/carrito/pedido/pedido.module').then(m => m.PedidoPageModule)
          },
          {
            path: 'pedidos',
            loadChildren: () => import('./pages/pedidos/pedidos.module').then(m => m.PedidosPageModule)
          },
          {
            path: 'detalle-pedido',
            loadChildren: () => import('./pages/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
