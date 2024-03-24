import { CommonModule,ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-about-us',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements AfterViewInit {
  
  constructor(private route :Router,private ViewportScroller: ViewportScroller) {
    // this.route.events.pipe(
    //   filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   if (event.urlAfterRedirects.includes('/details/')) {
    //     this.scrollToTop();
    //   }
    // });
   this.ViewportScroller.scrollToPosition([0, 0]);
  }
  
  swiperData = [
    {
      image: '../../../assets/Images/image1.jpg',
      title: 'Sohila Tarek',
      text: 'Full-Stack .Net Developer',
      details:
        'Graduated From: Faculty Of Computer Science And Information Systems',
      details2: 'Year: 2023',
    },
    {
      image: '../../../assets/Images/image2.jpg',
      title: 'Joy Adel',
      text: 'Full-Stack .Net Developer',
      details: 'Graduated From: Computers and artificial intelligence',
      details2: 'Year: 2023',
    },
    {
      image: '../../../assets/Images/image3.jpg',
      title: 'Islam Mohamed',
      text: 'Full-Stack .Net Developer',
      details: 'Graduated From: Faculty Of Engineering Cairo University',
      details2: 'Year: 2023',
    },
    {
      image: '../../../assets/Images/image4.jpg',
      title: 'Mina Bahgt',
      text: 'Full-Stack .Net Developer',
      details: 'Graduated From: Faculty of computer and information systems',
      details2: 'Year: 2020',
    },
    {
      image: '../../../assets/Images/image5.jpg',
      title: 'Fady Yousry',
      text: 'Full-Stack .Net Developer',
      details: 'Graduated From: Faculty of computer and information systems',
      details2: 'Year: 2023',
    },
  ];
  @ViewChild('swiperEx') swiperEx?: ElementRef;

  ngAfterViewInit(): void {
    register();
    if (this.swiperEx) {
      const swiperInstance = new Swiper(this.swiperEx.nativeElement, {
        navigation: true,
        pagination: { type: 'bullets', clickable: true },
        autoplay: true,
        cubeEffect: {
          shadow: false,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
    }
  }
}
