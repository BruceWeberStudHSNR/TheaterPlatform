import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RequestService } from 'src/app/core/request.service';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/app/core/firebase';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
  requests: any[] = [];
  loadingId: string | null = null;
  sentIds: Set<string> = new Set();

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.requests = await this.requestService.getRequests();
    this.cdr.detectChanges();
  }

  async approve(request: any) {
    this.loadingId = request.id;
    this.cdr.detectChanges();
    try {
      await this.requestService.markAsApproved(request.id);
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingId = null;
      this.requests = await this.requestService.getRequests();
      this.cdr.detectChanges();
    }
  }
}