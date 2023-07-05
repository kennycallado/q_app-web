import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (_route, state) => {
  const authSvc = inject(AuthService)
  const router  = inject(Router)

  if (authSvc.access_token() !== '') return true

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  return false
};
