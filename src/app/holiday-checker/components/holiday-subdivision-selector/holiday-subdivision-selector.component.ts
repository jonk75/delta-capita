import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SubdivisionService, Subdivisions } from '../../../services/subdivision.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-subdivision-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-subdivision-selector.component.html',
  styleUrl: './holiday-subdivision-selector.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HolidaySubdivisionSelectorComponent {
  public readonly subdivisions: Subdivisions = this.subdivisionService.subvivisions;

  constructor(
    private readonly subdivisionService: SubdivisionService
  ) {}

  // PUBLIC METHODS

  public async setSubdivision(
    event: Event
  ) {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    console.log(target.value);
  }
}