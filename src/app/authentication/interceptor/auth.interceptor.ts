  import { HttpInterceptorFn } from '@angular/common/http';

  export const authInterceptor: HttpInterceptorFn = (req, next) => {

   const token = localStorage.getItem('profileToken');
   const deviceId = localStorage.getItem('deviceId');

   if(token && deviceId){
    req = req.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`,
        'x-device-id': deviceId,
      }
    })
   }

    return next(req);
  };
