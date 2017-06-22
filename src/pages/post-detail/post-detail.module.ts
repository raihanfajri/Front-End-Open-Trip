import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDetail } from './post-detail';

@NgModule({
  declarations: [
    PostDetail,
  ],
  imports: [
    IonicPageModule.forChild(PostDetail),
  ],
  exports: [
    PostDetail
  ]
})
export class PostDetailModule {}
