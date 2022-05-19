import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  scrollTop!: number
  user!: User

  constructor(private authSerive: AuthService) { }

  ngOnInit(): void {
    window.onscroll = () => this.scrollTop = window.scrollY;

    this.user = this.authSerive.isAuthenticate();
  }

}
