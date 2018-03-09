import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Log } from '../../models/interfaces';
import { CreateLogPage } from './create-log/create-log';

@Component({
  selector: 'page-log-progress',
  templateUrl: 'log-progress.html',
})
export class LogProgressPage {
  logs: Log[] = [];

  checked: Boolean[] = [];
  showDeleteBtn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LogProgressPage');
    // let date = new Date();

    this.storage.get('logs').then((logs) => {
      this.logs = logs ? logs : [];
      this.updateChecked();
    });
  }

  toggleChecked(){
    this.showDeleteBtn = this.checked.indexOf(true) != -1;
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

  delete(){
    for(let i = 0; i < this.logs.length; i++){
      if(this.checked[i] == true){
        this.logs.splice(i, 1);
        this.checked.splice(i, 1);
        i--;
      }
    }
    this.storage.set('logs', this.logs);
    this.showDeleteBtn = false;
  }

}
