import { Component, OnInit, ViewChild } from '@angular/core';
import { ThoughtsComponent } from './thoughts/thoughts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild(ThoughtsComponent)
  thoughtsComp!: ThoughtsComponent

  canShare = false

  ngOnInit(): void {
      this.canShare = !!navigator.share
  }

  share(text: string) {
    console.info('thoughts: ', text)
    const data: any = {
      title: 'Share a thought',
      text,
      // url: ''
    }
    navigator.share(data)
      .then(result => {
        alert('Successfully shared')
        this.thoughtsComp.remove()
      })
      .catch(err => alert('JSON: ' + JSON.stringify(err)))
  }

}
