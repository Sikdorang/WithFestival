import { create } from 'zustand';
import { authAPI } from '@/apis/auth';
import { handelError } from '@/apis/errorhandler';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/message';
import { toast } from 'react-hot-toast';
import { IUser } from '@/types/global';

interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  login: async (code: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authAPI.login(code);

      if (!response.success) {
        toast.error(ERROR_MESSAGES.invalidCodeError);
        set({ isLoading: false, error: ERROR_MESSAGES.invalidCodeError });
        return false;
      }

      toast.success(SUCCESS_MESSAGES.loginSuccess);
      set({
        user: response.user,
        isLoggedIn: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      handelError(error);
      set({
        isLoading: false,
        error: '로그인 중 오류가 발생했습니다.',
        isLoggedIn: false,
        user: null,
      });
      return false;
    }
  },

  logout: () => {
    // 로그아웃 API 호출 등...
    set({ user: null, isLoggedIn: false });
  },
}));
