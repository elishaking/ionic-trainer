import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskGroup } from '../../../models/interfaces';

@Component({
  selector: 'page-previous-tasks',
  templateUrl: 'previous-tasks.html',
})
export class PreviousTasksPage {
  taskGroup: TaskGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.taskGroup = this.navParams.get('taskGroup');
  }

  ionViewDidLoad() {
  }

}
