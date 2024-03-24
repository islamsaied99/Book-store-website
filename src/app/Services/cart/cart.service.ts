import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { Cart_Book_module } from '../../modules/cartBook.module';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private fire_store: Firestore) {}

  getAllFromCart(userid: string) {
    let cart_url = 'users/' + userid + '/cart';
    let collect = collection(this.fire_store, cart_url);
    return collectionData(collect, { idField: 'id' }) as Observable<
      Cart_Book_module[]
    >;
  }

  getoneFromCart(id: any, userid: string) {
    let cart_url = 'users/' + userid + '/cart';
    return from(getDoc(doc(this.fire_store, cart_url, id))).pipe(
      map((res) => res.data() as Cart_Book_module)
    );
  }
  addToCart(
    book: Book_module,
    bookid: string,
    num: number = 1,
    userid: string
  ) {
    let mybook = {
      book_id: bookid,
      numOfBookNeed: num,
      discount: book.discount || 0,
      title: book.title || null,
      authors: book.authors || null,
      publisher: book.publisher || null,
      publishedDate: book.publishedDate || null,
      description: book.description || null,
      categories: book.categories || null,
      averageRating: book.averageRating || null,
      contentVersion: book.contentVersion || null,
      imagesmallThumbnail: book.imagesmallThumbnail,
      imagethumbnail: book.imagethumbnail,
      language: book.language || null,
      country: book.country || null,
      price: book.price || null,
    };

    let cart_url = 'users/' + userid + '/cart';
    let collect = collection(this.fire_store, cart_url);

    return of(
      addDoc(collect, mybook).catch(() => {
        // console.log("error!")
      })
    );
  }

  deleteBookFromCart(id: string, userid: string) {
    let cart_url = 'users/' + userid + '/cart';
    const ref = doc(this.fire_store, cart_url, id);
    // console.log(ref);
    deleteDoc(ref);
  }
  updateBookInToCart(book: Cart_Book_module, id: string, userid: string) {
    let cart_url = 'users/' + userid + '/cart';
    const ref = doc(this.fire_store, cart_url, id);
    updateDoc(ref, { ...book });
  }
}
