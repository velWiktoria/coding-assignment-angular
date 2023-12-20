import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private readonly PREFIX = 'angular-monorepo-';

  saveData(key: string, data: any) {
    try {
      localStorage.setItem(`${this.PREFIX}-${key}`, JSON.stringify(data));
    } catch (err) {
      console.error(`Failed to cache data for ${key}`);
    }
  }

  retrieveData(key: string): any {
    try {
      const item = localStorage.getItem(`${this.PREFIX}-${key}`);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error(`Failed to retrieve data for ${key}`);
      return null;
    }
  }
}
