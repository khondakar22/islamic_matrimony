import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {
@Input() recipientId: number;
messages: Message[];
newMessage: any = {};
  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  this.loadMessage();
  }

  loadMessage() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    } );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
