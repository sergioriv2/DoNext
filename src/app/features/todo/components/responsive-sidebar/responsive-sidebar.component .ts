import { Component } from '@angular/core';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import { ISidebarOptions } from '../../interfaces/sidebar-options.interface';
import { SidebarOptionsEnum } from '../../../../common/enums/sidebar-options.enum';

@Component({
    selector: 'responsive-sidebar',
    templateUrl: './responsive-sidebar.component.html',
    styleUrl: './responsive-sidebar.component.css',
})
export class ResponsiveSidebar {
    userName!: string;
    sidebarOptions: ISidebarOptions[][];

    constructor(private readonly router: Router) {
        // Init
        this.sidebarOptions = [];
        this.initSidebarOptions();

        this.userName = 'Placeholder';
    }

    initSidebarOptions(): void {
        this.sidebarOptions = [
            [
                {
                    name: SidebarOptionsEnum.All,
                    isActive: true,
                    linkTo: '/app/todo-lists',
                    faClass: 'fas fa-calendar',
                },
                // {
                //     name: SidebarOptionsEnum.Today,
                //     isActive: false,
                //     linkTo: '/app/todo-lists',
                //     faClass: 'far fa-calendar',
                // },
            ],
            [
                {
                    name: SidebarOptionsEnum.Completed,
                    isActive: false,
                    linkTo: '/app/todo-lists/completed',
                    faClass: 'fas fa-check-circle',
                },
                {
                    name: SidebarOptionsEnum.Trash,
                    isActive: false,
                    linkTo: '/app/todo-lists/trash',
                    faClass: 'fas fa-trash',
                },
            ],
        ];
    }

    signOut() {
        localStorage.removeItem(LocalStorageItemsEnum.ACCESS_TOKEN);
        localStorage.removeItem(LocalStorageItemsEnum.REFRESH_TOKEN);
        this.router.navigateByUrl(AppCompleteRoutesEnum.AuthRoot);
    }
}
