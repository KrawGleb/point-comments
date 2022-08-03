import { BASE_URL } from "../constants/api.constants";

export class HttpService {
    public get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.onload = () => {
                resolve(JSON.parse(request.responseText) as T);
            }

            request.open("get", this.getApiUrl(url));
            request.send();
        })
    }

    private getApiUrl(url: string): string {
        return BASE_URL + url;
    }
}