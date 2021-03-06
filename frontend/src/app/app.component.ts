import { Component, OnInit, ɵMethodFn } from '@angular/core';
import { BeatOnApiService } from './services/beat-on-api.service';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { trigger, animate, style, group, query, transition, state } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { HostMessageService, ConnectionStatus } from './services/host-message.service';
import { HostShowToast, ToastType } from './models/HostShowToast';
import { HostSetupEvent, SetupEventType } from './models/HostSetupEvent';
import { ConfigService } from './services/config.service';
import { BeatOnConfig } from './models/BeatOnConfig';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HostOpStatus, OpStatus } from './models/HostOpStatus';
import { ToolbarEventsService } from './services/toolbar-events.service';
import { AppIntegrationService } from './services/app-integration.service';
import { QuestomConfig } from './models/QuestomConfig';
import { HostDownloadStatus, HostDownloadStatusType } from './models/HostDownloadStatus';
import { StartupStatus } from './models/StartupStatus';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-root',
    animations: [
        trigger('fade', [
            transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))]),
            state('*', style({ opacity: 1 })),
        ]),
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        class: 'fullheight',
    },
})
export class AppComponent implements OnInit {
    constructor(
        private beatOnApi: BeatOnApiService,
        public router: Router,
        private msgSvc: HostMessageService,
        private toastr: ToastrService,
        private cfgSvc: ConfigService,
        private dialog: MatDialog,
        private toolbarEvents: ToolbarEventsService,
        private appIntegration: AppIntegrationService
    ) {
        this.appIntegrated = appIntegration.isAppLoaded();
        this.msgSvc.opStatusMessage.subscribe((ev: HostOpStatus) => {
            this.opInProgress = ev.Ops.findIndex(x => x.Status != OpStatus.Failed) > -1;
        });
        this.msgSvc.downloadStatusMessage.subscribe((ev: HostDownloadStatus) => {
            this.dlInProgress =
                ev.Downloads.findIndex(
                    x => x.Status != HostDownloadStatusType.Failed && x.Status != HostDownloadStatusType.Processed
                ) > -1;
        });
        this.router.events.subscribe(ev => {
            if (ev instanceof NavigationStart) {
                //TODO: prevent routing based on mod status?
            }
        });
        this.msgSvc.toastMessage.subscribe(ev => this.showToast(ev));
        this.cfgSvc.configUpdated.subscribe((cfg: BeatOnConfig) => {
            this.config = cfg;
        });
        this.msgSvc.connectionStatusChanged.subscribe(stat => {
            this.connectionStatus = stat;
        });

        this.router.events.subscribe((routeEvent: RouterEvent) => {
            if (routeEvent instanceof NavigationStart) {
                this.showBackButton = routeEvent.url == '/main/browser';
                this.showRefreshButton = routeEvent.url == '/main/browser';
                this.showBrowser = routeEvent.url == '/main/browser';
                if (routeEvent.url == '/') {
                    this.modStatusLoaded = false;
                    this.checkModStatus();
                }
            }
        });
        this.msgSvc.setupMessage.subscribe((msg: HostSetupEvent) => {
            switch (msg.SetupEvent) {
                case SetupEventType.Step1Complete:
                    this.router.navigateByUrl('/setupstep2');
                    break;
                case SetupEventType.Step2Complete:
                    this.router.navigateByUrl('/setupstep3');
                    break;
                case SetupEventType.Step3Complete:
                    this.router.navigateByUrl('/');
                    break;
            }
        });
    }
    appIntegrated: boolean = false;
    opInProgress: boolean = false;
    dlInProgress: boolean = false;
    modStatusLoaded: boolean = false;
    title: string = 'Beat On';
    showRefreshButton: boolean = false;
    showBackButton: boolean = false;
    showBrowser: boolean = false;
    resultJson = '';
    modStatus = { CurrentStatus: '' };
    config: BeatOnConfig = { IsCommitted: true, Config: null, SyncConfig: null, BeatSaberVersion: '' };
    ngOnInit() {
        this.checkModStatus();
    }
    showWait() {
        return !this.modStatusLoaded || this.router.url == '/' || this.config.Config == null;
    }
    commitConfig() {
        const dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, {
            width: '450px',
            height: '350px',
            disableClose: true,
            data: { mainText: 'Updating config...  Do not exit Beat On yet!' },
        });
        this.beatOnApi.commitConfig().subscribe(
            (data: any) => {
                dialogRef.close();
            },
            err => {
                dialogRef.close();
            }
        );
    }
    clickStartBeatSaber() {
        this.beatOnApi.startBeatSaber().subscribe(() => {});
    }
    private showToast(toastMsg: HostShowToast) {
        if (this.appIntegration.isBrowserShown) {
            console.log('redirecting toast to host since browser is visible');
            this.appIntegration.showToast(toastMsg.Title, toastMsg.Message, toastMsg.ToastType, toastMsg.Timeout);
            return;
        } else {
            console.log('browser is not shown, doing toast on web');
        }
        switch (toastMsg.ToastType) {
            case ToastType.Error:
                this.toastr.error(toastMsg.Message, toastMsg.Title, { timeOut: toastMsg.Timeout });
                break;
            case ToastType.Info:
                this.toastr.info(toastMsg.Message, toastMsg.Title, { timeOut: toastMsg.Timeout });
                break;
            case ToastType.Success:
                this.toastr.success(toastMsg.Message, toastMsg.Title, { timeOut: toastMsg.Timeout });
                break;
            case ToastType.Warning:
                this.toastr.warning(toastMsg.Message, toastMsg.Title, { timeOut: toastMsg.Timeout });
                break;
        }
    }

    connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;

    getConnStatusColor() {
        if (this.connectionStatus == ConnectionStatus.Connected) return 'green';
        else if (this.connectionStatus == ConnectionStatus.Connecting) return 'orange';
        else return 'gray';
    }

    getConnStatusIcon() {
        return this.connectionStatus == ConnectionStatus.Connected || this.connectionStatus == ConnectionStatus.Connecting;
    }
    resetConfig() {
        const dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, {
            width: '450px',
            height: '350px',
            disableClose: true,
            data: { mainText: 'Resetting changes...' },
        });
        this.beatOnApi.revertConfig().subscribe(
            () => {
                dialogRef.close();
            },
            err => {
                dialogRef.close();
                console.log('Failed to revert config!');
            }
        );
    }

    reconnect() {
        this.msgSvc.reconnect();
    }
    shownRestoreDialog: boolean = false;
    checkModStatus(): void {
        this.beatOnApi.getModStatus().subscribe((data: any) => {
            this.modStatusLoaded = true;
            this.modStatus = data;
            if (this.modStatus.CurrentStatus == 'ModInstallNotStarted') {
                this.router.navigateByUrl('/setup');
            } else if (this.modStatus.CurrentStatus == 'ReadyForModApply') {
                this.router.navigateByUrl('/setupstep2');
            } else if (this.modStatus.CurrentStatus == 'ReadyForInstall') {
                this.router.navigateByUrl('/setupstep3');
            } else if (this.modStatus.CurrentStatus == 'ModInstalled') {
                this.cfgSvc.getConfig().subscribe(cfg => {
                    this.config = cfg;
                    if (
                        this.router.url == '/' ||
                        this.router.url.indexOf('setup') > -1 ||
                        this.router.url == '/main' ||
                        this.router.url == ''
                    ) {
                        if (this.appIntegration.isAppLoaded()) this.router.navigateByUrl('/main/browser');
                        else this.router.navigateByUrl('/main/upload');
                    }
                    this.beatOnApi.getStartupStatus().subscribe((msg: StartupStatus) => {
                        if (!this.shownRestoreDialog && msg && msg.UpgradeRestoreAvailable) {
                            this.shownRestoreDialog = true;
                            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                                width: '470px',
                                height: '200px',
                                disableClose: true,
                                data: {
                                    title: 'Restore After Upgrade?',
                                    subTitle:
                                        'It looks like you may have just upgraded Beat Saber.  Do you want to restore your playlists?',
                                    button1Text: 'Restore',
                                },
                            });
                            dialogRef.afterClosed().subscribe(res => {
                                if (res == 1) {
                                    this.beatOnApi.restoreCommittedConfig().subscribe(msg => {});
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    disableSync() {
        return this.opInProgress || this.dlInProgress;
    }

    public onClickModStatus() {}
    public onClickInstallModStep1() {
        this.beatOnApi.installModStep1().subscribe((data: any) => {
            this.modStatusLoaded = true;
            this.modStatus = data;
            this.resultJson = JSON.stringify(data);
        });
    }
    public onClickInstallModStep2() {
        this.beatOnApi.installModStep2().subscribe((data: any) => {
            this.modStatus = data;
            this.resultJson = JSON.stringify(data);
        });
    }

    clickBack() {
        this.toolbarEvents.triggerBackClicked();
    }

    clickRefresh() {
        this.toolbarEvents.triggerRefreshClicked();
    }

    linkSelected(ev) {
        this.toolbarEvents.triggerNavigate(ev);
    }
}
