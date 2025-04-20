'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Reuse the Header component similar to the dashboard layout
function Header() {
  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 w-full z-50 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/_next/image?url=%2Flogo-retail-core2.png&amp;w=640&amp;q=75" 
            alt="Retail Core Logo" 
            width={180} 
            height={180} 
            className="object-contain"
            style={{color: 'transparent'}}
            srcSet="/_next/image?url=%2Flogo-retail-core2.png&amp;w=384&amp;q=75 1x, /_next/image?url=%2Flogo-retail-core2.png&amp;w=640&amp;q=75 2x"
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
  // Ref para o container onde o Spline Viewer será inserido
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito para inserir o Spline Viewer de forma dinâmica
  useEffect(() => {
    // Verificar se estamos no browser e se o container foi renderizado
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Variável para armazenar o intervalo - definida fora das funções para acesso no cleanup
    let cursorRemovalInterval: number | undefined;

    // Aplicar CSS global para ocultar cursores personalizados
    const styleEl = document.createElement('style');
    styleEl.id = 'spline-cursor-remover';
    styleEl.innerHTML = `
      /* Estilos globais para remover cursores */
      spline-viewer, 
      #spline-container, 
      #spline-container * {
        cursor: auto !important;
      }
      
      /* Ataque direto a elementos que possam ser cursor/hint */
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

    // Função para buscar e remover cursores
    const removeCursors = () => {
      try {
        // Seleção direta por atributos comuns de cursores
        const cursorSelectors = [
          '[class*="cursor"]',
          '[class*="Cursor"]',
          '[class*="hint"]',
          '[class*="Hint"]',
          '.spline-cursor',
          '.cursor-dot',
          '.cursor-ring'
        ];
        
        // Aplicar para elementos no documento principal
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

        // Tratar elementos dentro do shadow DOM do spline-viewer
        document.querySelectorAll('spline-viewer').forEach(viewer => {
          if (viewer.shadowRoot) {
            const shadowRoot = viewer.shadowRoot;
            
            // Injetar CSS diretamente no shadow DOM
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
            
            // Verificar se o estilo já existe
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

    // Função para carregar e inicializar o Spline Viewer
    const loadSplineViewer = () => {
      // Verificar se o script já foi carregado
      if (!window.customElements || window.customElements.get('spline-viewer')) {
        initializeViewer();
        return;
      }

      // Criar e carregar o script dinamicamente
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
      script.onload = initializeViewer;
      script.onerror = () => console.error('Falha ao carregar o Spline Viewer');
      document.head.appendChild(script);
    };

    // Função para inicializar o viewer após o script ser carregado
    const initializeViewer = () => {
      if (!containerRef.current) return;
      
      // Limpar o container
      containerRef.current.innerHTML = '';
      
      // Criar o elemento spline-viewer
      const viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', 'https://prod.spline.design/8kzmrn0gqpo2YRhH/scene.splinecode');
      
      // Configurações para desativar UI e interações visuais
      viewer.setAttribute('loading-anim', 'false');
      viewer.setAttribute('hint', 'false');
      viewer.setAttribute('loading', 'lazy');
      viewer.setAttribute('events-target', 'global');
      viewer.setAttribute('show-controls', 'false');
      viewer.setAttribute('hide-ui', 'true');
      viewer.setAttribute('mouse-controls', 'false');
      
      // Garantir que o viewer tenha as dimensões corretas
      viewer.style.width = '100%';
      viewer.style.height = '100%';
      viewer.style.position = 'absolute';
      viewer.style.top = '0';
      viewer.style.left = '0';
      viewer.style.pointerEvents = 'auto';
      
      // Adicionar ao container
      containerRef.current.appendChild(viewer);
      
      // Executar remoção de cursores imediatamente e em intervalos
      removeCursors();
      cursorRemovalInterval = window.setInterval(removeCursors, 300);
    };

    // Iniciar o processo de carregamento
    loadSplineViewer();

    // Cleanup
    return () => {
      // Limpar o intervalo
      if (cursorRemovalInterval) {
        window.clearInterval(cursorRemovalInterval);
      }
      
      // Remover o estilo global
      const styleElement = document.getElementById('spline-cursor-remover');
      if (styleElement) {
        styleElement.remove();
      }
      
      // Limpar o container
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
      
      {/* Header fora do container principal para posicionamento absoluto */}
      <Header />
      
      {/* Conteúdo principal com z-index maior */}
      <div className="relative z-10 flex flex-col min-h-screen pt-6">
        <div className="flex-1 flex flex-col items-center justify-start px-4 md:px-8 pt-12">
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
                className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-all"
              >
                Conheça nossos recursos
              </Link>
            </div>
            
            <div className="pt-10 text-white/60 text-sm">
              Potencializado por tecnologia avançada de IA • Resposta em tempo real • Insights precisos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
