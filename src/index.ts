import { Request, Response } from "express";
import fs from 'fs'
import express = require("express");
import environment from "./config/environment";
import { extractMetadata, ExifMetadata } from "./exiftool";
import multerUpload from "./multer";

const cors = require('cors')
const app = express();

app.use(cors())
const port = environment.port;

app.get("/", (req: Request, res: Response) => {
    res.send(`
    <form action="/metadata" method="post" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit" role="button">Send</button>
    </form>
    `);
});

app.post("/metadata", multerUpload.single('file'), (req: Request, res: Response) => {
   extractMetadata(req.file.path).then((metadata: ExifMetadata[]|null) => {
       if(null == metadata) {

       }
       res.json(metadata)
       // delete file
       fs.unlinkSync(req.file.path)
   })
}) 

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
});

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log('Module disposed. '));
}