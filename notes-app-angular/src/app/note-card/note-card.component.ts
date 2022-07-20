import {Component, ElementRef, Renderer2, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewInit {


  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncatorElement!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;
  @ViewChild('noteP', { static: true }) noteP!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    if ( this.noteP.nativeElement.scrollHeight > this.bodyText.nativeElement.clientHeight) {
      this.renderer.setStyle(this.truncatorElement.nativeElement, 'display', 'block');
    }else {
      this.renderer.setStyle(this.truncatorElement.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }
}
