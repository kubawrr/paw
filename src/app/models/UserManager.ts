// userManager.ts
export class UserManager {
    private static user: { firstName: string; lastName: string } | null = null;
  
    // Mock logowania - użytkownik jest już "zalogowany"
    public static login(firstName: string, lastName: string) {
      UserManager.user = { firstName, lastName };
    }
  
    // Sprawdzenie, czy użytkownik jest zalogowany
    public static isLoggedIn(): boolean {
      return UserManager.user !== null;
    }
  
    // Pobranie imienia i nazwiska zalogowanego użytkownika
    public static getUserName(): string {
      if (UserManager.isLoggedIn()) {
        const { firstName, lastName } = UserManager.user!;
        return `${firstName} ${lastName}`;
      }
      return 'Brak użytkownika';
    }
  
    // Możliwość wylogowania użytkownika
    public static logout() {
      UserManager.user = null;
    }
  }
  