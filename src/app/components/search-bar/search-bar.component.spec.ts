import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEvent with the entered value when onEnter is called', () => {
    const userInput = 'test';
    let emittedValue: string | undefined;

    component.searchEvent.subscribe(value => {
      emittedValue = value;
    });

    component.onEnter(userInput);

    expect(emittedValue).toEqual(userInput);
  });
});
