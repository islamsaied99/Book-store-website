import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { user_module } from '../../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private fire_store:Firestore) { }

  getuser(id:string){
   return from(getDoc( doc(this.fire_store,'users',id))).pipe(
     map((res)=>res.data()as user_module)
   );
 }
}
