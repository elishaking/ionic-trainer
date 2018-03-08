import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Task, TaskGroup } from '../../models/interfaces';
import { CreateTaskPage } from './create-task/create-task';
import { getDay } from '../../models/functions';

@Component({
  selector: 'page-commit-to-today',
  templateUrl: 'commit-to-today.html',
})
export class CommitToTodayPage {
  allTasks: TaskGroup[];
  todaysTasks: TaskGroup = {
    date: '',
    updated_date: '',
    tasks: []
  };
  checked: Boolean[] = [];
  // done: Boolean[] = [];

  showDeleteBtn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommitToTodayPage');
    let date = new Date();

    this.storage.get('allTasks').then((allTasks) => {
      this.allTasks = allTasks || [];
      // if(this.todaysTasks.length == 0){
      //   this.todaysTasks = [
      //     {
      //       title: 'New',
      //       description: 'Descript New'
      //     }
      //   ];
      // }
      // change if state - use && operator
      if(this.allTasks.length > 0){
        if(this.allTasks[0].date == getDay()){
          this.todaysTasks = this.allTasks[0];
        } else{
          this.allTasks.unshift({
            date: getDay(),
            updated_date: getDay(),
            tasks: []
          });
          this.todaysTasks = this.allTasks[0];
        }
      } else{
        this.allTasks.unshift({
          date: getDay(),
          updated_date: getDay(),
          tasks: []
        });
        this.todaysTasks = this.allTasks[0];
      }
    });

    this.updateChecked();
  }

  toggleChecked(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
  }

  toggleTaskCompleted(){
    this.storage.set('allTasks', this.allTasks);
  }

  updateChecked(){
    for(let i = 0; i < this.todaysTasks.tasks.length; i++){
      this.checked.push(false);
    }
  }

  addNewTask(){
    this.modalCtrl.create(CreateTaskPage, {
      'allTasks': this.allTasks,
      'todaysTasks': this.todaysTasks,
      'checked': this.checked
    }).present();
  }

  delete(){
    for(let i = 0; i < this.todaysTasks.tasks.length; i++){
      if(this.checked[i] == true){
        this.todaysTasks.tasks.splice(i, 1);
        this.checked.splice(i, 1);
        i--;
      }
    }
    this.storage.set('allTasks', this.allTasks);
  }

}
