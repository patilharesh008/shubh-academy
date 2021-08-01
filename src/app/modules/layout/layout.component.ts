import { Component, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2){
    
  }

  ngOnInit(): void {
    this.renderer.removeClass(this.document.body, 'login-page');
    this.renderer.addClass(this.document.body, 'skin-blue');
    this.renderer.addClass(this.document.body, 'sidebar-mini');
  }
}
