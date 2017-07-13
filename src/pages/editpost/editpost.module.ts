import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Editpost } from './editpost';

@NgModule({
  declarations: [
    Editpost,
  ],
  imports: [
    IonicPageModule.forChild(Editpost),
  ],
  exports: [
    Editpost
  ]
})
export class EditpostModule {}
