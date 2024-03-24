import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router) { }

  currentRoute:string='';
  ngOnInit() {
    // Subscribe to router events to detect navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Access the current route URL
        this.currentRoute = this.router.url;
      }
    });
  }
  psychologyc_navagte() {
    if (this.currentRoute === '/') {
      window.scrollTo(2020,2020);
    } else {
      this.router.navigate(['/']).then(() => {
        // window.scrollTo(2000, 2000);
      });

  }
  }

  science_navagte() {
    if (this.currentRoute === '/') {
      window.scrollTo(1370,1370);
    } else {
      this.router.navigate(['/']).then(() => {
        // window.scrollTo(2000, 2000);
      });

  }
  }
  prog_navagte() {
    if (this.currentRoute === '/') {
      window.scrollTo(750,750);
    } else {
      this.router.navigate(['/']).then(() => {
        // window.scrollTo(750,750);
      });

  }
  }
  story_navagte() {
    if (this.currentRoute === '/') {
      window.scrollTo(2650,2650);
    } else {
      this.router.navigate(['/']).then(() => {
        // window.scrollTo(750,750);
      });

  }
  }
}
