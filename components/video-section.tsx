"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)

  const handlePlayVideo = () => {
    if (!isPlaying) {
      // Start playing the video
      setIsPlaying(true)
      setShowThumbnail(false)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setShowThumbnail(true)
  }

  const partners =[{
    name:"L&T Heavy Engineering",
    logo:"/clients/8.png"
  },
{
  name:"Bayer",
  logo:"/logo_Bayer.png"
},
{
  name:"Birla Carbon",
  logo:"/logo_Birla_Carbon.jpg"
},
{
  name:"Tata",
  logo:"/clients/9.png"
},
{
  name:"Saint-Gobain",
  logo:"/clients/7.png"
},
{
  name:"UltraTech Cement",
  logo:"/clients/6.png"
},
{
  name:"Reliance",
  logo:"/logo_reliance.png"
},
{
  name:"Henkel",
  logo:"/clients/5.png"
},
{
  name:"Birla Opus",
  logo:"/clients/3.png"
},
{
  name:"Rallis",
  logo:"/clients/4.png"
},
{
  name:"BASF",
  logo:"/clients/1.png"
},
{
  name:"Tata Comm.",
  logo:"/clients/2.png"
},]

  return (
    <section className="bg-muted/30 dark:bg-muted/20 py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Experience Our Story in Motion</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 font-red-hat-display text-foreground">
            Experience Our Story in Motion
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take a closer look at who we are, what we stand for, and how we connect talent with opportunity. Our journey, culture, and impact — all captured in one video.
            </p>
            <a href="/Contact">
            <Button  className="bg-[#005ca1] hover:bg-[#08426d] text-white px-8 py-3 rounded-full">
              Schedule Consultation →
            </Button></a>
          </div>

          {/* Video Container */}
          <div className="relative max-w-3xl mx-auto mb-12">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              {/* Background Video */}
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/sUgLThLtFjw?autoplay=1&mute=1&controls=1&showinfo=0&rel=0"
                title="Ken McCoy Consulting Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

      


              {/* Thumbnail Overlay */}
              {showThumbnail && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/slides/3.png')" }}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              )}

              {/* Play Button with Glow Animation - Show when not playing */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayVideo}
                  className="group relative"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 scale-110"></div>
                  <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-30 scale-105"></div>

                  {/* Play Button */}
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </div>
                </button>
                </div>
              )}

              {/* Video Controls Overlay */}
              {/* {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <button
                      onClick={handlePlayVideo}
                      className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                    >
                      <Pause className="w-5 h-5" />
                      <span className="text-sm">Pause</span>
                    </button>
                    <div className="text-sm opacity-75">2:29</div>
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {/* Partner Logos */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading companies</p>
            <div className="overflow-hidden relative">
              {/* Gradient masks for smooth fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex items-center gap-8 animate-scroll">
                {/* First set of partners */}
                {partners.map((partner:any, index:number)=>(
                  <div key={`first-${index}`} className="flex-shrink-0 h-18 w-26 opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <img className="w-full h-full object-contain" src={partner.logo} alt={partner.name} />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner:any, index:number)=>(
                  <div key={`second-${index}`} className="flex-shrink-0 h-16 w-24 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <img className="w-full h-full object-contain" src={partner.logo} alt={partner.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        .animate-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1rem));
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
