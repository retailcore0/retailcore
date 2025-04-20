'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Header component
function Header() {
  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 w-full z-50 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/logo-retail-core2.png" 
            alt="Retail Core Logo" 
            width={180} 
            height={180} 
            className="object-contain"
            style={{color: 'transparent'}}
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/solucoes"
            className="text-base font-medium text-white hover:text-black transition-colors bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full hover:bg-white"
          >
            Soluções
          </Link>
          <Link
            href="/contato"
            className="text-base font-medium text-white hover:text-black transition-colors bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full hover:bg-white"
          >
            Contato
          </Link>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-white hover:text-black text-white px-5 py-1 text-base transition-colors">
            <Link href="/sign-in">Acesse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  // Ref para o container do Spline Viewer
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito para inserir o Spline Viewer dinamicamente
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let cursorRemovalInterval: number | undefined;

    // CSS para ocultar cursores
    const styleEl = document.createElement('style');
    styleEl.id = 'spline-cursor-remover';
    styleEl.innerHTML = `
      spline-viewer, 
      #spline-container, 
      #spline-container * {
        cursor: auto !important;
      }
      
      [class*="cursor"], 
      [class*="Cursor"], 
      [class*="hint"], 
      [class*="Hint"],
      [id*="cursor"], 
      [id*="hint"],
      .spline-cursor, 
      .cursor-dot, 
      .cursor-ring {
        opacity: 0 !important;
        visibility: hidden !important;
        display: none !important;
        pointer-events: none !important;
        transform: scale(0) !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Função para remover cursores
    const removeCursors = () => {
      try {
        const cursorSelectors = [
          '[class*="cursor"]',
          '[class*="Cursor"]',
          '[class*="hint"]',
          '[class*="Hint"]',
          '.spline-cursor',
          '.cursor-dot',
          '.cursor-ring'
        ];
        
        cursorSelectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.display = 'none';
              el.style.opacity = '0';
              el.style.visibility = 'hidden';
              el.style.transform = 'scale(0)';
              el.style.pointerEvents = 'none';
            }
          });
        });

        document.querySelectorAll('spline-viewer').forEach(viewer => {
          if (viewer.shadowRoot) {
            const shadowRoot = viewer.shadowRoot;
            
            const shadowStyle = document.createElement('style');
            shadowStyle.textContent = `
              * {cursor: auto !important;}
              [class*="cursor"], [class*="hint"], .spline-cursor {
                opacity: 0 !important;
                visibility: hidden !important;
                display: none !important;
                transform: scale(0) !important;
              }
            `;
            
            if (!shadowRoot.querySelector('#spline-shadow-style')) {
              shadowStyle.id = 'spline-shadow-style';
              shadowRoot.appendChild(shadowStyle);
            }
          }
        });
      } catch (error) {
        console.log('Erro ao remover cursores:', error);
      }
    };

    // Função para carregar o Spline Viewer
    const loadSplineViewer = () => {
      if (!window.customElements || window.customElements.get('spline-viewer')) {
        initializeViewer();
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
      script.onload = initializeViewer;
      script.onerror = () => console.error('Falha ao carregar o Spline Viewer');
      document.head.appendChild(script);
    };

    // Inicializar o viewer
    const initializeViewer = () => {
      if (!containerRef.current) return;
      
      containerRef.current.innerHTML = '';
      
      const viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', 'https://prod.spline.design/8kzmrn0gqpo2YRhH/scene.splinecode');
      
      viewer.setAttribute('loading-anim', 'false');
      viewer.setAttribute('hint', 'false');
      viewer.setAttribute('loading', 'lazy');
      viewer.setAttribute('events-target', 'global');
      viewer.setAttribute('show-controls', 'false');
      viewer.setAttribute('hide-ui', 'true');
      viewer.setAttribute('mouse-controls', 'false');
      
      viewer.style.width = '100%';
      viewer.style.height = '100%';
      viewer.style.position = 'absolute';
      viewer.style.top = '0';
      viewer.style.left = '0';
      viewer.style.pointerEvents = 'auto';
      
      containerRef.current.appendChild(viewer);
      
      removeCursors();
      cursorRemovalInterval = window.setInterval(removeCursors, 300);
    };

    loadSplineViewer();

    // Cleanup
    return () => {
      if (cursorRemovalInterval) {
        window.clearInterval(cursorRemovalInterval);
      }
      
      const styleElement = document.getElementById('spline-cursor-remover');
      if (styleElement) {
        styleElement.remove();
      }
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Container para o Spline Viewer */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-0 bg-black pt-0 mt-0"
        id="spline-container"
      ></div>
      
      {/* Header */}
      <Header />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col min-h-screen pt-24">
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-[#2058FF] to-blue-400 bg-clip-text text-transparent">Transforme</span> sua gestão de vendas B2B com inteligência artificial
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Potencialize seu negócio com nossa plataforma que integra automação e insights de IA para otimizar processos e aumentar resultados.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link 
                href="/sign-in" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium text-lg hover:from-blue-700 hover:to-blue-600 transition-all flex items-center group"
              >
                Comece agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/solucoes" 
                className="px-8 py-4 rounded-full bg-white/10 text-white font-medium text-lg hover:bg-white/20 transition-all"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 