import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  createdDate : string;
  constructor(@Inject(LOCALE_ID) private locale: string) { 
    this.createdDate = formatDate(Date.now(), 'yyyy-MM-dd', this.locale)
  }

  ngOnInit(): void {
  }

}
