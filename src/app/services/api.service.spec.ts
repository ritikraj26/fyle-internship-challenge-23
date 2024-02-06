import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user', () => {
    service.getUser('test').subscribe((user) => {
      expect(user).toBeTruthy();
    });
  });

  it('should return total repos count', () => {
    service.getTotalReposCount('test').subscribe((repos) => {
      expect(repos).toBeTruthy();
    });
  });

  it('should return repos', () => {
    service.getRepos('test', 1, 10).subscribe((repos) => {
      expect(repos).toBeTruthy();
    });
  });
});
