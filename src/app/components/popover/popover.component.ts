import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'popover-pro',
  templateUrl: 'popover.html',
  styleUrls: ['./popover.scss']
})
export class Popover {
  constructor(
    private data: DataService,
    private popover: PopoverController,
  ) { }
  id: string
  proId: string
  name: string
  type: string

  noFunction() {
    this.popover.dismiss();
  }

  async deleteFunction() {

    await this.data.changeProStatus(this.proId, this.type, this.id)
    this.popover.dismiss();
  }
}