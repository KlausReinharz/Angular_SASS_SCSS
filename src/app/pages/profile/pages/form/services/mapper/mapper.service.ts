import { Injectable } from '@angular/core';
import { ProfileForm } from '../../form.component';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecrutierForm } from '../../components/professional/roles/recrutier/recrutier.component';
import { User, UserCreateRequest, Employee, Recruiter } from '../../../../../../store/user';
import { Dictionaries } from '../../../../../../store/dictionaries';
import { ExperienceForm, Period } from '../../components/professional/roles/employee/experience/experience.component';


@Injectable()

export class MapperService {

  constructor() { }

  userToForm(user: User): ProfileForm{
    return{
      personal:{
        name:user ? user.name : null,
        photoUrl: user? user.photoURL: null,
        country: user? user.country : null
      },
      professional:{
        about: user? user.about : null,
        roleId: user ? user.roleId : null,
        role: user ? this.getFormRole(user): null

      }
    }
  }

  private getFormRole(user:User): EmployeeForm | RecrutierForm | null{
    if(user.roleId === 'employee'){
      const role = user.role as Employee;
      const formRole : EmployeeForm ={
        expecteadSalary : role.expectedSalary,
        specialization :role.specialization? role.specialization.id : null,
        qualificacion :role.qualification? role.qualification.id : null,
        skills: role.skills.map((x:any)=> x.id),
        experiences : role.experiences
      }

      return formRole;
    }

    if(user.roleId==='recruiter'){
      const role = user.role as Recruiter;
      const formRole : RecrutierForm ={
        companyName : role.companyName,
        employeesCount : role.employeesCount,
        experiences: []
      }
      return formRole
    }

    return null;
  }

  formToUserCreate(form:ProfileForm, dictionaries:Dictionaries): UserCreateRequest{
    return {
      name: form.personal?.name || null,
      photoURL: form.personal?.photoUrl || null,
      roleId: form.professional?.roleId,
      country: form.personal?.country || null,
      about: form.professional?.about,
      role: this.getRole(form, dictionaries)
    }
  }

  private getRole(form: ProfileForm, dicitionaries: Dictionaries): Employee | Recruiter | null{
    if(form && form.professional?.roleId ==='employee'){
      const formRole = form.professional.role as EmployeeForm;
      const role : Employee = {
        expectedSalary: formRole.expecteadSalary,
        specialization : dicitionaries.specializations.items.find(x => x.id === formRole.specialization)|| null,
        qualification : dicitionaries.specializations.items.find(x => x.id === formRole.qualificacion)||null,
        skills:formRole.skills.map(id=> dicitionaries.skills.items.find(x=>x.id === id)),
        experiences:formRole.experiences.map((exp: ExperienceForm) => ({
          companyName: exp.companyName,
          period: {  // Asegurarse de que 'period' tenga valores 'from' y 'to'
            from: exp.period?.from || 0, // Usar '?.' para evitar errores si 'period' es nulo
            to: exp.period?.to || 0
          }
        }))
      }
      return role;
    }

    if(form.professional?.roleId==='recruiter'){
      const formRole = form.professional.role as RecrutierForm;
      const role: Recruiter = {
        companyName : formRole.companyName,
        employeesCount : formRole.employeesCount
      }
      return role;

    }
    return null;
  }

  formToUserUpdate(form:ProfileForm, user:User, dictionaries:Dictionaries): User{
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal?.name||null,
      photoURL: form.personal?.photoUrl ||null,
      roleId: form.professional?.roleId,
      country: form.personal?.country ||null,
      about: form.professional?.about,
      role: this.getRole(form,dictionaries)
    }
  }


  processEmployeeForm(employeeForm: EmployeeForm): void {
    employeeForm.experiences.forEach((experience) => {
      const period: Period = experience.period;
      const from = period.from; // Valor 'from' del periodo de experiencia laboral
      const to = period.to; // Valor 'to' del periodo de experiencia laboral

      console.log('From:', from);
      console.log('To:', to);
    });
  }
}
