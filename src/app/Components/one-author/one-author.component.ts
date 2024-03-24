import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-author',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './one-author.component.html',
  styleUrl: './one-author.component.css'
})
export class OneAuthorComponent {
  @Input() dataofbook:any;
  @Input() book_id:any;

  
}
