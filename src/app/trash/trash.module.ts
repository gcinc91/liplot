import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { TrashComponent } from './trash.component';
import { TrashPageRoutingModule } from './trash-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TrashPageRoutingModule
  ],
  declarations: [TrashComponent]
})
export class TrashPageModule { }
