import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Book_module } from '../../modules/book.module';

@Injectable({
  providedIn: 'root'
})
export class AllBooksService {

  constructor(private fire_store:Firestore ) { }

  private collection=collection(this.fire_store,'allbooks')
   getAllFromAllBooks(){
    return collectionData(this.collection,{idField:'id'}) as Observable<Book_module[]>
   }

   getOneBook(id:string){
    return from(getDoc( doc(this.fire_store,'allbooks',id))).pipe(
      map((res)=>res.data()as Book_module)
    );
  }
  
  updateBook(book:Book_module,id: string){
    const ref = doc(this.fire_store,'allbooks',id);
   updateDoc(ref,{...book})
  }

}
