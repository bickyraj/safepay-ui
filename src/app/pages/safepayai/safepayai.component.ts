import {AfterViewChecked, Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {AiService} from '../../services/ai/ai.service';
import {FormsModule} from '@angular/forms';
import {marked} from 'marked';

interface AiMessage {
  type: "question" | "answer";
  message: string;
}

@Component({
  selector: 'app-safepayai',
  imports: [
    FormsModule
  ],
  templateUrl: './safepayai.component.html',
  standalone: true,
  styleUrl: './safepayai.component.css'
})
export class SafepayaiComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public allMessages = signal<AiMessage[]>([]);
  public loading = signal<boolean>(false);
  public question: string | null = null;
  private shouldScroll = false;

  private readonly aiService = inject(AiService);

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom() {
    if (!this.scrollContainer) return;

    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  public sendMessage(): void {
    if (this.question == null) return;
    this.loading.set(true);
    const tempQuestion = this.question;
    this.question = "";
    this.shouldScroll = true;
    const questionMessage: AiMessage = { type: "question", message: tempQuestion };
    this.allMessages.update(messages => [...messages, questionMessage].slice(-10));
    this.aiService.ask(tempQuestion).subscribe({
      next: (answer: string) => {
        const aiMessage: AiMessage = { type: "answer", message: answer };
        this.allMessages.update(messages => [...messages, aiMessage].slice(-10));
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.shouldScroll = true;
        this.loading.set(false);
      }
    });
  }

  renderMarkdown(message: string): string {
    return marked.parse(message) as string;
  }
}

