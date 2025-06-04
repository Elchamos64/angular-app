import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import {MessageService} from '../message.service';
@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;


  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor( private messageService: MessageService) { }

  currentSender: string = 'Oscar Ramos';

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    const newMessage = new Message(
      '1',
      this.currentSender,
      subject,
      msgText
    );

    this.messageService.addMessages(newMessage);
    console.log(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
