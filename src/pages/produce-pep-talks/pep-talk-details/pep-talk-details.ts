import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-pep-talk-details',
  templateUrl: 'pep-talk-details.html',
})
export class PepTalkDetailsPage {

  createPEPTalkForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.createPEPTalkForm = new FormBuilder().group({
      title: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
      description: ['', Validators.compose([Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
  }

  continue(){
    this.submitTry = true;

    if(this.createPEPTalkForm.valid){
      this.submitTry = false;
      let talk = this.navParams.get('talk');
      talk.title = this.createPEPTalkForm.value['title'];
      talk.description = this.createPEPTalkForm.value['description'];
      this.navCtrl.pop();
    }
  }

  cancel(){
    this.navCtrl.pop();
  }

  close(){
    this.cancel();
  }

}
