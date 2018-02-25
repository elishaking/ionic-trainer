import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-have-faith',
  templateUrl: 'have-faith.html',
})
export class HaveFaithPage {
  createFaithForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private toastCtrl: ToastController) {
    this.createFaithForm = new FormBuilder().group({
      belief: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
      successReason: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
    
  }

  save(){
    this.submitTry = true;

    if(this.createFaithForm.valid){
      this.submitTry = false;

      this.storage.set('faith', {
        belief: this.createFaithForm.value['belief'],
        successReason: this.createFaithForm.value['successReason']
      }).then(() => {
        this.presentToast('Faith Saved');
      }, () => {
        this.presentToast('Error occurred while saving Faith');
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
