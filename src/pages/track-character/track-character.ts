import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { SetUpTrackerPage } from './set-up-tracker/set-up-tracker';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-track-character',
  templateUrl: 'track-character.html',
})
export class TrackCharacterPage {
  grade = '';
  count = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private storage: Storage, private toastCtrl: ToastController) {
    this.storage.get('grade').then((grade) => {
      this.grade = grade ? grade : '';
    })
  }

  ionViewDidLoad() {
  }

  setUpTracker(){
    this.modalCtrl.create(SetUpTrackerPage).present();
  }

  updateGrade(){
    if(this.count > 0){
      this.toastCtrl.create({
        message: 'Grade has been updated',
        duration: 3000,
      }).present();
      this.storage.set('grade', this.grade);
    } else{
      this.count++;
    }
  }

  viewResponse(){

  }

}
