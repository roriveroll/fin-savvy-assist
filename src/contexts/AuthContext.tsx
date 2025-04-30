
import { createContext, useContext, useState, ReactNode } from "react";

// Define mock users
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  financialInfo: {
    creditScore: number;
    accountBalance: number;
    savingsBalance: number;
    loanBalance: number;
    creditCardBalance: number;
    paymentHistory: Array<{
      date: string;
      amount: number;
      concept: string;
      status: "paid" | "pending" | "late";
    }>;
    expenseCategories: {
      [key: string]: number;
    };
  };
}

// Create mock users with different financial profiles
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    password: "carlos123",
    financialInfo: {
      creditScore: 780,
      accountBalance: 7500,
      savingsBalance: 15000,
      loanBalance: 5000,
      creditCardBalance: 1200,
      paymentHistory: [
        { date: "2025-04-15", amount: 500, concept: "Préstamo personal", status: "paid" },
        { date: "2025-03-15", amount: 500, concept: "Préstamo personal", status: "paid" },
        { date: "2025-02-15", amount: 500, concept: "Préstamo personal", status: "paid" },
        { date: "2025-01-15", amount: 500, concept: "Préstamo personal", status: "paid" },
      ],
      expenseCategories: {
        "Alimentación": 450,
        "Transporte": 220,
        "Entretenimiento": 180,
        "Servicios": 350,
        "Otros": 150
      }
    }
  },
  {
    id: "2",
    name: "Ana Martínez",
    email: "ana@example.com",
    password: "ana123",
    financialInfo: {
      creditScore: 690,
      accountBalance: 3200,
      savingsBalance: 8000,
      loanBalance: 12000,
      creditCardBalance: 2800,
      paymentHistory: [
        { date: "2025-04-10", amount: 800, concept: "Pago hipoteca", status: "paid" },
        { date: "2025-03-10", amount: 800, concept: "Pago hipoteca", status: "paid" },
        { date: "2025-02-10", amount: 800, concept: "Pago hipoteca", status: "late" },
        { date: "2025-01-10", amount: 800, concept: "Pago hipoteca", status: "paid" },
      ],
      expenseCategories: {
        "Alimentación": 550,
        "Transporte": 180,
        "Entretenimiento": 250,
        "Servicios": 400,
        "Otros": 220
      }
    }
  },
  {
    id: "3",
    name: "Miguel López",
    email: "miguel@example.com",
    password: "miguel123",
    financialInfo: {
      creditScore: 820,
      accountBalance: 12000,
      savingsBalance: 45000,
      loanBalance: 0,
      creditCardBalance: 450,
      paymentHistory: [
        { date: "2025-04-20", amount: 450, concept: "Tarjeta de crédito", status: "paid" },
        { date: "2025-03-20", amount: 680, concept: "Tarjeta de crédito", status: "paid" },
        { date: "2025-02-20", amount: 520, concept: "Tarjeta de crédito", status: "paid" },
        { date: "2025-01-20", amount: 740, concept: "Tarjeta de crédito", status: "paid" },
      ],
      expenseCategories: {
        "Alimentación": 380,
        "Transporte": 150,
        "Entretenimiento": 400,
        "Servicios": 320,
        "Otros": 200
      }
    }
  }
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check if there's a logged in user in localStorage
  useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
