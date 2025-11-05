import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing',
  imports: [...MATERIAL_IMPORTS, RouterLink, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  slides = [
    {
      icon: 'build',
      title: 'Parts Management',
      description: 'Track, Update and organisze automotive parts effortlessly.',
    },
    {
      icon: 'groups',
      title: 'Employee Control',
      description: 'Mange employee role and permissions with ease',
    },
    {
      icon: 'insights',
      title: 'Perforamance Analytics',
      description: 'Gain real-time insights into your business performance',
    },
  ];
  currentSlide = 0;

  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000);
  }
  nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1 + this.slides.length) % this.slides.length;
  }
  prevSlide() {
    this.currentSlide =
    (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

}
