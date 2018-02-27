import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Interview } from '../../models/interfaces';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { RecordInterviewPage } from './record-interview/record-interview';

@Component({
  selector: 'page-do-interview',
  templateUrl: 'do-interview.html',
})
export class DoInterviewPage {
  interviews: Interview[] = [];

  playing = false;
  stopped = true;
  playObj: MediaObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private media: Media, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('interviews').then((interviews: Interview[]) => {
      if(interviews)
        this.interviews = interviews;
    });
  }

  recordInterview(){
    this.navCtrl.push(RecordInterviewPage, {
      'interviews': this.interviews
    });
  }

  togglePlay(){
    if(this.playing){
      this.playObj.pause();
      this.playing = false;
    } else{
      if(this.stopped){
        this.playObj = this.media.create('interview_4.3gp');
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
