import app from "./app";

let port = process.env.PORT || '8080';
if (process.env.NODE_ENV === 'test') {
  port = '8081'; // Override port to 8081 during testing
}

try {
   app.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`)
   })
} catch (error) {
   if (error instanceof Error) {
      console.log(`Error occured: (${error.message})`)
   }
}