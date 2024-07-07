import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
    },
    {
        path: '',
        redirectTo: '/user/add', pathMatch: 'full'
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);