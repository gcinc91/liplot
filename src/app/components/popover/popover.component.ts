import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'popover-pro',
  templateUrl: 'popover.html',
  styleUrls: ['./popover.scss']
})
export class Popover implements OnInit {
  constructor(
    private data: DataService,
    private popover: PopoverController,
  ) { }
  id: string


  ngOnInit() {
    //print 123
    console.log('teh id', this.id);
  }

  noFunction() {
    console.log('On dismisss')
    this.popover.dismiss();
  }

  deleteFunction(id) {
    console.log('yes bobrorao')
  }
}