import React from "react";

const SkeletonForm = () => {
     return (
          <div role="status" className="animate-pulse mb-20">
               <div className="h-14 p-4" />
               <div className="h-96 p-4 bg-gray-300 rounded-2xl w-full mb-5 mx-auto" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="flex items-center">
                         <div className="flex items-center justify-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 me-3" />
                              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 me-4" />
                         </div>
                         <div className="flex items-center justify-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 me-3" />
                              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 me-4" />
                         </div>
                    </div>
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
                    <div className="h-14 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
               </div>
               <div className="h-80 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
               <div className="h-80 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
               <div className="h-80 p-4 bg-gray-300 rounded-2xl  w-full mb-5 mx-auto" />
               <div className="h-4 w-80 bg-gray-300 rounded-2xl mb-5" />
               <div className="h-4 w-96 bg-gray-300 rounded-2xl mb-5" />
               <div className="flex justify-end mr-20">
                    <div className="h-14 w-60 p-4 bg-gray-300 rounded-2xl mb-5" />
               </div>
               <span className="sr-only">Loading...</span>
          </div>

     );
};

export default SkeletonForm;
