import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Popover } from '../components/popover/popover.component';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    @ViewChild('slideOps') slideOps
    @ViewChild('inputToAdd') inputToAdd;
    addProject = false
    project_list = []
    pro_name = ''
    edit = false

    constructor(
        private data: DataService,
        private popoverController: PopoverController,
        private cdRef: ChangeDetectorRef
    ) { }

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

    async setProject() {
        this.addProject = true
        this.cdRef.detectChanges();
        this.inputToAdd.el.setFocus()
    }

    trackByFn() {
        return this.project_list;
    }
    async clearProjects() {
        await this.data.deleteAllProjects()
        await this.updateProjectList()
    }

    async addNewProject() {
        this.addProject = false
        await this.data.setProject(this.pro_name)
        this.pro_name = ''
        await this.updateProjectList()
    }

    async editing() {
        this.edit = !this.edit
        this.edit ?
            await this.slideOps.open() :
            await this.slideOps.close()
    }

    async presentPopover(id) {
        const popover = await this.popoverController.create({
            component: Popover,
            translucent: true,
            animated: true,
            componentProps: { id }
        });
        await popover.present();
        await popover.onDidDismiss().then(async () => {
            await this.updateProjectList()
        });
    }

}
