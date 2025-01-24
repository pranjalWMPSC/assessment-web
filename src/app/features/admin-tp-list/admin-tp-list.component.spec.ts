import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTpListComponent } from './admin-tp-list.component';

describe('AdminTpListComponent', () => {
  let component: AdminTpListComponent;
  let fixture: ComponentFixture<AdminTpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTpListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
