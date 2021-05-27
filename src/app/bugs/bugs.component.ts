import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css'],
  providers: [ApiService]
})
export class BugsComponent implements OnInit {
  bugs: any = [];
  column = null;
  order = 'asc';
  page = 0;
  arrows = {
    'asc': '<i class="fa fa-chevron-up"></i>',
    'desc': '<i class="fa fa-chevron-down"></i>'
  };


  constructor(private api: ApiService) { }

  ngOnInit(): void {
      this.api.getBugs().subscribe((data) => this.bugs = data);
  }

  next() {
    this.page++;
    this.api.getBugsPagination(this.page).subscribe((data) => this.bugs = data);
  }

  previous() {
    this.page--;
    this.api.getBugsPagination(this.page).subscribe((data) => this.bugs = data);
  }

  sort(column: string) {
    let o;
    if (this.column == null ){
      o = this.order;
    }else if ( this.column == column ){
      o = this.order == 'asc' ? 'desc' : 'asc';
    }else {
      o = 'asc';
    }

    this.column = column;
    this.order = o;

    this.api.getBugsSorted(this.column+','+this.order).subscribe((data) => this.bugs = data);
  }

  delete(id) {
    var confirm = window.confirm('Are you sure you want to delete?');
    if (confirm){
      this.api.deleteBug(id);
    }
  }


}
