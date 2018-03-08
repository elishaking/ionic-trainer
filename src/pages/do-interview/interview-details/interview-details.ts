import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-interview-details',
  templateUrl: 'interview-details.html',
})
export class InterviewDetailsPage {
  createInterviewForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.createInterviewForm = new FormBuilder().group({
      title: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
      description: ['', Validators.compose([Validators.maxLength(2000)])],
    });
  }

  ionViewDidLoad() {
  }

  continue(){
    this.submitTry = true;

    if(this.createInterviewForm.valid){
      this.submitTry = false;
      let interview = this.navParams.get('interview');
      interview.title = this.createInterviewForm.value['title'];
      interview.description = this.createInterviewForm.value['description'];
      this.navCtrl.pop();
    }
  }

  cancel(){
    this.navCtrl.pop();
  }

}
