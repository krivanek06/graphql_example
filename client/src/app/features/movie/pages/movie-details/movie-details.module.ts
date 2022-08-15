import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';

const routes: Routes = [];

@NgModule({
	declarations: [MovieDetailsComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MovieDetailsModule {}
