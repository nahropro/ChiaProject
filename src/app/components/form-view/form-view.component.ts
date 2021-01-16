import { Form } from './../../models/form.model';
import { FormServiceService } from './../../services/form-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {
  data: Form;
  id: string;

  constructor(private formService: FormServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.formService.get(this.id).pipe(take(1)).subscribe(f => this.data = f);
  }
}
