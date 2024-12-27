import { serveFile } from 'jsr:@std/http/file-server'

const STATIC_EXTENSIONS = ['.ico', '.html', '.js']

Deno.serve(async (req) => {
    try {
        const path = new URL(req.url).pathname
        
        if (path.endsWith('.ts')) {
            const file = await Deno.readFile(`.${path}`)
            return new Response(file, {
                headers: {
                    'Content-Type': 'application/javascript'
                }
            })
        }

        if (STATIC_EXTENSIONS.some((ext) => path.endsWith(ext))) {
            return serveFile(req, `.${path}`)
        }

        return serveFile(req, './index.html')
    } catch {
        return new Response('404 Not Found', {
            status: 404,
        })
    }
})
