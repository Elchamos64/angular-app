import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  serverID: number = 10;
  serverStatus: string = 'offline';
  serverName : string = 'TestServer';

  serverCreateStatus: string = 'No server was created!';

  onCreateServer() {
    this.serverCreateStatus = 'Server was created!' + this.serverName;
  }
}
