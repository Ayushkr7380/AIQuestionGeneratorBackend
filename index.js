import app from "./app.js";

const PORT = process.env.PORT || 5002;
const LOCALHOST = "127.0.0.1";

app.listen(PORT,LOCALHOST,()=>{
console.log(`Server is running at port ${PORT}`);
})
