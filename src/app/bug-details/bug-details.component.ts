import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../service/api.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit {
  bug: any;
  form = this.fm.group(
    {
      title: this.fm.control(''),
      description: this.fm.control(''),
      priority: this.fm.control(''),
      reporter: this.fm.control(''),
      status: this.fm.control(''),
    }
  );

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fm: FormBuilder) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');

    this.api.getBug(id)
      .subscribe(data => {
        this.bug = data;
        this.form.setValue({
          title: this.bug.title,
          description: this.bug.description,
          priority: this.bug.priority,
          reporter: this.bug.reporter,
          status: this.bug.status,
        });
      });
  }


}
