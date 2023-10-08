import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { Globals } from 'src/app/globals';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const globals = inject(Globals);
  if (localStorage.getItem(globals.IS_LOGGED_KEY)) return true;
  router.navigate(['/auth']);
  return false;
};
