import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { User } from './users.interface';
@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  // GET all users
  getAllUsers(): Observable<AxiosResponse<User[]>> {
    const r = this.httpService.get(`http://dummyjson.com/users`);

    r.pipe(
      map((resp) => {
        console.log(resp);
        return resp.data;
      }),
    );

    return r;

    // return this.httpService.get(`http://dummyjson.com/users`).pipe(
    //   map((resp) => {
    //     console.log(resp);
    //     return resp.data;
    //   }),
    // );
  }

  // GET one user by id
  getUser(id: string): Observable<AxiosResponse<User>> {
    return this.httpService
      .get(`http://dummyjson.com/users/${id}`)
      .pipe(map((resp) => resp.data));
  }

  // ADD a new user
  addUser(body: User): Observable<AxiosResponse<User>> {
    return this.httpService
      .post(`http://dummyjson.com/users/add`, { body })
      .pipe(map((resp) => resp.data));
  }

  // UPDATE a user
  updateUser(body: User, id: string): Observable<AxiosResponse<User>> {
    return this.httpService
      .put(`http://dummyjson.com/users/${id}`, {
        body,
      })
      .pipe(map((resp) => resp.data));
  }

  // DELETE a user by id
  deleteUser(id: string): Observable<AxiosResponse> {
    return this.httpService
      .delete(`http://dummyjson.com/users/${id}`)
      .pipe(map((resp) => resp.data));
  }
}
