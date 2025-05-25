import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactComponent } from './contacts/contact.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    ContactDetailComponent,
    HeaderComponent,
    ContactItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
