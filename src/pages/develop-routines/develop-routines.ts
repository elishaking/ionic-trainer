import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Routine } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CreateRoutinePage } from '../create-routine/create-routine';

@Component({
  selector: 'page-develop-routines',
  templateUrl: 'develop-routines.html',
})
export class DevelopRoutinesPage {
  routines: Routine[] = [];
  checked: Boolean[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DevelopRoutinesPage');

    this.storage.get('routines').then((routines) => {
      console.log(routines)
      this.routines = routines ? routines : [];
    });
  }

  updateChecked(){
    for(let i = 0; i < this.routines.length; i++){
      this.checked.push(false);
    }
  }

  addRoutine(){
    this.modalCtrl.create(CreateRoutinePage, {
      'routines': this.routines,
      'checked': this.checked
    }).present();
  }

}
