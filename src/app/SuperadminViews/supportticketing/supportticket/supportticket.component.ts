import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Priority = 'Critical' | 'High' | 'Medium';
type TicketStatus = 'In Progress' | 'Open' | 'Resolved';

interface TicketRow {
  id: string;
  tenant: string;
  subject: string;
  priority: Priority;
  status: TicketStatus;
  assignee: string;
  created: string;
}

interface Message {
  from: 'admin' | 'agent';
  name: string;
  time: string;
  text: string;
}

@Component({
  selector: 'app-supportticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent {
  tickets: TicketRow[] = [
    {
      id: 'TK-8829',
      tenant: 'Acme Corp',
      subject: 'Database Connection Issue',
      priority: 'Critical',
      status: 'In Progress',
      assignee: 'Alex Smith',
      created: 'Oct 25, 2023'
    },
    {
      id: 'TK-8838',
      tenant: 'Globex Ltd',
      subject: 'Billing discrepancy in Q3',
      priority: 'High',
      status: 'Open',
      assignee: 'Unassigned',
      created: 'Oct 26, 2023'
    },
    {
      id: 'TK-8712',
      tenant: 'Stark Ind.',
      subject: 'API Timeout errors',
      priority: 'Medium',
      status: 'Resolved',
      assignee: 'Sarah C.',
      created: 'Oct 20, 2023'
    }
  ];

  activeTicket: TicketRow | null = null;

  conversation: Message[] = [
    {
      from: 'admin',
      name: 'Acme Admin',
      time: '10:15 AM',
      text:
        'We\'ve been experiencing intermittent 504 errors when trying to connect to the production database since 9:00 AM PST. This is affecting all our active users.'
    },
    {
      from: 'agent',
      name: 'Alex Smith',
      time: '10:22 AM',
      text:
        'Hello! I\'m looking into this right now. It seems like a localized latency issue in the us-west-2 region. Are you seeing this across all instances or just the main cluster?'
    }
  ];

  quickReply = '';

  selectTicket(ticket: TicketRow) {
    this.activeTicket = ticket;
  }

  closeDetail() {
    this.activeTicket = null;
  }

  sendReply() {
    const text = this.quickReply.trim();
    if (!text || !this.activeTicket) {
      return;
    }

    this.conversation.push({
      from: 'agent',
      name: 'You',
      time: 'Now',
      text
    });

    this.quickReply = '';
  }
}
