import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project, Status } from '../DTOs/projects.dto'
import { PopoverController } from '@ionic/angular';
import { Popover } from '../components/popover/popover.component';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
})
export class DetailPage {
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
  ) { }
  addItem = false
  item_list = []
  item_name = ''
  id = ''
  currentPro: Project

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async ionViewWillEnter() {
    this.route.paramMap.subscribe(async url => {
      this.id = url.get('id');
      this.currentPro = await this.getCurrentPro(this.id)
      await this.updateItemList()
    })
  }

  async updateItemList() {
    this.item_list = (
      await this.data.getPro(this.id))
      .items
      .filter(x => x.status == Status.active
      )
    console.log('items', this.item_list)
  }

  async setItem() {
    this.addItem = true
  }

  trackByFn() {
    return this.item_list;
  }

  async getCurrentPro(id) {
    return await this.data.getPro(id);
  }

  async addNewItem() {
    this.addItem = false
    await this.data.setItem(this.id, this.item_name)
    this.item_name = ''
    await this.updateItemList()
  }

  async presentPopover(id, name, type) {
    let proId = this.id

    const popover = await this.popoverController.create({
      component: Popover,
      translucent: true,
      animated: true,
      componentProps: { id, proId, name, type }
    });
    await popover.present();
    await popover.onDidDismiss().then(async () => {
      await this.updateItemList()
    });
  }

  async clearItems() {
    await this.data.deleteAllItems(this.id)
    await this.updateItemList()
  }



}
