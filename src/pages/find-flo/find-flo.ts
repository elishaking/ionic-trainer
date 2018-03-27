import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { SetupFloTrackerPage } from './setup-flo-tracker/setup-flo-tracker';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-find-flo',
  templateUrl: 'find-flo.html',
})
export class FindFloPage {

  grade = '';
  count = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, private storage: Storage, private toastCtrl: ToastController) {
    this.storage.get('gradeFlo').then((grade) => {
      this.grade = grade ? grade : '';
    })
  }

  ionViewDidLoad() {
  }

  setUpTracker(){
    this.modalCtrl.create(SetupFloTrackerPage).present();
  }

  updateGrade(){
    if(this.count > 0){
      this.toastCtrl.create({
        message: 'Grade has been updated',
        duration: 3000,
      }).present();
      this.storage.set('gradeFlo', this.grade);
    } else{
      this.count++;
    }
  }

  viewResponse(){

  }

}
