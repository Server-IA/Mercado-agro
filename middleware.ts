import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const BASE_PATH = '/mercado-agro';

// Rutas públicas dentro del basePath
const PUBLIC_ROUTES = ['/', '/ingresar', '/acceso-denegado'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar archivos estáticos y rutas de la API
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // ⚠️ Aquí NO redirigimos desde / a /mercado-agro
  // Solo aplicamos el middleware si la ruta ya está bajo /mercado-agro
  if (!pathname.startsWith(BASE_PATH)) {
    return NextResponse.next();
  }

  // Extraer la ruta relativa dentro de /mercado-agro
  const relativePath = pathname.substring(BASE_PATH.length) || '/';

  const isPublic = PUBLIC_ROUTES.includes(relativePath);

  if (isPublic) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = relativePath;
    return NextResponse.rewrite(rewriteUrl);
  }

  const session = await auth();

  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `${BASE_PATH}/ingresar`;
    return NextResponse.redirect(loginUrl);
  }

  const rewriteUrl = req.nextUrl.clone();
  rewriteUrl.pathname = relativePath;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  // Solo aplicar el middleware a rutas bajo /mercado-agro
  matcher: ['/mercado-agro/:path*'],
};
