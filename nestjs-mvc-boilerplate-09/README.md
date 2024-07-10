Just a simple learning project

Setup:

- [x] Set up MVC (using Pug)
- [x] Set up NestJS Config (.env)
- [x] Set up TypeORM
- [x] Set up validation pipeline & class-transformer & class-validator
- [x] Set up express-session
- [x] CSRF to forms https://expressjs.com/en/resources/middleware/csurf.html
- [x] Flash messages

To Do:

- [x] User can sign up with basic validation
- [x] Password should not be returned post creating user (use a DTO to dictate the return value)
- [x] Should display friendly message if duplicate email used when creating user or when validation fails for non-conforming data
- [x] User can login
- [x] User automatically logged in after creation
- [x] User can logout
- [x] Redirect if visiting authenticated routes
- [x] Render if failed to create user
- [x] Render if login failed
- [x] Use Interceptor to add flashMessages and csrfToken to every response
- [ ] Testing

Uncertainties:

- Haven't decided where is the best place to implement mappers a.k.a. `toUserDto`
- Any way to make `toUserDto` more generic and reusable

New Lessons for me:

1. Use guards to perform login
2. Use guards to perform authorization
3. Use exception filters to improve user experience by redirecting when fail to login or when visting unauthorized routes
4. Use exception filters to improve UX when user sign up fails by rendering the sign up form page with error messages
5. Use flash messages
6. Use CSRF
7. Use passport.js together with express-session for a "username" / password local strategy
8. Use global interceptors in app module to inject csrftoken and flash message to every route handler

#

https://github.com/joshteng/nestjs-mvc.git
