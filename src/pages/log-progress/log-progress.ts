import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Log } from '../../models/interfaces';
import { CreateLogPage } from '../create-log/create-log';

@Component({
  selector: 'page-log-progress',
  templateUrl: 'log-progress.html',
})
export class LogProgressPage {
  logs: Log[] = [];
  checked: Boolean[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LogProgressPage');
    // let date = new Date();

    this.storage.get('logs').then((logs) => {
      console.log(logs)
      this.logs = logs ? logs : [];
    });
  }

  updateChecked(){
    for(let i = 0; i < this.logs.length; i++){
      this.checked.push(false);
    }
  }

  addLog(){
    this.modalCtrl.create(CreateLogPage, {
      'logs': this.logs,
      'checked': this.checked
    }).present();
  }

}
