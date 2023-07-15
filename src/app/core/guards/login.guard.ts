import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const loginGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  if (!localStorage.getItem("logged")) return true;
  router.navigate(['/home']);
  return false;
};
