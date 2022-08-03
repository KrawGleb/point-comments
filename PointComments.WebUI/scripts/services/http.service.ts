import { BASE_URL } from "../constants/api.constants";

export class HttpService {
  public get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.onload = () => resolve(JSON.parse(request.responseText) as T);
      request.onerror = () => reject();

      request.open("get", this.getApiUrl(url));
      request.send();
    });
  }

  public post(url: string, data: any) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        console.log(data);
        request.onload = () => resolve(request.response);
        request.onerror = () => reject();

        request.open("post", this.getApiUrl(url));
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(data));
    })
  }

  private getApiUrl(url: string) {
    return BASE_URL + url;
  }
}
