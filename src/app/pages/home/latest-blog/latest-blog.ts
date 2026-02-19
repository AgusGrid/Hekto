import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import latestBlogData from './latest-blog.json';
import { LatestBlog as LatestBlogModel } from '@models/latest-blog.model';
import { Card } from '@components/card/card';

@Component({
  selector: 'app-latest-blog',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './latest-blog.html',
  styleUrl: './latest-blog.scss',
})
export class LatestBlog {
  latestBlog = signal<LatestBlogModel[]>(latestBlogData);
}
