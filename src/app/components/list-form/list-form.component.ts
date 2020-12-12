import { Observable } from 'rxjs';
import { FormServiceService } from './../../services/form-service.service';
import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form.model';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  forms$: Observable<Form[]>;

  constructor(private formService: FormServiceService) { }

  ngOnInit(): void {
    this.forms$ = this.formService.getAll();
  }
}
