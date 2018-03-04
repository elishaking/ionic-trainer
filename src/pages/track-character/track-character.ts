import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetUpTrackerPage } from './set-up-tracker/set-up-tracker';

@Component({
  selector: 'page-track-character',
  templateUrl: 'track-character.html',
})
export class TrackCharacterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  setUpTracker(){
    this.modalCtrl.create(SetUpTrackerPage).present();
  }

  enterGrade(){

  }

  viewResponse(){

  }

}
