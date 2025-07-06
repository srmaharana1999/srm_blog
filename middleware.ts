import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    try {
      console.log(req.nextauth.token);
    } catch (error) {
      console.error("Error in middleware:", error);
    }
  },
  {
    callbacks: {
      authorized: ({ token,req }) => {
        const {pathname} = req.nextUrl;
        // console.log(req.nextUrl);

        if(pathname.startsWith("/api/auth") 
            || pathname.startsWith("/api/user") 
            || pathname.startsWith("/api/post") 
            || pathname == "/sign-up/verify-email" 
            || pathname == "/sign-up" 
            || pathname == "/api/imagekit-auth"
            || pathname == "/sign-in"
          ){
                return true;
            }

          if(pathname ==="/" || pathname==="/blogs"){
            return true;
          }

        return !!token;
      },
    },
  },
)

export const config = {
    matcher:[
        
       "/((?!_next/static|_next/image|favicon.ico|images|fonts|media|uploads|logo|.*\\.png$|.*\\.jpg$|.*\\.webp$).*)",
    ]
}
    