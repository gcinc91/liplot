import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
})
export class DetailPage {
  constructor(private data: DataService) {}
  addItem = false
  item_list = []
  item_name = ''

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }


}
