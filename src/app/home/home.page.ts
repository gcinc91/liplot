import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService) {}
  addProject = false
  project_list = []
  pro_name = ''

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async ionViewWillEnter() {
    await this.updateProjectList()
  }

  async updateProjectList() {
    this.project_list = await this.data.getProjects()
  }

  async setProject(){
    this.addProject = true
  }

  trackByFn(){
    return this.project_list;
  }
  async clearProjects(){
    await this.data.clear()
    await this.updateProjectList()
  }

  async addNewProject(){
    this.addProject = false
    await this.data.setProject(this.pro_name)
    this.pro_name = ''
    await this.updateProjectList()
  }

}
