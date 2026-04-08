import { ReactNode } from "react";

interface BackgroundContainerProps {
  children: ReactNode; 
}

export default function BackgroundContainer({ children }: BackgroundContainerProps) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{

        backgroundImage: `url('/images/city-background.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-500/70 to-orange-500/80" />
      
      <div className="relative z-10 w-full px-4">
        {children}
      </div>
    </div>
  );
}
