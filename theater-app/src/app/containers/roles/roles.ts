// src/app/containers/roles/roles.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleService } from '../../services/role';
import { AuthService } from '../../services/auth';

interface Role {
  id: string;
  label: string;
  description: string;
  applicants: string[];
}

@Component({
  selector: 'app-roles',
  standalone: true,
  templateUrl: './roles.html',
})
export class RolesComponent implements OnInit {

  roles: Role[] = [
    { id: 'Romeo', label: 'Romeo', description: 'Junger Montague, leidenschaftlich verliebt in Julia', applicants: [] },
    { id: 'LordMontague', label: 'Lord Montague', description: 'Oberhaupt der Familie Montague', applicants: [] },
    { id: 'Julia', label: 'Julia', description: 'Tochter der Capulets, heimlich verliebt in Romeo', applicants: [] },
    { id: 'LadyCapulet', label: 'Lady Capulet', description: 'Mutter Julias, ehrgeizig und kalt', applicants: [] },
    { id: 'Mercutio', label: 'Mercutio', description: 'Romeos bester Freund, witzig und impulsiv', applicants: [] },
    { id: 'Amme', label: 'Amme', description: 'Julias Vertraute und Ratgeberin', applicants: [] },
    { id: 'Petra', label: 'Petra', description: 'Dienerin im Hause Capulet', applicants: [] },
    { id: 'Johanna', label: 'Johanna', description: 'Dienerin im Hause Montague', applicants: [] },
    { id: 'Paris', label: 'Paris', description: 'Adeliger Verehrer Julias', applicants: [] },
    { id: 'Nonne', label: 'Nonne', description: 'Vertraute des Franziskaners, überbringt wichtige Botschaften', applicants: [] },
  ];

  isLoading = true;

  constructor(
    private roleService: RoleService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.loadApplicants();
  }

  async loadApplicants() {
    this.isLoading = true;
    for (const role of this.roles) {
      role.applicants = await this.roleService.getApplicants(role.id);
    }
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  hasApplied(role: Role): boolean {
    const email = this.authService.currentUser()?.email ?? '';
    return role.applicants.includes(email);
  }

  async onApply(role: Role) {
    const email = this.authService.currentUser()?.email ?? '';
    await this.roleService.apply(role.id, email);
    await this.loadApplicants();
  }

  async onWithdraw(role: Role) {
    const email = this.authService.currentUser()?.email ?? '';
    await this.roleService.withdraw(role.id, email);
    await this.loadApplicants();
  }
}