'use client';

import React from 'react';
import { Covered_By_Your_Grace } from 'next/font/google';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {
  FaBars,
  FaCheckCircle,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { Container, Text, Title } from '@mantine/core';
import { RegisterButton, SignInButton } from '@/components/home';

const covered = Covered_By_Your_Grace({
  subsets: ['latin'],
  weight: '400',
});

export const HomePage: React.FC = () => {
  const [redirected, setRedirected] = React.useState(false);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    console.log('Status:', status);
    // Evita ciclos infinitos
    if (status === 'authenticated' && !redirected) {
      console.log('Redirigiendo a la página de inicio...');
      signOut({ callbackUrl: '/' });
      setRedirected(true); // Marca que ya se ejecutó la redirección
    }
  }, [status, redirected]);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6 max-w-7xl">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600 flex items-center space-x-2">
            <img src="/Header.png" alt="Mercado Agro" className="h-24 md:h-auto" />
          </Link>

          {/* Icono de hamburguesa para móvil */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars className="text-2xl text-green-600" />
          </div>

          {/* Menú de iconos (escritorio) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://facebook.com" className="text-black text-xl hover:text-green-600">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" className="text-black text-xl hover:text-green-600">
              <FaInstagram />
            </a>
            <a href="https://wa.me/3137257016" className="text-black text-xl hover:text-green-600">
              <FaWhatsapp />
            </a>
          </div>

          {/* Contacto (escritorio) */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Contáctanos</p>
                <a href="tel:3137257016" className="text-black font-bold hover:text-green-500">
                  313 725 70 16
                </a>
              </div>
            </div>

            <div className="h-12 border-l border-gray-300"></div>

            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-sm">Escríbenos</p>
                <a
                  href="mailto:comercial@mercadoagro.com"
                  className="text-black font-bold hover:text-green-500"
                >
                  comercial@mercadoagro.com
                </a>
              </div>
            </div>
          </div>

          {/* Botón de inicio de sesión (escritorio) */}
          <div className="hidden md:block">
            <SignInButton />
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4 bg-white shadow-md rounded-lg py-4">
            {/* Enlaces de redes sociales en el menú móvil */}
            <div className="flex space-x-6 mb-4">
              <a href="https://facebook.com" className="text-black text-xl hover:text-green-600">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" className="text-black text-xl hover:text-green-600">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/3137257016"
                className="text-black text-xl hover:text-green-600"
              >
                <FaWhatsapp />
              </a>
            </div>

            {/* Información de contacto en el menú móvil */}
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaPhoneAlt className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">
                  Contáctanos:
                  <a href="tel:3137257016" className="text-black font-bold hover:text-green-500">
                    313 725 70 16
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-green-500 text-xl" />
                <p className="text-gray-500 text-sm">
                  Escríbenos:
                  <a
                    href="mailto:comercial@mercadoagro.com"
                    className="text-black font-bold hover:text-green-500"
                  >
                    comercial@mercadoagro.com
                  </a>
                </p>
              </div>
            </div>

            {/* Botón de iniciar sesión (móvil) */}
            <div className="mt-4">
              <SignInButton />
            </div>
          </div>
        )}
      </header>

      <div className="relative bg-cover bg-center md:h-screen md:bg-[url('/fondo.png')] bg-white">
        <Container className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-24 lg:px-48">
          {/* Sección de ESCRITORIO */}
          <div className="hidden md:block" style={{ marginLeft: '-200px' }}>
            <Text component="h2" className="text-white text-sm mb-2 animate-fadeIn">
              FRESCURA GARANTIZADA
            </Text>
            <Title
              className={`text-white text-[140px] md:text-[140px] font-bold mb-4 leading-[1.0] animate-fadeIn ${covered.className}`}
            >
              Del campo <br /> a tu mesa
            </Title>
            <Text className="text-white text-lg md:text-xl mb-6 max-w-md animate-fadeIn">
              Disfruta de frutas y verduras frescas, cultivadas con amor por agricultores locales.
            </Text>
            <RegisterButton />

            {/* Imagen del agricultor solo para ESCRITORIO */}
            <div
              className="absolute bottom-0 right-0 mb-8 mr-8 hidden md:block"
              style={{ marginRight: '-20rem' }}
            >
              <img
                src="/farmer-illustration.png"
                alt="Agricultor"
                className="w-80 md:w-[50rem] h-auto animate-fadeIn"
                style={{ maxHeight: '40rem' }}
              />
            </div>
          </div>

          {/* Sección para MÓVIL */}
          <div className="block md:hidden w-full flex flex-col justify-center items-center bg-white py-4">
            {/* Imagen del agricultor para móviles (tamaño ajustado) */}
            <div className="mb-2">
              <img
                src="/mobile.png"
                alt="Agricultor móvil"
                className="w-64 h-auto animate-fadeIn"
              />
            </div>

            {/* Texto de móvil */}
            <Text component="h2" className="text-green-500 text-sm mb-2 animate-fadeIn text-center">
              DEL CAMPO A TU MESA
            </Text>
            <Title
              className={`text-yellow-500 text-[40px] font-bold mb-4 leading-tight text-center animate-fadeIn ${covered.className}`}
            >
              ¡Frutas y verduras frescas!
            </Title>
            <Text className="text-gray-600 text-md mb-4 max-w-xs text-center animate-fadeIn">
              Cultivadas con dedicación por agricultores locales y traídas directamente a tu hogar.
            </Text>

            {/* Botón */}
            <RegisterButton />
          </div>
        </Container>
      </div>

      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Columna para la imagen */}
          <div className="flex justify-center">
            {/* Imagen para móvil */}
            <img
              src="mobile2.png" // Esta es la imagen para móvil
              alt="Agricultura Móvil"
              className="rounded-full w-100 h-100 md:hidden object-cover animate-fadeIn" // Solo visible en móvil
            />
            {/* Imagen para escritorio */}
            <img
              src="elements.png" // Esta es la imagen para escritorio
              alt="Agricultura"
              className="rounded-full w-100 h-100 hidden md:block object-cover animate-fadeIn" // Solo visible en escritorio
            />
          </div>

          {/* Columna para el texto */}
          <div>
            <Text
              className={`uppercase font-semibold mb-2 text-yellow-500 text-3xl ${covered.className}`}
            >
              Conócenos
            </Text>
            <Text component="h2" className="text-4xl font-bold mb-4">
              conectamos a los <br /> agricultores colombianos
            </Text>
            <Text className="text-lg mb-6 text-gray-500">
              Nuestro propósito es ofrecer frutas y verduras cultivadas con dedicación, directamente
              del campo a tu hogar. Creemos en la importancia de apoyar a nuestros agricultores,
              promoviendo una alimentación saludable y sostenible.
            </Text>

            {/* Iconos de características */}
            <div className="flex justify-center md:justify-start space-x-8 mb-6">
              {/* Primer ítem: Productos Frescos */}
              <div className="flex items-center space-x-4">
                <img src="/icon1.png" alt="Productos Frescos" className="w-10 h-10" />
                <Text className="font-semibold">
                  Productos <br /> Frescos
                </Text>
              </div>

              {/* Segundo ítem: Alimentación Saludable y Sostenible */}
              <div className="flex items-center space-x-4">
                <img
                  src="/icon2.png"
                  alt="Alimentación Saludable y Sostenible"
                  className="w-10 h-10"
                />
                <Text className="font-semibold">
                  Alimentación <br /> Saludable y Sostenible
                </Text>
              </div>
            </div>

            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <FaCheckCircle size={48} className="text-green-500" />
              <Text className="text-md font-medium">
                Cada compra que haces no solo garantiza productos frescos, sino que también
                contribuye al bienestar de las comunidades rurales.
              </Text>
            </div>
            <RegisterButton />
          </div>
        </div>
      </Container>

      <div className="w-full bg-[#FAF8F5] py-16">
        <Container>
          <div className="w-full bg-[#FAF8F5] py-16">
            <Container>
              <div className="text-center mb-12">
                <Text
                  className={`uppercase font-semibold mb-2 text-yellow-500 text-2xl ${covered.className}`}
                >
                  ¿Tienes alguna pregunta?
                </Text>
                <Text component="h2" className="text-4xl font-bold text-gray-900">
                  ¡Estamos aquí para ayudarte!
                </Text>
              </div>
              <div className="flex flex-col md:flex-row justify-center md:space-x-4">
                {/* Información de contacto */}
                <div className="bg-yellow-500 text-white py-6 px-8 rounded-md mb-4 md:mb-0">
                  <div className="flex items-center space-x-4">
                    <img src="/phone-icon.png" alt="Teléfono" className="w-6 h-6" />
                    <div>
                      <Text className={`font-bold text-2xl ${covered.className}`}>Teléfono</Text>
                      <Text>313 725 70 16</Text>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-500 text-white py-6 px-8 rounded-md">
                  <div className="flex items-center space-x-4">
                    <img src="/email-icon.png" alt="Correo" className="w-6 h-6" />
                    <div>
                      <Text className={`font-bold text-2xl ${covered.className}`}>Correo</Text>
                      <Text>comercial@mercadoagro.com</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Container>
      </div>

      <footer className="bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className="text-2xl font-bold text-green-600 flex items-center space-x-2"
              >
                <img src="/Header.png" alt="Mercado Agro" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Menú</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://mercadoagro.com.co/" className="hover:underline">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="https://mercadoagro.com.co/ingresar" className="hover:underline">
                      Iniciar sesión
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Contáctanos</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="tel:3137257016" className="hover:underline ">
                      Teléfono: 313 725 7016
                    </a>
                  </li>
                  <li>
                    <a href="mailto:comercial@mercadoagro.com" className="hover:underline">
                      Correo electrónico: comercial@mercadoagro.com
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase ">Legal</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Políticas de privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terminos y condiciones
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{' '}
              <a href="" className="hover:underline">
                MercadoAgro
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-600 ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-600 ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-600 ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-600 ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
