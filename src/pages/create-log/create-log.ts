import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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

      let date = this.getDayTime();
      let log = {
        title: this.createLogForm.value['title'],
        description: this.createLogForm.value['description'],
        date: date[0] + " " + date[1]
      }
      let logs = this.navParams.get('logs');
      logs.unshift(log);
      this.navParams.get('checked').unshift(false);

      this.storage.set('logs', logs).then(() => {
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

  getDayTime(): [string, string] {
    let date = new Date();
    return [date.toDateString(), this.get12HourFormat(date)];
  }

  get12HourFormat(date: Date) {
    let h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    let hours = h < 10 ? "0" + h : String(h);
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : String(date.getMinutes());
    // let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : String(date.getSeconds());

    return hours + ":" + minutes + " " + am_pm;
  }

  close() {
    this.navCtrl.pop();
  }

}
