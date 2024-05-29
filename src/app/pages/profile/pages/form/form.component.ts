import { Component, OnInit,OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject, zip} from 'rxjs';

import * as fromUser from '../../../../store/user';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../../app/store';
import * as fromDictionaries from '../../../../../app/store/dictionaries';
import { PersonalForm } from './components/personal/personal.component';
import { ProfesionalForm } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromForm from '../../store/form'

import { MapperService } from './services';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface ProfileForm{
  personal: PersonalForm | null;
  professional: ProfesionalForm |null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit, OnDestroy{

  dictionaries$!: Observable<fromDictionaries.Dictionaries> | Observable<any>;
  dictionariesIsReady$!: Observable<boolean>;

  personal$ !: Observable<PersonalForm> | Observable<any>;
  professional$!: Observable<ProfesionalForm> | Observable<any>;

  loading$!: Observable<boolean>;

  private destroy = new Subject<any>();

  private profile$!: Observable<ProfileForm> | Observable<any>;

  private  isEditing!: boolean;

  private user!:fromUser.User;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stepper:StepperService,
    private store : Store<fromRoot.State>,
    private mapper: MapperService,
    private fs: AngularFirestore
  ){ }

  ngOnInit(): void {
    /*this.fs.collection('users').snapshotChanges().subscribe(users =>{
      console.log(users.map(x=>x.payload.doc.data()));
    })*/

    //this.user = this.route.snapshot.data['user'];
    this.route.data.subscribe(({user})=>{
      this.user = user;
    })
    console.log(this.user);

    this.isEditing =!!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm)) as Observable<PersonalForm>;
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm)) as Observable<ProfesionalForm>;

    this.loading$ = this.store.pipe(select(fromUser.getLoading))as Observable<boolean>;

    if(this.user){
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form))
    }


    this.dictionaries$= this.store.pipe(select(fromDictionaries.getDictionaries)) as Observable<any>;
    this.dictionariesIsReady$=this.store.pipe(select(fromDictionaries.getIsReady))as Observable<boolean>;

    this.stepper.init([
      {key: 'personal', label: 'Personal'},
      {key: 'professional', label: 'Profesional'}
    ])

    this.stepper.complete$.pipe(
      switchMap(()=>zip(this.profile$, this.dictionaries$)),
      takeUntil(this.destroy)
    ).subscribe(([profile, dictionaries])=>{
      console.log('stepper completado')
      this.onComplete(profile, this.user, dictionaries)

    });
    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      this.router.navigate(['/profile', this.user.uid]);
      //console.log('stepper cancelado')
    });

  }


  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
    //this.store.dispatch(new fromForm.Clear());

  }

  onChangedPersonal(data: PersonalForm):void{
    this.store.dispatch(new fromForm.Update({personal:data}))
    console.log('Personal data', data)
  }

  onChangedProfesional(data:ProfesionalForm){
    this.store.dispatch(new fromForm.Update({professional:data}))
    //console.log('data de profesional', data)
  }

  private onComplete(profile: ProfileForm, user: fromUser.User, dictionaries:fromDictionaries.Dictionaries): void{
    //create o update
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(new fromUser.Create(request));
    }

  }

  get title():string{
    return this.isEditing ? 'Editar Perfil de usuario' : 'Nuevo Perfil de Usuario';
  }

}
