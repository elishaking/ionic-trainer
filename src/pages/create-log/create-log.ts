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

  save(){
    this.submitTry = true;

    if(this.createLogForm.valid){
      this.submitTry = false;

      let log = {
        title: this.createLogForm.value['title'],
        description: this.createLogForm.value['description']
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

  close(){
    this.navCtrl.pop();
  }

}
