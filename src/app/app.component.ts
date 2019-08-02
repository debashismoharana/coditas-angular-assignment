import { Component } from '@angular/core';
import { GithubService } from './shared/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coditas-angular-assignment';
  searchString: string;
  profiles: any;
  currentPageNumber = 1;
  profilesToShow = [];
  pages = [];
  repoList = [];
  constructor(private githubService: GithubService) { }

  showResultOnKeyStroke() {
    this.githubService.searchString(this.searchString).subscribe((response) => {
      this.profiles = response;
      this.pages = [];
      for (let i = 1; i <= this.profiles['items'].length / 10; i++) {
        this.pages.push(i);
      }
      this.profilesToShow = this.profiles['items'].slice(0, 10);
    }, (error) => {
      console.error(error);
    });
  }

  sortResult(value: string) {
    switch (value) {
      case 'sortByName':
        this.showResultOnKeyStroke();
        this.profiles['items'].sort((a, b) => a.login - b.login);
        break;
      case 'sortByRank':
        this.profiles['items'].sort((a, b) => a.score - b.score);
        break;
    }
    this.goToPage(this.currentPageNumber);
  }
  goToPage(pageNumber) {
    this.profilesToShow = this.profiles['items'].slice(pageNumber * 10 - 9, pageNumber * 10);
  }
  showDetails(event) {
    const username = event.target.parentElement.childNodes[0].childNodes[1].data;
    this.githubService.showRepos(username).subscribe((response) => {
      this.repoList = [];
      // tslint:disable-next-line: forin
      for (const repo in response) {
        this.repoList.push(response[repo]);
      }
    }, (error) => {
      console.error(error);
    });
  }
}
