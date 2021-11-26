import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DetailPageModule } from '../detail/detail.module';
import { ComponentsModule } from '../components/components.module';
import { TrashPageModule } from '../trash/trash.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DetailPageModule,
    ComponentsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
