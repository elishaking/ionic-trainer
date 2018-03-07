import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signInForm: FormGroup;
  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController) {
      this.signInForm = new FormBuilder().group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])],
        password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      });
  }

  ionViewDidLoad() {
  }

  signIn(){
    this.submitTry = true;
    if(this.signInForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Signing In',
        enableBackdropDismiss: true
      });
      loading.present();

      setTimeout(()=>{
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }, 3000);
    }
  }

  signUp(){
    // review - pop or push
    this.navCtrl.push(SignupPage);
  }

}
