import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { DEFAULT_PICTURE_URL } from 'src/app/providers/constants';
import { Media } from 'src/app/providers/models/media';

@Component({
  standalone: true,
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass'],
  imports: [CommonModule, YouTubePlayerModule]
})
export class MediaComponent implements OnInit {

  @Input() media?: Media;

  timeStamp: number = Date.now();
  default_picture: string = DEFAULT_PICTURE_URL;

  getLinkPicture(): string {
    if (this.media && this.media.media_type === 'image') {
      return this.media.url;
    }

    return this.default_picture + '?' + this.timeStamp;
  }

  ngOnInit(): void {
    // Este código carga el reproductor de la API en un iframe de manera asíncrona, siguiendo las instrucciones:
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    if (!this.media) this.media = { id: 0, url: this.getLinkPicture(), media_type: 'image' }

    if (this.media.media_type === 'video') {
      const tag = document.createElement('script');
      // create a id to be able to paly one by one

      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    return ;
  }
}
