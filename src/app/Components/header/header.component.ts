import { ApplicationModule, Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { UserinfoService } from '../../Services/user/userinfo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ApplicationModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  allbooks: any;
  filterdbooks1: any;
  searchTerm: any;
  user_id: any;
  checkLogin: boolean = false;
  userName: string = '';
  isNavbarCollapsed = true;
  constructor(
    private serve: AllBooksService,
    private router: Router,
    private fire_auth: AuthService,
    private user: UserinfoService,
    
  ) {}



  ngOnInit(): void {
    // this.fire_auth.logout();
    // this.fire_auth.login('sasa11@gmail.com', '123456');
    this.fire_auth.getUser().subscribe((user) => {
      // console.log("User ID:", user?.uid || 'notfound');
      this.checkLogin = false;
      if (user?.uid) {
        this.checkLogin = true;
        this.user.getuser(user?.uid).subscribe((res) => {
          // console.log(res.firstname);
          this.userName = res.firstname;
        });
        // console.log("form condition User ID:", user?.uid);
      }
    });

    this.serve.getAllFromAllBooks().subscribe((data) => {
      this.allbooks = data;
    });
  }
  

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  goToAddToCart() {
    this.router.navigate(['/add-to-cart']);
  }
  goToAddToFav() {
    this.router.navigate(['/add-to-fav']);
  }
  logout(){
    this.fire_auth.logout();

  }
  remove() {
    this.filterdbooks1 = [];
  }
  sendData1(event: any) {
    this.filterdbooks1 = [];

    this.searchTerm = event.target.value;
    for (let book of this.allbooks) {
      if (this.searchTerm.trim() == book.title) {
        this.filterdbooks1.push(book.title);
      }
      for (let i = 0; i <= book.title.length; i++) {
        if (
          this.searchTerm.trim() == book.title.slice(0, i + 1).toLowerCase() ||
          this.searchTerm.trim() == book.title.slice(0, i + 1).toUpperCase()
        ) {
          this.filterdbooks1.push(book);
        }
      }
    }
  }
}
