import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value
    const publicPaths = request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup";
    console.log("middlewware execute");

if(request.nextUrl.pathname==="/api/login" || request.nextUrl.pathname==="/api/signup"){
    return;
}

    //login user access signup and signin page
    if (publicPaths ) {
        if(authToken)
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    //check if user are not loggedin and try to access protected routes
    else {
        if(!authToken){
            return NextResponse.redirect(new URL('/signin', request.url))
        }
    }
    
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/profile',
        '/settings',
        '/signin',
        '/signup',
        '/api/:path*'
    ]
}




// // Define which paths are public
// const PUBLIC_PATHS = ['/signin', '/signup', '/api/login']

// export function middleware(request) {
//   const { pathname } = request.nextUrl
//   const authToken = request.cookies.get('authToken')?.value

  
//   // ✅ 2. Allow all public routes
//   if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
//     if (authToken) {
//       // Logged in user should not see signin/signup again
//       return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//     return NextResponse.next()
//   }

//   // ✅ 3. Protect private routes
//   if (!authToken) {
//     return NextResponse.redirect(new URL('/signin', request.url))
//   }

//   // ✅ 4. Continue normally if authenticated
//   return NextResponse.next()
// }

// // ✅ Matcher to apply middleware only to relevant routes
// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// }


