import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MastheadComponent } from './components/masthead/masthead.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MastheadComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {}