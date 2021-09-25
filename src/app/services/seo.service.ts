import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    this.title.setTitle(title + ' | Financial Calculator' );
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag({ property: 'og:description', content: desc });
  }
}
