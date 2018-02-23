import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-create-identity',
  templateUrl: 'create-identity.html',
})
export class CreateIdentityPage {
  createIdentityForm: FormGroup;

  submitText = 'Next';
  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private toastCtrl: ToastController) {
    this.createIdentityForm = new FormBuilder().group({
      athleticDreams: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
      attitudeSlogan: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateIdentityPage');
  }

  save(){
    this.submitTry = true;

    if(this.createIdentityForm.valid){
      this.submitTry = false;

      this.storage.set('identity', {
        athleticDreams: this.createIdentityForm.value['athleticDreams'],
        attitudeSlogan: this.createIdentityForm.value['attitudeSlogan']
      }).then(() => {
        this.presentToast('Identity Saved');
      }, () => {
        this.presentToast('Error occurred while saving identity');
      });
    }
  }

  presentToast(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      dismissOnPageChange: true
    }).present();
  }

}
