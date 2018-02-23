import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Task } from '../../models/interfaces';

@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  createTaskForm: FormGroup;

  submitText = 'Next';
  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private toastCtrl: ToastController) {
    this.createTaskForm = new FormBuilder().group({
      title: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.maxLength(2000)])],
      description: ['', Validators.compose([Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateTaskPage');
  }

  save(){
    this.submitTry = true;

    if(this.createTaskForm.valid){
      this.submitTry = false;

      let date = new Date();
      let task: Task = this.createTaskForm.value;
      let todaysTasks: Task[] = this.navParams.get('todaysTasks');
      todaysTasks.unshift({
        title: task.title,
        description: task.description
      });
      this.navParams.get('checked').push(false);

      this.storage.set(
        'task_' + date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear(),
        todaysTasks
      ).then(() => {
        this.navCtrl.pop()
      }, () => {
        this.toastCtrl.create({
          message: "Unable to create task, Please try again",
          duration: 3000,
          dismissOnPageChange: true
        }).present();
      });
    }
  }

  close(){
    this.navCtrl.pop();
  }

}
