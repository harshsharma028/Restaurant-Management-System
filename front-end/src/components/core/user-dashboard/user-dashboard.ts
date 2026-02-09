import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuth } from '../../../app/services/user-auth';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  ngOnInit(): void {
    
  }
  private userAuth = inject(UserAuth);

  public authUserRole = this.userAuth.getUserRole();



}
