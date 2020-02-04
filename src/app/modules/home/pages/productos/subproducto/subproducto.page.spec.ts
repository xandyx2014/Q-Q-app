import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubproductoPage } from './subproducto.page';

describe('SubproductoPage', () => {
  let component: SubproductoPage;
  let fixture: ComponentFixture<SubproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
