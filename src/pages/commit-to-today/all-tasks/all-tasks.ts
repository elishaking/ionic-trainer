import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskGroup } from '../../../models/interfaces';
import { Storage } from '@ionic/storage';
import { PreviousTasksPage } from '../previous-tasks/previous-tasks';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html',
})
export class AllTasksPage {
  allTasks: TaskGroup[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.allTasks = this.navParams.get('allTasks');
  }

  ionViewDidLoad() {
  }

  showTaskGroup(pos){
    this.navCtrl.push(PreviousTasksPage, {
      'taskGroup': this.allTasks[pos]
    })
  }

}
