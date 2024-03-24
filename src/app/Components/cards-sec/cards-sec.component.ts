import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { Observable, filter } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { CartService } from '../../Services/cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-cards-sec',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [DemoService, AllBooksService],
  templateUrl: './cards-sec.component.html',
  styleUrl: './cards-sec.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsSecComponent implements AfterViewInit {
  computerBooks: any[] = [];
  psychologyBooks: any[] = [];
  scienceBooks: any[] = [];
  YoungAdultFiction: any[] = [];
  book$!: Observable<Book_module>;
  user_id: any;

  constructor(
    private allbooks: AllBooksService,
    private route: Router,
    private bookurl: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private cart: CartService,
    private fire_auth: AuthService
  ) {
    this.fire_auth.getUser().subscribe((user) => {
      if (user?.uid) {
        this.user_id = user.uid;
      }
    });
    this.route.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('/details/')) {
          this.scrollToTop();
        }
      });

    allbooks.getAllFromAllBooks().subscribe((res: any) => {
      this.computerBooks = [];
      this.psychologyBooks = [];
      this.scienceBooks = [];
      this.YoungAdultFiction = [];
      // Define the type of 'res' as 'Book_module[]'
      for (let i = 0; i < res.length; i++) {
        if (res[i]['categories'] == 'Computers') {
          this.computerBooks.push(res[i]);
        } else if (res[i]['categories'] == 'Psychology') {
          this.psychologyBooks.push(res[i]);
        } else if (res[i]['categories'] == 'Science') {
          this.scienceBooks.push(res[i]);
        } else if (res[i]['categories'] == 'Story') {
          this.YoungAdultFiction.push(res[i]);
        }
        // console.log(res[i]['categories']);
      }
      // console.log(this.computerBooks);
    });
  }
  scrollToTop() {
    // Scroll to the top of the page
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  fav(e: Event) {
    const element = e.target as HTMLElement;
    if (element) {
      if (element.style.color != 'white' && element.style.color) {
        element.style.color = 'white';
      } else {
        element.style.color = '#5c4e79';
      }
    } else {
      // console.log('Element not found');
    }
  }

  addthistocart(book: Book_module, book_id: string) {
    if (this.user_id) {
      let cartItems: any[] = [];
      let flag = true;
      this.cart.getAllFromCart(this.user_id).subscribe((res) => {
        cartItems = [];
        for (let i = 0; i < res.length; i++) {
          cartItems.push(res[i]);
          if (res[i].book_id == book_id) {
            flag = false;
          }
        }
        if (flag) {
          this.cart.addToCart(book, book_id, 1, this.user_id);
          alert('this item add to cart');
        }
      });
    } else {
      alert('you must login first');
    }
    // console.log(book_id);
  }

  @ViewChild('swiperEx') swiperEx?: ElementRef;

  ngAfterViewInit(): void {
    register();
  }
}
