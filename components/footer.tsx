import Image from "next/image";
import Link from "next/link";

export default function Footer() {
     return (
          <footer className="bg-gray-900">
               <div className="mx-auto w-10/12 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div className="mb-4 md:mb-0">
                              <Link href='/' className="flex justify-center md:justify-start">
                                   <Image src="/logo.svg" alt="SkydivingTown logo" width={295} height={122} priority />
                              </Link>
                              <p className="text-gray-300 max-w-2xl mt-5 mb-10">
                                   Skydiving Town est un événement de parachutisme unique en Tunisie,
                                   prévu pour 2025. Plus de 4000 sauts seront réalisés entre 3500 et 4500 mètres d’altitude,
                                   avec une équipe professionnelle et expérimentée.
                                   En plus des sensations fortes en chute libre, l’événement sera animé au sol par une town vibrante,
                                   idéale pour passer une journée inoubliable avec vos amis et votre famille.
                                   Les dates exactes de l’événement et le lieu seront communiqués au plus tard en mars 2025.
                                   STAY TUNED pour toutes les informations à venir !
                              </p>
                         </div>
                         <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                              <div>
                                   <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                                        Réseaux sociaux
                                   </h2>
                                   <ul className="text-gray-300 font-light">
                                        <li className="flex items-center mb-4">
                                             <Image
                                                  className="mr-3"
                                                  src="/line-icon.svg"
                                                  alt="instagram"
                                                  width={31}
                                                  height={4}
                                                  style={{ width: "auto", height: "auto" }}
                                             />
                                             <a href="https://www.instagram.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                                                  Instagram
                                             </a>
                                        </li>
                                        <li className="flex items-center mb-4">
                                             <Image
                                                  className="mr-3"
                                                  src="/line-icon.svg"
                                                  alt="instagram"
                                                  width={31}
                                                  height={4}
                                                  style={{ width: "auto", height: "auto" }}
                                             />
                                             <a href="https://www.facebook.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                                                  Facebook
                                             </a>
                                        </li>
                                        <li className="flex items-center">
                                             <Image
                                                  className="mr-3"
                                                  src="/line-icon.svg"
                                                  alt="instagram"
                                                  width={31}
                                                  height={4}
                                                  style={{ width: "auto", height: "auto" }}
                                             />
                                             <a href="https://www.tiktok.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                                                  TikTok
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-md text-white text-center">
                         © 2025{" "}
                         <a href="https://www.skydivingtown.com/" className="hover:underline">
                              SkydivingTown™
                         </a>
                         . All Rights Reserved. Developped by{" "}
                         <a href="https://www.skydivingtown.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">
                              Be&Go™
                         </a>
                    </span>
               </div>
          </footer>

     );
}