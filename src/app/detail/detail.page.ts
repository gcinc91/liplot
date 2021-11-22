import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Project } from '../DTOs/projects.dto'

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
})
export class DetailPage {
  constructor(
    private data: DataService,
    private route: ActivatedRoute
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
    this.item_list = (await this.data.getPro(this.id)).items
  }

  async setItem() {
    this.addItem = true
  }

  trackByFn() {
    return this.item_list;
  }

  async clearProjects() {
    await this.data.clear()
    await this.updateItemList()
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


}
