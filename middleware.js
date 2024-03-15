export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/update-prompt", "/create-prompt", "/profile/:path*"],
}