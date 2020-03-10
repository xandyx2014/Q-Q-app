import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { ItemComprarComponent } from '../components/item-comprar/item-comprar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
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
