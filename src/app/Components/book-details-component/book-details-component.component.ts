import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { Observable } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { AsyncPipe, CommonModule, ViewportScroller } from '@angular/common';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { CardsSecComponent } from '../cards-sec/cards-sec.component';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-book-details-component',
  standalone: true,
  imports: [AsyncPipe, CommonModule, CardsSecComponent, RouterModule],
  templateUrl: './book-details-component.component.html',
  styleUrl: './book-details-component.component.css',
})
export class BookDetailsComponentComponent implements OnInit {
  book_id = '';
  book$!: Observable<Book_module>;
  user_id: any;
  constructor(
    private route: Router,
    private bookurl: ActivatedRoute,
    private serve: AllBooksService,
    private cart: CartService,
    private fav: FavService,
    private ViewportScroller: ViewportScroller,
    private fire_auth: AuthService
  ) {
    this.book_id = bookurl.snapshot.params['id'];
    this.ViewportScroller.scrollToPosition([0, 0]);
    this.fire_auth.getUser().subscribe((user) => {   
      if(user?.uid){
        this.user_id = user.uid;
      }
    });
  }

  ngOnInit(): void {
    this.book_id = this.bookurl.snapshot.params['id'];

    this.book$ = this.serve.getOneBook(this.book_id);

    this.serve.getOneBook(this.book_id).subscribe((res: any) => {
      this.counter = res.averageRating;
    });
    this.bookurl.paramMap.subscribe((params) => {
      const newBookId = params.get('id');

      if (newBookId !== this.book_id) {
        // The 'id' parameter has changed
        this.book_id = newBookId || '';
        this.route
          .navigate(['/about_us'], { replaceUrl: false })
          .then(() =>
            this.route.navigate([
              '/details',
              this.bookurl.snapshot.params['id'],
            ])
          );
      }
    });

    this.fire_auth.getUser().subscribe((user) => {
      if (user?.uid) {
        this.user_id = user.uid;
      }
    });
  }

  count = signal(1);

  counter: any;
  getStarsArray(num: number): number[] {
    const starsArray: number[] = [];
    for (let i = 0; i < num; i += 0.5) {
      starsArray.push(i + 0.5);
    }

    return starsArray;
  }

  countplus() {
    this.count.update((num) => num + 1);
  }

  countmin() {
    if (this.count() > 1) {
      this.count.update((num) => num - 1);
    }
  }

  Writereview() {
    this.route
      .navigate(['/'], { replaceUrl: false })
      .then(() => this.route.navigate(['/review', this.book_id]));
  }

  addtofav(book: Book_module) {
    if (this.user_id) {
      alert('this item add to fav');
      let cartItems: any[] = [];
      let flag = true;

      this.fav.getAllFromFav(this.user_id).subscribe((res) => {
        cartItems = [];
        for (let i = 0; i < res.length; i++) {
          cartItems.push(res[i]);
          if (res[i].book_id == this.book_id) {
            flag = false;
          }
        }
        if (flag) {
          this.fav.addToFav(book, this.book_id, this.user_id);
        }
      });
    } else {
      alert('you must login first');
    }
  }

  addtocart(book: Book_module) {
    if (this.user_id) {
      let cartItems: any[] = [];
      let flag = true;

      this.cart.getAllFromCart(this.user_id).subscribe((res) => {
        cartItems = [];
        for (let i = 0; i < res.length; i++) {
          cartItems.push(res[i]);
          if (res[i].book_id == this.book_id) {
            flag = false;
            // console.log(res[i].book_id + '  ' + this.book_id);
          }
        }
        if (flag) {
          this.cart.addToCart(book, this.book_id, this.count(), this.user_id);
        }
      });
      alert('this item add to cart');
    } else {
      alert('you must login first');
    }
  }
}
