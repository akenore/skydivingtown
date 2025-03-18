"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
     const router = useRouter();

     useEffect(() => {
          const timer = setTimeout(() => {
               router.push('/');
          }, 7000);

          return () => clearTimeout(timer);
     }, [router]);

     return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
               <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Inscription réussie! 🎉</h1>
                    <p className="text-gray-600 mb-4">
                         Nous apprécions votre intérêt et nous réjouissons de vous voir à l&apos;événement.<br/>
                         Restez à l&apos;écoute pour plus de mises à jour !
                    </p>
                    <p className="text-gray-500 text-sm">
                         Redirection vers la page d&apos;accueil dans 5 secondes...
                    </p>
               </div>
          </div>
     );
}