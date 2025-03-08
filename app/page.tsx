'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import Hero from '../components/hero';
import Footer from '../components/footer';
import SubscriberForm from '../components/subscriberForm';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('h3', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: 'h3',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('p', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: 'p',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.relative, .container', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.relative, .container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.text-azure', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.text-azure',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to('.diver-image', {
        y: 20,
        x: 10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });

      gsap.to('.plane-form', {
        
        x: 10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />
      <main ref={mainRef} className="md:pt-10">
        <section className="mx-auto w-10/12">
          <h3 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] font-[Monument] text-center">
            Prêt à sauter d’un avion entre 3000 et 3500 mètres d’altitude en 2025 ?
          </h3>
          <p className="px-5 my-10 text-center text-[1.25] md:text-[1.875rem]">
            Sentez l’adrénaline et vivez l’expérience ultime !{' '}
            <span className="font-bold text-blue-700">Les 200 premiers inscrits</span> profiteront
            d’une <span className="font-bold text-blue-700">réduction de 35 %</span>. Ne manquez pas
            cette opportunité exceptionnelle
          </p>
          <h4 className="text-[2.125rem] font-extrabold text-center my-10 px-8">
            Inscrivez-vous dès maintenant et préparez-vous à voler
          </h4>
        </section>
        <section>
          <div className="relative mx-auto md:w-10/12 bg-celticBlue md:rounded-3xl mb-10">
            <div className="lg:px-20 pt-20 pb-40">
              <SubscriberForm />
            </div>

            <Image
              src="/plane-form.svg"
              alt="plane"
              width={800}
              height={800}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="plane-form absolute -left-[20%] -bottom-[20%] md:-bottom-[45%] lg:-bottom-[58%] lg:-left-[20%] transform -translate-y-1/2 -z-10"
            />
          </div>
          <div className="mt-72 lg:mt-80 mb-32 mx-auto md:w-9/12">
            <h3 className="px-2 text-[1.6rem] md:text-[2.4rem] font-[Monument] text-center md:text-left">
              DÉPASSEZ LES LIMITES PARCOURS EXTRÊMES ET SPORTS AÉRIENS POUR LES AUDACIEUX
            </h3>
          </div>
        </section>
        <section className="container mx-auto">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mb-40">
            <div className="relative bg-right-bg-mobile md:bg-right-bg bg-no-repeat min-h-[369px] md:min-h-[750px] ml-20 order-1 lg:order-2 mb-10 lg:mb-0">
              <Image
                src="/right-diver.webp"
                alt="right-bg"
                width={745}
                height={650}
                priority
                className="diver-image block md:hidden absolute -left-8 top-40 transform -translate-y-1/2"
              />
              <Image
                src="/right-diver.webp"
                alt="right-bg"
                width={745}
                height={650}
                priority
                className="diver-image hidden md:block absolute -left-20 top-80 transform -translate-y-1/2"
              />
            </div>
            <div className="px-10 order-2 lg:order-1">
              <hr className="border-gray-900" />
              <h2 className="text-[1rem] md:text-[1.6rem] font-[Monument] my-5 text-celticBlue">
                Qu’est-ce qu’un saut en tandem en parachutisme?
              </h2>
              <p className="text-[1rem] text-gray-700 mb-5">
                Un saut en tandem consiste à sauter attaché à un instructeur ayant une expérience
                d’au moins 700 sauts. Vous passerez environ une minute en chute libre avant que
                l’instructeur n’ouvre le parachute pour un atterrissage en toute sécurité.
              </p>
              <hr className="border-gray-900" />
              <h2 className="text-[1rem] md:text-[1.6rem] font-[Monument] my-5 text-celticBlue">
                Comment filmer mon expérience de skydiving?
              </h2>
              <p className="text-[1rem] text-gray-700 mb-5">
                Pour un saut en tandem, l’équipe d’organisation fournit un photographe et un
                vidéaste qui filmeront l’expérience au sol et en chute libre. Vous recevrez votre
                album photo et vidéo dans un délai maximum de 60 minutes.
              </p>
              <hr className="border-gray-900" />
              <h2 className="text-[1rem] md:text-[1.6rem] font-[Monument] my-5 text-celticBlue">
                Comment puis-je devenir sponsor de votre événement?
              </h2>
              <p className="text-[1rem] text-gray-700">
                SkydivingTown est ouvert à tous les sponsors intéressés. Cliquez ici pour
                télécharger le dossier de sponsoring.
              </p>
              <div className="mt-2 mb-5">
                <a href="" download className="text-azure hover:text-celticBlue underline">
                  Dossier Sponsoring.pdf
                </a>
              </div>
              <hr className="border-gray-900" />
              <h2 className="text-[1rem] md:text-[1.6rem] font-[Monument] my-5 text-celticBlue">
                Quel est le prix de l’expérience de saut en parachute?
              </h2>
              <p className="text-[1rem] text-gray-700 mb-5">
                Nous sommes en train de finaliser les prix, mais soyez assurés que nos tarifs
                seront très raisonnables et compétitifs par rapport aux autres dropzones à
                l’échelle mondiale. Qui sait, peut-être même plus abordables ! 😜
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
