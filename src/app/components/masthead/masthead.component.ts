import { Component, OnInit, Signal, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.model';

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [],
  templateUrl: './masthead.component.html',
  styleUrl: './masthead.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class MastheadComponent implements OnInit {
  public readonly $languages: Signal<Language[]> = this.languageService.$languages;

  constructor(
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.init();
  }
}