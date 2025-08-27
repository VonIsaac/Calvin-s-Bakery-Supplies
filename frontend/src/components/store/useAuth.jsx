import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
export const useAuthStore = create(persist(
        (set) => ({
            // state 
            user: null,
            token:  Cookies.get("token") || localStorage.getItem("token"),
            isAuthenticated: false,  
             // actions
             setUser: ({user, token}) => set({
                 user, 
                 token, 
                 isAuthenticated: !!token
            }),

             logInAuth: ({user, token}) => set({
                token, user, isAuthenticated: true
             }), 
           
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
              user: state.user,
              token: state.token,
              isAuthenticated: state.isAuthenticated
            })
          }
        
    )
)