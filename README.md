# Aaybo textbook library

Upload the contents of this directory to a GitHub repository. In Cloudflare Pages connect that repository, choose project name aaybo (if available), production branch main, framework None, no build command, output directory public, and repository root as root directory.

## Add or publish a book
Edit public/books.json. Copy an existing object, give it a unique lowercase hyphenated slug, title, subtitle, subject, description, status, origin, accent and keywords. Set origin to the actual HTTPS Pages deployment at its root. Set status to published only after testing that deployment. Optional cover is a path such as /covers/my-book.webp; add the image in public/covers. Subjects and cards update automatically. No routing edits needed. Commit and push.

All initial entries are deliberately marked development and origins are placeholders. Replace them with verified deployment URLs. Published books are accessible at /slug/. Keep slugs distinct from homepage filenames.

## Test
Serve public locally using python -m http.server 8000 --directory public for homepage preview only. For proxy testing use Cloudflare Pages preview deployment or Wrangler Pages dev public. Verify chapter navigation, CSS, images, search, downloads, interactive widgets, redirects and mobile layout. Quarto output should use relative internal URLs; root-relative URLs may need adjustments in the book itself. Set each book's site-url to the central public URL. This proxy does not rewrite HTML or JavaScript. Separate origins remain publicly accessible. Only proxy trusted textbook content: all books share the central origin and browser security context. Unknown paths invoke the function then fall back to Pages; proxied assets consume Functions requests. No live deployment has been tested.
