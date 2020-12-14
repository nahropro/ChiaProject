import { FormServiceService } from './../../services/form-service.service';
import { Form } from 'src/app/models/form.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4, questionGroupTest } from './../../meta-data/form.meta-data';
import { Component, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrComponent } from '../toastr/toastr.component';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  data: Form;
  id: string;

  constructor(private formService: FormServiceService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');

    this.formService.get(this.id).pipe(take(1)).subscribe(d=> this.data=d);
  }

  sendForm(valid: boolean){
    console.log(valid,this.data);
  }

  saveForm(){
    // this.formService.update(this.id,this.data)
    //   .then(d=>{
    //     console.log('Success');
    //   })
    //   .catch(err=> {
    //     console.error('Fail');
    //   });

    this.snackBar.openFromComponent(ToastrComponent, {
      duration: 5 * 1000,
    });
  }
}
