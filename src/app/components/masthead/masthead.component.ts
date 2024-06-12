import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [],
  templateUrl: './masthead.component.html',
  styleUrl: './masthead.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class MastheadComponent implements OnInit {
  constructor(
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.init();
  }
}