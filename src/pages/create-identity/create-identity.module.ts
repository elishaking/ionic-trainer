import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIdentityPage } from './create-identity';

@NgModule({
  declarations: [
    CreateIdentityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateIdentityPage),
  ],
})
export class CreateIdentityPageModule {}
