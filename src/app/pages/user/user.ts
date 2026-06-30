import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../common/mx-table/mx-table.component';
import {Subject} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../model/UserModel';

@Component({
  selector: 'app-user',
  imports: [
    MxTableComponent
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
  standalone: true
})
export class User implements OnInit, OnDestroy {

  private readonly  userService = inject(UserService);
  public readonly columns: (keyof Partial<UserModel>)[] = ['id', 'name'];
  public dataList = signal<UserModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.userService.getList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
