import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import React from 'react'
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="h-fit py-10 w-full rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
      <div className="h-full flex items-center justify-center px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
          <div className="rounded-full w-36 h-36 items-center justify-center bg-white/20 backdrop-blur-sm hidden md:flex">
            <div className="rounded-full w-28 h-28 flex items-center justify-center bg-white shadow-inner">
              <Sparkles className="h-16 text-blue-600 fill-blue-600" />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Visualize Your Ideas with The Canvas
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl">
              Turn inspiration into stunning designs in moments. Upload an image and watch as AI transforms your vision into reality.
            </p>
            <Link href="/editor">
              <Button
                variant="secondary"
                className="w-[180px] py-5 text-base font-semibold self-center md:self-start hover:scale-105 transition-transform cursor-pointer bg-white text-blue-600"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner