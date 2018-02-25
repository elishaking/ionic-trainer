import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Interview } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-do-interview',
  templateUrl: 'do-interview.html',
})
export class DoInterviewPage {
  interviews: Interview[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('interviews').then((interviews: Interview[]) => {
      if(interviews)
        this.interviews = interviews;
    });
  }

  recordInterview(){
    this.toastCtrl.create({
      message: 'Coming soon',
      duration: 3000,
      dismissOnPageChange: true,
      closeButtonText: 'OK',
      showCloseButton: true
    }).present();
  }

}
