import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify/alertify.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadUsers();
    this.route.data.subscribe(data => {
    this.users = data.users;
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[] ) => {
  //     this.users = users;
  //   }, error  => {
  //     this.alertify.error(error);
  //   });
  // }
}
