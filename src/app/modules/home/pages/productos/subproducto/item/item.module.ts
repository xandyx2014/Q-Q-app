import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { ItemComprarComponent } from '../components/item-comprar/item-comprar.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
    ItemPageRoutingModule
  ],
  declarations: [
    ItemPage,
    ItemComprarComponent],
  entryComponents: [
    ItemComprarComponent
  ]
})
export class ItemPageModule {}
