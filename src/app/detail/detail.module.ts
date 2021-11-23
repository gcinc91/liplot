import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DetailPage } from './detail.page';
import { DetailPageRoutingModule } from './detail-routing.module';
import { Popover } from '../components/popover/popover.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
