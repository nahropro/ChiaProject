import { Injectable } from '@angular/core';
import { StatisticsCount } from '../models/statistics-count.model';
import { StatisticsQuestionGroup } from '../models/statistics-question-group.model';
import { BorderStyle, Document, OverlapType, Packer, Paragraph, RelativeHorizontalPosition, RelativeVerticalPosition, Table, TableAnchorType, TableCell, TableRow, TextRun, VerticalAlign } from "docx";
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor() { }


  exportStatistics(statisticsQuestionGroupes: StatisticsQuestionGroup[], filename: string) {
    const doc = new Document({});

    const tables: Table[]=[];

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
                text: 'دۆخی خوازراو (ئەوەی كە ئێستا دەبێت هەبێت)',
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
                text: statisticsQuestionGroupes[0].title,
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
                text: 'دۆخی ئارایی (ئەوەی كە ئێستا هەیە)',
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
                text: 'زۆر كەم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'كەم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'مامناوەند',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زۆر',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زۆر زۆر',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زۆر كەم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'كەم',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'مامناوەند',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زۆر',
                bold: true,
                rightToLeft: true
              })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              bidirectional: true,
              children: [new TextRun({
                text: 'زۆر زۆر',
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
                  text: this.getQuestionAnswerCount(d.wantedAnswers, 'زۆر كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.wantedAnswers, 'كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.wantedAnswers, 'مامناوەند').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.wantedAnswers, 'زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.wantedAnswers, 'زۆر زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: d.title,
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.noramlAnswers, 'زۆر كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.noramlAnswers, 'كەم').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.noramlAnswers, 'مامناوەند').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.noramlAnswers, 'زۆر').toString(),
                  rightToLeft: true
                })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                bidirectional: true,
                children: [new TextRun({
                  text: this.getQuestionAnswerCount(d.noramlAnswers, 'زۆر زۆر').toString(),
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

    // const table: Table = new Table({ rows: rows });

    doc.addSection({
      children: [...tables],
    });

    Packer.toBlob(doc).then((blob) => {
      fs.saveAs(blob, filename + '.docx');
    });
  }

  private getQuestionAnswerCount(data: StatisticsCount[], answer: string): number {
    return data?.find(d => d.title == answer)?.count || 0;
  }
}
