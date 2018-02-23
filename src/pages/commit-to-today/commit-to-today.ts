import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Task } from '../../models/interfaces';
import { CreateTaskPage } from '../create-task/create-task';

@Component({
  selector: 'page-commit-to-today',
  templateUrl: 'commit-to-today.html',
})
export class CommitToTodayPage {
  todaysTasks: Task[] = [];
  checked: Boolean[] = [];
  done: Boolean[] = [];

  showDeleteBtn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommitToTodayPage');
    let date = new Date();

    this.storage.get('task_' + date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear()).then((tasks) => {
      this.todaysTasks = tasks ? tasks : [];
      // if(this.todaysTasks.length == 0){
      //   this.todaysTasks = [
      //     {
      //       title: 'New',
      //       description: 'Descript New'
      //     }
      //   ];
      // }
    }).then(() => {
      this.storage.get('done_' + date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear()).then((done) => {
        this.done = done ? done : [];
        if(this.done.length == 0){
          for(let i = 0; i < this.todaysTasks.length; i++){
            this.done.push(false);
          }
          this.storage.set('done_' + date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear(), done);
        }
      });
    });

    this.updateChecked();
  }

  cc(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
  }

  donec(){
    
  }

  updateChecked(){
    for(let i = 0; i < this.todaysTasks.length; i++){
      this.checked.push(false);
    }
  }

  addNewTask(){
    this.modalCtrl.create(CreateTaskPage, {
      'todaysTasks': this.todaysTasks,
      'checked': this.checked
    }).present();
  }

  delete(){

  }

}
