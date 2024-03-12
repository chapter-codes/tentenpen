const http= require('http')
const fs = require('fs');
const path = require('path');
const PORT= process.env.PORT || 3000
const server=http.createServer(serverFunction)


function serverFunction(req, res) {
    console.log(req.url)

  if(req.url==='/'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(`
        <div style="padding-top:50px; display:flex; justify-content:center;">
            <a style="
                background:blue;
                color:white;
                padding:1rem;
                text-decoration:none; 
                font-weight:bold;                       " 
                href="/download">
            Download TentenPen Poster 
            </a>
        </div>
    `)
  }  
  else if (req.url === '/download' && req.method==='GET' ) {
    const filePath = path.join(__dirname, '/public/tentenpen-refer.png')
    const fileStream = fs.createReadStream(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream', 
      'Content-Disposition': 'attachment; filename="tentenpen-refer.png"',
    });

    fileStream.pipe(res);
    fileStream.on('error', (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Error downloading file');
    });

    fileStream.on('end', () => {
        console.log('File downloaded successfully');
        // res.writeHead('file downloaded successfully');
        res.end()
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}

server.listen(PORT, ()=>console.log('server is running live on port ' + PORT))


