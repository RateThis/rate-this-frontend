import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  if (!!localStorage.getItem("logged")) return true;
  router.navigate(['/auth']);
  return false;
};
