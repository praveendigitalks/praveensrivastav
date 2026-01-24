export class UserUtil {

  static getUser() {
    const userStr = localStorage.getItem('profileUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  static getUserId(): string | null {
    const user = this.getUser();
    return user?._id ?? null;
  }
}

