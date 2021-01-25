import { suggestionGroup } from './../meta-data/form.meta-data';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { StatisticsCount } from '../models/statistics-count.model';
import { StatisticsQuestionGroup } from '../models/statistics-question-group.model';
import { BorderStyle, Document, Numbering, OverlapType, Packer, Paragraph, RelativeHorizontalPosition, RelativeVerticalPosition, Table, TableAnchorType, TableCell, TableRow, TextRun, VerticalAlign } from "docx";
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private generalService: GeneralService) { }


  exportStatistics(statisticsQuestionGroupes: StatisticsQuestionGroup[], filename: string) {
    const doc = new Document({});

    const tables: Table[] = [];

    statisticsQuestionGroupes.forEach(qg => {
      const rows: TableRow[] = [];

      rows.push(new TableRow({
        children: [
          new TableCell({
            columnSpan: 5,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'وضعیت مطلوب (آنچه که الان باید باشد)',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            rowSpan: 2,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: statisticsQuestionGroupes[0].titlef,
                bold: true,
                rightToLeft: true,
              })]
            })]
          }),
          new TableCell({
            columnSpan: 5,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'وضعیت موجود (آنچه که الان هست)',
                bold: true,
                rightToLeft: true
              })]
            })]
          })
        ]
      }));

      //Set headers
      rows.push(new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'خیلی کم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'کم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'متوسط',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زیاد',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'خیلی زیاد',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'خیلی کم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'کم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'متوسط',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زیاد',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'خیلی زیاد',
                bold: true,
                rightToLeft: true
              })]
            })]
          })
        ]
      }))

      qg.statisticsQuestions.forEach(d => {
        let r = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.wantedAnswers, 'زۆر كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.wantedAnswers, 'كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.wantedAnswers, 'مامناوەند').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.wantedAnswers, 'زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.wantedAnswers, 'زۆر زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: d.titlef,
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.noramlAnswers, 'زۆر كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.noramlAnswers, 'كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.noramlAnswers, 'مامناوەند').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.noramlAnswers, 'زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.generalService.getQuestionAnswerCount(d.noramlAnswers, 'زۆر زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            })
          ]
        });

        rows.push(r);
      });

      tables.push(new Table({ rows: rows }));
    })

    const verticalSpace: Paragraph = new Paragraph({
      bidirectional: true,
      children: [
        new TextRun({
          text: '',
          rightToLeft: true
        })
      ]
    });

    const sgHeader: Paragraph = new Paragraph({
      bidirectional: true,
      children: [
        new TextRun({
          text: suggestionGroup.titlef,
          rightToLeft: true,
          bold: true
        })
      ]
    });

    const suggestions: Paragraph[] = [];

    suggestionGroup.suggestions.forEach(v => {
      suggestions.push(new Paragraph({
        bidirectional: true,
        children: [
          new TextRun({
            text: v.value,
            rightToLeft: true
          })
        ],
        bullet: {
          level: 0,
        }
      }));
    });


    doc.addSection({
      children: [...tables, verticalSpace, sgHeader, ...suggestions],
    });

    Packer.toBlob(doc).then((blob) => {
      fs.saveAs(blob, filename + '.docx');
    });
  }
}
