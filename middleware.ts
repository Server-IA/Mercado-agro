import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const BASE_PATH = '/mercado-agro';

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = ['/', '/ingresar', '/acceso-denegado'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar archivos estáticos y rutas de la API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // Asume que los archivos tienen extensiones
  ) {
    return NextResponse.next();
  }

  // Forzar el prefijo BASE_PATH si no está presente
  if (!pathname.startsWith(BASE_PATH)) {
    const url = req.nextUrl.clone();
    url.pathname = `${BASE_PATH}${pathname}`;
    return NextResponse.redirect(url);
  }

  // --- A partir de aquí, todas las rutas tienen el prefijo BASE_PATH ---

  // Obtener la ruta relativa sin el prefijo
  const relativePath = pathname.substring(BASE_PATH.length) || '/';

  // Comprobar si la ruta es pública
  const isPublic = PUBLIC_ROUTES.some((path) => relativePath === path);

  // Si la ruta es pública, reescribir la URL y permitir el acceso
  if (isPublic) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = relativePath;
    return NextResponse.rewrite(rewriteUrl);
  }

  // Si la ruta es protegida, verificar la sesión
  const session = await auth();

  if (!session) {
    // Si no hay sesión, redirigir a la página de inicio de sesión
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `${BASE_PATH}/ingresar`;
    return NextResponse.redirect(loginUrl);
  }

  // Si hay sesión, reescribir la URL y permitir el acceso
  const rewriteUrl = req.nextUrl.clone();
  rewriteUrl.pathname = relativePath;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  // Aplicar el middleware a todas las rutas excepto las de la API y archivos estáticos
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};