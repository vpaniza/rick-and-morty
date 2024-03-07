# Frontend

This is the frontend to the backend.

## Development

1. On the **frontend** root folder run: 
```
npm install
```
to ensure you have all the required dependencies.
2. Having the backend running, you can start the **frontend** client by running:
```
npm start
```
3. Go to your browser and enter **localhost:3000**

If efverything goes fine, you should land on a login page. If you want to create your own user, click on **sign up**, and on the new form, enter a username and a password. Otherwise, these credentials should work:

  - username: haufe2024
  - password: haufe123
  
*Note:* these forms have been done quite simple to asses other things. There are no passwords checks (two-times password for preventing typos, nor any regex involved). The only requirement is that the username is longer than 8 characters. 

### Testing
Due to time reasons, only a few tests were built on the frontend side. On the other hand, there's a lot more coverage on the backend.
To run these tests run:
```
npm test
```