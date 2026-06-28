import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly httpClient = inject(HttpClient);
  private conversationId = crypto.randomUUID();

  public ask(question: string): Observable<string> {
    const url = new URL("http://localhost:8083/ask");
    return this.httpClient.post(url.toString(), {
      question: question,
      conversationId: this.conversationId,
    }, { responseType: 'text' });
  }
}
