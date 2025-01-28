'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.logo', {
                scale: 0,
                duration: 1,
                opacity: 0,
                visibility: 'visible',
                ease: 'elastic.out(1, 0.5)'
            });

            gsap.from('.hero-title span', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out'
            });

            gsap.from('.hero-date', {
                x: -100,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out'
            });

            gsap.from('.hero-plane', {
                x: 200,
                rotation: -25,
                opacity: 0,
                duration: 2,
                ease: 'back.out(1.7)'
            });


            gsap.from('.cloud', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.cloud',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    markers: false,
                }
            });

            gsap.from('.skydivers', {
                scale: 0,
                y: -100,
                opacity: 0,
                duration: 1.5,
                ease: 'back.out(1, 0.5)',
                scrollTrigger: {
                    trigger: '.skydivers',
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    markers: false,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} className="relative">
            <section className="mb-20 bg-hero-bg-mobile md:bg-hero-bg-desktop bg-cover bg-no-repeat h-[878px] w-full relative overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/2 pt-10 md:pt-20 md:pl-20 z-10">
                        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                            <Image
                                src="/logo.svg"
                                alt="skydivingTown logo"
                                width={295}
                                height={122}
                                style={{ width: "auto", height: "auto" }}
                                priority
                                className="logo w-40 md:w-52"
                            />
                        </div>
                        <h1 className="hero-title mt-20 text-4xl text-white text-center font-[Monument] md:text-left md:ml-20 md:text-7xl leading-[3rem]">
                            <span>SKYDIVING</span><br />
                            <span>TOWN</span><br />
                            <span>En 2025</span>
                        </h1>
                        <h2 className="hero-date mt-5 md:mt-10 text-2xl md:text-3xl text-white text-center font-[Monument] md:text-left md:ml-20">
                            1st July
                        </h2>
                    </div>
                    <div className="w-full md:w-1/2 mt-5 md:mt-0">
                        <Image
                            src="/hero/plane.svg"
                            alt="plane"
                            width={226}
                            height={191}
                            style={{ width: "auto", height: "auto" }}
                            className="hero-plane absolute top-[67%] -left-[3%] md:top-[23%] md:left-[46%] transform -translate-y-1/2 z-0"
                        />
                        <Image
                            src="/hero/right-cloud-desktop.svg"
                            alt="cloud right"
                            width={2260}
                            height={1226}
                            className="cloud absolute right-0 top-[80%] md:top-[50%] md:-right-[44%] transform -translate-y-1/2 z-0 hidden md:block"
                        />
                        <Image
                            src="/hero/cloud-mobile.svg"
                            alt="cloud right"
                            width={2260}
                            height={1226}
                            priority
                            className="cloud absolute right-0 top-[85%] md:top-[50%] md:-right-[50%] transform -translate-y-1/2 z-0 block md:hidden"
                        />
                    </div>
                </div>
                <Image
                    src="/hero/left-cloud-desktop.svg"
                    alt="cloud left"
                    width={1080}
                    height={586}
                    className="cloud absolute left-0 top-[90%] md:-left-36 transform -translate-y-1/2 z-0 hidden md:block"
                />
            </section>
            <Image
                src="/hero/skydivers.svg"
                alt="skydivers"
                width={882}
                height={883}
                priority
                style={{ width: "auto", height: "auto" }}
                className="skydivers absolute md:-right-20 md:top-[50%] lg:right-20 lg:top-[60%] transform -translate-y-1/2 z-0 hidden md:block"
            />
            <Image
                src="/hero/skydivers-mobile.svg"
                alt="skydivers"
                width={430}
                height={431}
                priority
                style={{ width: "auto", height: "auto" }}
                className="skydivers absolute right-0 top-[85%] transform -translate-y-1/2 z-0 block md:hidden"
            />
        </div>
    );
}
