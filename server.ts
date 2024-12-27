import { serveFile } from 'jsr:@std/http/file-server'

Deno.serve((req) => {
    try {
        const path = new URL(req.url).pathname
        const staticExtensions = ['.ico', '.js']

        if (staticExtensions.some((ext) => path.endsWith(ext))) {
            return serveFile(req, `.${path}`)
        }

        return serveFile(req, './index.html')
    } catch {
        return new Response('404 Not Found', {
            status: 404,
        })
    }
})
