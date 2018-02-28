import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';

import { Talk } from '../../../models/interfaces';
import { Storage } from '@ionic/storage';
import { getDayTime } from '../../../models/functions';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-record-talk',
  templateUrl: 'record-talk.html',
})
export class RecordTalkPage {
  talks: Talk[] = [];

  hours = 0;
  minutes = 0;
  seconds = 0;

  hrs = '00';
  mins = '00';
  secs = '00';

  recording = false;
  recordPaused = false;
  recordTimer = 0;
  recordingFile: MediaObject;
  nTalks = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private media: Media, private storage: Storage, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.storage.get('nTalks').then((nTalks) => {
      this.nTalks = nTalks ? nTalks : 0;
    });
    this.talks = this.navParams.get('talks');
  }

  presentMsg(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'OK',
      // dismissOnPageChange: true
    }).present();
  }

  pad(n: number){
    return n > 9 ? '' + n : '0' + n;
  }

  toggleRecord(){
    if(!this.recording){
      this.recording = true;

      if(this.recordPaused){
        this.recordingFile.resumeRecord();
        this.recordPaused = false;
      } else{
        this.recordingFile = this.media.create('talk_' + (++this.nTalks) + '.3gp');
        this.recordingFile.onError.subscribe((e) => {
          this.presentMsg('Error occured while saving recording');
        });
        this.recordingFile.onSuccess.subscribe(() => {
          this.presentMsg('recording saved');
        });
        this.recordingFile.startRecord();
      }

      this.recordTimer = setInterval(()=>{
        if(this.seconds == 59){
          this.seconds = 0;
          if(this.minutes == 59){
            this.minutes = 0;
            this.hours++;
            this.hrs = this.pad(this.hours);
          } else{
            this.minutes++;
            this.mins = this.pad(this.minutes);
          }
        } else{
          this.seconds++;
          this.secs = this.pad(this.seconds);
        }
      }, 1000);
    } else{
      this.recording = false;
      this.recordPaused = true;
      clearInterval(this.recordTimer);
      this.recordingFile.pauseRecord();
    }
  }

  finishRecording(){
    this.recording = false;
    clearInterval(this.recordTimer);
    this.resetTimer();
    this.recordingFile.stopRecord();
    let date = getDayTime();
    let talk: Talk = {
      title: 'PEP Talk ' + (this.nTalks),
      name: 'talk_' + (this.nTalks) + '.3gp',
      length: this.recordingFile.getDuration() + '',
      date: date[0] + " " + date[1],
    }
    this.recordingFile.release();
    this.talks.unshift(talk);
    this.storage.set('talks', this.talks);
    this.storage.set('nTalks', this.nTalks);
    this.navCtrl.pop();
  }

  resetTimer(){
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    this.hrs = '00';
    this.mins = '00';
    this.secs = '00';
  }

}
