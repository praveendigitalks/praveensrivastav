import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('profileToken');
  const deviceId = localStorage.getItem('deviceId');
  const user =localStorage.getItem('profileUser');
  const parsedUser = user ? JSON.parse(user) : null;
  const isSuperAdmin = parsedUser?.isSuperAdmin === true;
  // List of URLs to skip the interceptor
  const skipUrls = [
    '/about'  // add relative path from your environment.baseurl
  ];

  // Check if the request URL includes any of the skip URLs
  const shouldSkip = skipUrls.some(url => req.url.includes(url));

  if (!shouldSkip && token && deviceId) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'x-device-id': deviceId,
      }
    });
  }

  //   // 🔐 SuperAdmin → token only (optional)
  if (isSuperAdmin && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req);
};
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('profileToken');
//   const deviceId = localStorage.getItem('deviceId');
//   const user = localStorage.getItem('profileUser');

//   const parsedUser = user ? JSON.parse(user) : null;
//   const isSuperAdmin = parsedUser?.isSuperAdmin === true;

//   const skipUrls = ['/about', '/login'];

//   const shouldSkip =
//     skipUrls.some(url => req.url.includes(url)) || isSuperAdmin;

//   if (!shouldSkip && token && deviceId) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//         'x-device-id': deviceId,
//       }
//     });
//   }

//   // 🔐 SuperAdmin → token only (optional)
//   if (isSuperAdmin && token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//   }

//   return next(req);
// };
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('profileToken');
//   const deviceId = localStorage.getItem('deviceId');
//   const user = localStorage.getItem('profileUser');

//   const parsedUser = user ? JSON.parse(user) : null;
//   const isSuperAdmin = parsedUser?.isSuperAdmin === true;

//   const skipUrls = ['/about', '/login'];

//   const shouldSkip = skipUrls.some(url => req.url.includes(url));

//   if (token && !shouldSkip) {
//     const headers: Record<string, string> = {
//       Authorization: `Bearer ${token}`
//     };

//     if (!isSuperAdmin && deviceId) {
//       headers['x-device-id'] = deviceId;
//     }

//     req = req.clone({ setHeaders: headers });
//   }

//   return next(req);
// };
