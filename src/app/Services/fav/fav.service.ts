import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { Fav_Book_module } from '../../modules/favBook.module';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private fire_store:Firestore ) { }

   getAllFromFav(userid:string){
    let fav_url= "users/"+userid+"/favourites" 
    let collect=collection(this.fire_store,fav_url)
    return collectionData(collect,{idField:'id'}) as Observable<Fav_Book_module[]>
   }
  
   addToFav(book:Book_module,bookid:String,userid:string){
    let mybook={
      "book_id":bookid,
      "title":book.title||null ,
      "discount":book.discount||0,
      "authors": book.authors||null ,
      "publisher": book.publisher||null ,
      "publishedDate": book.publishedDate||null ,
      "description":book.description||null ,
      "categories": book.categories||null ,
      "averageRating": book.averageRating||null ,
      "contentVersion":book.contentVersion||null ,
        "imagesmallThumbnail":book.imagesmallThumbnail,
        "imagethumbnail": book.imagethumbnail ,
      "language": book.language||null ,
      "country": book.country||null ,
      "price": book.price||null 
    }
    let fav_url= "users/"+userid+"/favourites" 
    let collect=collection(this.fire_store,fav_url)
  return of( addDoc(collect,mybook));
   }
  
  deleteProductFromFav(id: string,userid:string){
    let fav_url= "users/"+userid+"/favourites" 
    const ref = doc(this.fire_store,fav_url,id);
    // console.log(ref)
    deleteDoc(ref)
  }
}
