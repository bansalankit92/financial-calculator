import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'financial-calculator';
  mode = "side"
  isMobile = false;

  constructor(){
    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.mode = "over";
      this.isMobile = true;
    }
    else if(/Chrome/i.test(ua)){
      this.mode = "side";
      this.isMobile = false;
    }else{
      this.mode = "side";
      this.isMobile = false;
    }
  }
}
