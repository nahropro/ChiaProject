import { FormServiceService } from './../../services/form-service.service';
import { Form } from 'src/app/models/form.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4, questionGroupTest } from './../../meta-data/form.meta-data';
import { Component, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  data: Form;
  id: string;
  formSent: boolean=false;
  formFilled: boolean=false;

  constructor(private formService: FormServiceService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.formService.get(this.id).pipe(take(1)).subscribe(d => {
      this.data = d;
      this.formFilled=d.filled;
    });
  }

  sendForm(valid: boolean) {
    const config = new MatSnackBarConfig();
    
    config.duration=1000;

    this.formService.send(this.id,this.data)
      .then(()=> this.formSent=true)
      .catch(err=> {
        config.panelClass = ['snack-bar-error'];
        this.snackBar.open('ناردنی فۆرمەكە سەركەوتوو نەبوو!', null,config);
      });
  }

  saveForm() {
    const config = new MatSnackBarConfig();
    
    config.duration=1000;

    this.formService.update(this.id,this.data)
      .then(()=>{
        config.panelClass = ['snack-bar-success'];
        this.snackBar.open('بەسەركەوتویی تۆمار بوو', null,config);
      })
      .catch(err=> {
        config.panelClass = ['snack-bar-error'];
        this.snackBar.open('تۆماركردن سەركەوتوو نەبوو!', null,config);
      });
  }
}
