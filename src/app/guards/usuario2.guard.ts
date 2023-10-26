

import { ActivatedRouteSnapshot, RouterStateSnapshot, CanMatchFn, Route, UrlSegment, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';

const canMatchUser: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const usuarioService = inject(UsuarioService);
  return usuarioService.validaToken();
};

export { canMatchUser };
