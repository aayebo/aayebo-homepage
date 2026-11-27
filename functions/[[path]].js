export async function onRequest(context) {
  const {request,env}=context;
  const url=new URL(request.url);
  const slug=url.pathname.split('/')[1];
  if(!slug || !['GET','HEAD'].includes(request.method)) return context.next();
  const catalog=await env.ASSETS.fetch(new URL('/books.json',url));
  if(!catalog.ok) return new Response('Catalog unavailable',{status:503});
  const books=await catalog.json();
  const book=books.find(b=>b.slug===slug && b.status==='published' && b.origin);
  if(!book) return context.next();
  const prefix='/'+slug;
  if(url.pathname===prefix){url.pathname+='/';return Response.redirect(url,308);}
  const origin=new URL(book.origin);
  if(origin.protocol!=='https:' || !origin.hostname.endsWith('.pages.dev') || origin.origin===url.origin) return new Response('Invalid book origin',{status:502});
  const target=new URL(origin.origin);
  target.pathname=url.pathname.slice(prefix.length)||'/';
  target.search=url.search;
  let upstream;
  try {upstream=await fetch(target,{method:request.method,redirect:'manual'});} catch {return new Response('Book temporarily unavailable',{status:502});}
  const headers=new Headers(upstream.headers);
  const location=headers.get('location');
  if(location){const dest=new URL(location,target);if(dest.origin===origin.origin)headers.set('location',prefix+dest.pathname+dest.search+dest.hash);}
  return new Response(upstream.body,{status:upstream.status,headers});
}
