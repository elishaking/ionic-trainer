import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  contactUsForm: FormGroup;

  submitTry = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private emailComposer: EmailComposer) {
    this.contactUsForm = new FormBuilder().group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(2000)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\_]*@[a-zA-Z0-9\.\_]*\.[a-zA-Z0-9\.\_]*$/), Validators.maxLength(150)])],
      message: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])]
    });
  }

  ionViewDidLoad() {
  }

  submit(){
    this.submitTry = true;

    if(this.contactUsForm.valid){
      this.submitTry = false;
      let msg = {
        name: this.contactUsForm.value.name,
        email: this.contactUsForm.value.email,
        message: this.contactUsForm.value.message
      }
      // this.emailComposer.isAvailable().then((available: boolean) =>{
      //   if(available) {
          
      //   }
      // });
      let email = {
        to: 'darreljordan1980@gmail.com',
        // bcc: ['john@doe.com', 'jane@doe.com'],
        // attachments: [
        //   'file://img/logo.png',
        //   'res://icon.png',
        //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        //   'file://README.pdf'
        // ],
        subject: 'BdTough: Message from ' + msg.name + ': ' + msg.email,
        body: msg.message,
        // isHtml: true
      };
      
      this.emailComposer.open(email).then(() => {
        this.navCtrl.pop();
      });

    }
  }

}
