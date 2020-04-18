import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 users: User[];
 pagination: Pagination;
 likesParam: string;
  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
      console.log('ListComponent -> ngOnInit -> this.pagination', this.pagination);
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    // tslint:disable-next-line:max-line-length
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe((res: PaginatedResult<User[]> ) => {
      this.users = res.result;
    }, error  => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void  {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
