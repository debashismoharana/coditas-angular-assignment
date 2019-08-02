import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  searchString(searchString) {
    return this.http.get(`https://api.github.com/search/users?q=${searchString}`);
  }
  showRepos(username) {
    return this.http.get(`https://api.github.com/users/${username}/repos`);
  }
}
