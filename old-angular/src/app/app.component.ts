import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './services/seo.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'financial-calculator';
  mode = "side"
  isMobile = false;

  constructor( public breakpointObserver: BreakpointObserver, private router:Router, private _seoService: SeoService, private activatedRoute: ActivatedRoute){
  //   console.log(isPlatformBrowser(platformId),navigator);
    
  //   if(isPlatformBrowser(platformId)&&navigator){
  //        var ua = navigator.userAgent;

  //   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
  //     this.mode = "over";
  //     this.isMobile = true;
  //   }
  //   else if(/Chrome/i.test(ua)){
  //     this.mode = "side";
  //     this.isMobile = false;
  //   }else{
  //     this.mode = "side";
  //     this.isMobile = false;
  //   }
  // }

  
}
  ngOnInit(): void {

    this.breakpointObserver
    .observe(['(min-width: 400px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mode = "side";
        this.isMobile = false;
      } else {
        this.mode = "over";
        this.isMobile = true;
      }      
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     )
     .subscribe((event) => {
       this._seoService.updateTitle(event['title']);
       this._seoService.updateOgUrl(event['ogUrl']);
       //Updating Description tag dynamically with title
       this._seoService.updateDescription(event['description'])
     }); 
  }
}
