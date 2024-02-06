import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {}

  title: string = 'fyle-frontend-challenge';
  username: string = '';
  user: any;
  repos: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalRepos: number = 1;

  ngOnInit() {
    if (this.username === '') {
      return;
    }

    this.loadUser();
    this.getTotalReposCount();
    this.loadRepos();
  }

  searchRepositories(userInput: string) {
    this.username = userInput;
    this.ngOnInit();
  }

  loadUser() {
    this.loading=true;
    this.apiService.getUser(this.username).subscribe(
      (user) => {
        this.user = user;
        // this.loading=false;
      },
      (error) => {
        console.log(error);
        // this.loading=false;
      }
    );
  }

  getTotalReposCount() {
    this.apiService.getTotalReposCount(this.username).subscribe(
      (repos) => {  
        this.totalRepos = (repos as any[]).length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadRepos() {
    this.loading=true;
    this.apiService.getRepos(this.username, this.currentPage, this.itemsPerPage).subscribe(
      (repos) => {
        this.repos = (repos as any[]).map((repo: any) => ({...repo, languages: []}));
        this.loadLanguages();
        // this.loading=false;
      },
      (error) => {
        console.log(error);
        // this.loading=false;
      }
    );
  }

  loadLanguages() {
    this.repos.forEach((repo) => {
      this.apiService.getLanguages(this.username, repo.name).subscribe(
        (languages) => {
          repo.languages = Object.keys(languages);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadRepos();
  }

  changeItemsPerPage(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadRepos();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRepos / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
