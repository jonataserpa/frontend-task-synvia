// eslint-disable-next-line
import { AxiosRequestConfig } from "axios";

/**
 * Intercept all request submissions to add bearer token
 * @param request
 * @returns
 */
export function authInterceptor(
  request: any
) {
  // const { authenticationResult } = store.getState().auth;
  // if (!authenticationResult) {
  //   return request;
  // }

  // request.headers.Authorization = `Bearer ${authenticationResult.idToken}`;
  request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiSm9uYXRhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1ODcyMzQ2LCJleHAiOjE3MDU5NTg3NDZ9.hPY-po9DkgvLYZWvPQU8m0rrd0tai0KTMdfNrn_zvJo`;
  return request;
}

export function loadingBefore(request: any) {
  // store.dispatch(allActions.loadingActions.setLoading(true));
  return request;
}

export function loadingAfter(response: any) {
  // store.dispatch(allActions.loadingActions.setLoading(false));
  return response;
}