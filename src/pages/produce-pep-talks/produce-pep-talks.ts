import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';
import { RecordTalkPage } from './record-talk/record-talk';
import { Talk } from '../../models/interfaces';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-produce-pep-talks',
  templateUrl: 'produce-pep-talks.html',
})
export class ProducePepTalksPage {
  talks: Talk[] = [];

  playing = false;
  stopped = true;
  playObj: MediaObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private media: Media, private storage: Storage) {
      // this.talks = [{
      //   title: 'PEP Talk 4',
      //   name: 'talk_4.3gp',
      //   date: 'date',
      //   length: '3'
      // }];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProducePepTalksPage');
    this.storage.get('talks').then((talks: Talk[]) => {
      this.talks = talks;
    });
  }

  recordPEPTalk(){
    this.navCtrl.push(RecordTalkPage, {
      'talks': this.talks
    });
  }

  togglePlay(){
    if(this.playing){
      this.playObj.pause();
      this.playing = false;
    } else{
      if(this.stopped){
        this.playObj = this.media.create('talk_4.3gp');
        this.stopped = false;
      }

      this.playObj.play();
      this.playing = true;
    }
  }

  stopPlay(){
    this.playing = false;
    this.stopped = true;
    this.playObj.stop();
    this.playObj.release();
  }

}
