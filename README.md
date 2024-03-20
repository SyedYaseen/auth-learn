# Commands
docker run -d -p 27017:27017 --name auth-mongo mongo:latest



# auth-learn
1. Authentication - Who the user is?
2. Authorization - Who has access to what? Ex. Google sign in
3. Session is stored server side and cookie is stored on the browser.
4. Session lets us store additional user info since its unsafe to store it on cookie
5. We can access the session using a "secret". 
6. If secret is invalid, session is invalid too
7. Explanation: https://youtu.be/F-sFp_AvHc8?t=4731

# Process - sessions
1. When the page is first accessed(no cookie on browser, no session on server), when browser sends a get request...
2. The session middleware creates a session and sets the id of that session to the cookie
3. This cookie is then put in the set-cookie header of the response (viewable in browser but not in code, not sure why)
4. This sets the cookie on the browser
5. Everytime we make a request from the browser, this cookie will be a part of that request
6. Then this cookie can be used to validate stuff about the user on server


# Passport js implementation
1. Implement verify callback