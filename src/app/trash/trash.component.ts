import { Component, OnInit } from '@angular/core';
import { Status } from '../DTOs/projects.dto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent {

  project_list = []

  constructor(private data: DataService) { }

  async ionViewWillEnter() {
    await this.updateProjectList()
  }

  async updateProjectList() {
    this.project_list = await this.data.getProjects(Status.remove)
  }

  trackByFn() {
    return this.project_list;
  }

}
