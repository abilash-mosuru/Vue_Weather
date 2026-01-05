import { Observable } from "rxjs";

export function getCurrentLocation() {
  return new Observable((observer) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        observer.next(pos.coords);
        observer.complete();
      },
      (err) => observer.error(err)
    );
  });
}
