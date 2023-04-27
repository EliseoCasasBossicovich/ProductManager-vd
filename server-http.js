import {createServer} from 'http'

const server = createServer((req, res)=>{
    res.end('My first server')
})

server.listen(8080, ()=>{
    console.log('Port server 8080')
})