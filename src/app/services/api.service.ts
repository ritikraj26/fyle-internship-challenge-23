import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  accessToken: string = environment.githubAccessToken;
  headers = new HttpHeaders({
    'Authorization': `token ${this.accessToken}`
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`, {headers: this.headers});
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 

  getTotalReposCount(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, {headers: this.headers});
  }

  getRepos(githubUsername: string, page: number, pageSize: number) {
    const params = {page: page.toString(), per_page: pageSize.toString()};
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`,{params: params, headers: this.headers});
  }

  getLanguages(githubUsername: string, repoName: string) {
    return this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repoName}/languages`, {headers: this.headers});
  }

}
