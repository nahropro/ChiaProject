import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { FormServiceService } from 'src/app/services/form-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  formSubscription: Subscription;
  forms: Form[];
  result:any;

  constructor(private formService: FormServiceService) { }

  ngOnInit(): void {
    this.formSubscription = this.formService.getAll().subscribe(f=> {
      this.forms=f;
      console.log(this.forms);
    });
  }

  generateStatistics(){

  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
