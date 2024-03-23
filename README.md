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

# Passport js implementation - Local strategy

1. Implement verify callback inside the middleware (File: passport.js)
2. Refer it in app.js
3. Initialize and add session function in app.js

# Cryptography

## 1. Public key cryptography

### Encrypt Data:

Encrypt the message with a public key, and send it. The person receiving it will decrypt using private key

### Verify Identities:

We flip whats used in encrypting data. Here ew encrpyt with pub key and decrypt with private key.

#### Trap door function

- Ex sha256 generator.
- For a given value (text, json or a book) it always returns the same value with the same amount of characters.
- This is a one way function (i.e) sha256 hash cannot be used to reconstruct the value that created it (ie) no "de hashing"

### Elliptic Curve cryptography

- This is used in public key cryptography and is a type of trap door function.
- It links the private and pub key
- This helps us derive the public key using the private key.
- But never the other way around.
- https://youtu.be/F-sFp_AvHc8?t=11058

### How this is used to verify identities?

- Person who is trying to access the resource has a private key
- Signs the message and encrypts with their private key
- The person/system receiving it will have a public key
- Using Elliptic curve crypto, we get a public key that corresponds to a private key ? Not sure
- The receiever can decrypt message with their pub key and verify the message.

<mark> Note: Never put confidential data in place that we are digitally signing </mark>

### Code Walkthough for document signing:

1. Convert data to send as hex
2. Hash the data with sha256 or other
3. Sign it (encrypt) with private key
4. Send the original data, algo used to hash and signed message to receiver
5. Receiver gets the data, decrpyts signed and previpously encrypted data using public key that receiver has.
6. Hashes the original data using the algo mentioned.
7. Compares the decrypted hash and hashed original, if its the same, the original data wasnt tampered with.
8. When decrypting we will know that the person who signed it, is the one they actually clamed to be.
