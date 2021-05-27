import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit {

  form: FormGroup;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        priority: new FormControl(),
        reporter: new FormControl(),
        status: new FormControl(),
    });
  }

  submit() {
    if ( !this.form.valid ){
      return;
    }
    this.api.newBug(this.form.value);
  }

}
