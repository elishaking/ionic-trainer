import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-produce-pep-talks',
  templateUrl: 'produce-pep-talks.html',
})
export class ProducePepTalksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProducePepTalksPage');
  }

  recordPEPTalk(){
    this.toastCtrl.create({
      message: 'Coming soon',
      duration: 3000,
      dismissOnPageChange: true,
      closeButtonText: 'OK',
      showCloseButton: true
    }).present();
  }

}
