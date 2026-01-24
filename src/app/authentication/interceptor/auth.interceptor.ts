import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('profileToken');
  const deviceId = localStorage.getItem('deviceId');

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

  return next(req);
};
