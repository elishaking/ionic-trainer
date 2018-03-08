import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Activity } from '../../../models/interfaces';
import { getDayTime } from '../../../models/functions';

@Component({
  selector: 'page-create-log',
  templateUrl: 'create-log.html',
})
export class CreateLogPage {
  createLogForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private toastCtrl: ToastController) {
    this.createLogForm = new FormBuilder().group({
      title: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.maxLength(200)])],
      description: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/), Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateLogPage');
  }

  save() {
    this.submitTry = true;

    if (this.createLogForm.valid) {
      this.submitTry = false;

      let date = getDayTime();
      let log = {
        title: this.createLogForm.value['title'],
        description: this.createLogForm.value['description'],
        date: date[0] + " " + date[1]
      }
      let logs = this.navParams.get('logs');
      logs.unshift(log);
      this.navParams.get('checked').unshift(false);

      this.storage.set('logs', logs).then(() => {
        this.storage.get('activities').then((activities: Activity[]) => {
          let a = activities ? activities : [];
          a.unshift({
            title: 'Created New Log',
            date: date[0] + " " + date[1]
          });
          this.storage.set('activities', a);
        });
        this.navCtrl.pop();
      }, () => {
        this.toastCtrl.create({
          message: 'Unable to create log, Please try again',
          duration: 3000,
          dismissOnPageChange: true
        }).present();
      });
    }
  }

  close() {
    this.navCtrl.pop();
  }

}
