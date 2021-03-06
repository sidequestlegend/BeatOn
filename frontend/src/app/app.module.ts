import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCheckboxModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { SetupComponent } from './setup/setup.component';
import { SetupStep1Component } from './setup-step1/setup-step1.component';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SetupStep2Component } from './setup-step2/setup-step2.component';
import { SetupStep3Component } from './setup-step3/setup-step3.component';
import { MainComponent } from './main/main.component';
import { MainPlaylistsComponent } from './main-playlists/main-playlists.component';
import { MainBrowserComponent } from './main-browser/main-browser.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SafePipe } from './pipes/safe-pipes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistSliderComponent } from './playlist-slider/playlist-slider.component';
import { NguCarouselModule } from '@ngu/carousel';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { ToolsComponent } from './tools/tools.component';
import { RemoteUploadComponent } from './remote-upload/remote-upload.component';
import { DownloadIndicatorComponent } from './download-indicator/download-indicator.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropDirective } from './drag-drop.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddEditPlaylistDialogComponent } from './add-edit-playlist-dialog/add-edit-playlist-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { OpIndicatorComponent } from './op-indicator/op-indicator.component';
import { CreditsComponent } from './credits/credits.component';
import { BrowserNavComponent } from './browser-nav/browser-nav.component';
import { FastClickDirective } from './directives/fast-click.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SongPackManagerComponent } from './song-pack-manager/song-pack-manager.component';
import { MainModsComponent } from './main-mods/main-mods.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { NoCustomSongsPipe } from './pipes/no-custom-songs';
import { OnlyCustomSongsPipe } from './pipes/only-custom-songs';
import { ImagePickerDialogComponent } from './image-picker-dialog/image-picker-dialog.component';
import { CdkVirtualScrollViewportPatchDirective } from './cdk-virtual-scroll-viewport-patch.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { SyncSaberComponent } from './sync-saber/sync-saber.component';
import { SyncSaberMaxSongsComponent } from './sync-saber-max-songs/sync-saber-max-songs.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
    declarations: [
        AppComponent,
        SetupComponent,
        SetupStep1Component,
        ProgressSpinnerDialogComponent,
        SetupStep2Component,
        SetupStep3Component,
        MainComponent,
        MainPlaylistsComponent,
        MainBrowserComponent,
        SafePipe,
        NoCustomSongsPipe,
        OnlyCustomSongsPipe,
        PlaylistSliderComponent,
        PlaylistSongsComponent,
        ToolsComponent,
        RemoteUploadComponent,
        DownloadIndicatorComponent,
        DragDropDirective,
        AddEditPlaylistDialogComponent,
        OpIndicatorComponent,
        CreditsComponent,
        BrowserNavComponent,
        FastClickDirective,
        ConfirmDialogComponent,
        SongPackManagerComponent,
        MainModsComponent,
        ImagePickerDialogComponent,
        CdkVirtualScrollViewportPatchDirective,
        SyncSaberComponent,
        SyncSaberMaxSongsComponent,
        InputBoxComponent,
    ],
    entryComponents: [
        ProgressSpinnerDialogComponent,
        AddEditPlaylistDialogComponent,
        ConfirmDialogComponent,
        ImagePickerDialogComponent,
        InputBoxComponent,
    ],
    imports: [
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        ScrollingModule,
        MatTabsModule,
        FlexLayoutModule,
        MatGridListModule,
        NguCarouselModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatChipsModule,
        ScrollDispatchModule,
        MatButtonToggleModule,
        DragDropModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatListModule,
        LazyLoadImageModule,
        MatListModule,
        FlexLayoutModule,
        NgxSmartModalModule,
        MatGridListModule,
        ColorPickerModule,
    ],
    providers: [NgxSmartModalService, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule {}
