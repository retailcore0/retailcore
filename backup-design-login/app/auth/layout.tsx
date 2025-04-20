'use client';

import React, { useEffect, useRef } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            
            // Buscar e remover elementos de cursor no shadow DOM
            cursorSelectors.forEach(selector => {
              shadowRoot.querySelectorAll(selector).forEach(el => {
                if (el instanceof HTMLElement) {
                  el.style.display = 'none';
                  el.style.opacity = '0';
                  el.style.visibility = 'hidden';
                  el.remove(); // Tentar remover completamente
                }
              });
            });
            
            // Buscar elementos com SVG que possam ser cursores
            shadowRoot.querySelectorAll('svg').forEach(el => {
              const className = el.getAttribute('class') || '';
              if (className.includes('cursor') || className.includes('hint')) {
                el.style.display = 'none';
                el.style.opacity = '0';
                el.style.visibility = 'hidden';
                el.remove(); // Tentar remover completamente
              }
            });
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
      viewer.setAttribute('url', 'https://prod.spline.design/wej9c1a4kWoa79Tq/scene.splinecode');
      
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
      
      // Adicionar evento de carregamento completo
      viewer.addEventListener('load', () => {
        console.log('Spline cena carregada completamente');
        
        // Remover cursores após o carregamento em tempos diferentes
        setTimeout(removeCursors, 100);
        setTimeout(removeCursors, 500);
        setTimeout(removeCursors, 1000);
        
        // Acessar e modificar o shadow DOM após o carregamento
        if (viewer.shadowRoot) {
          const shadowRoot = viewer.shadowRoot;
          
          // Observador de mutação para detectar novos elementos no shadow DOM
          const observer = new MutationObserver((mutations) => {
            removeCursors();
          });
          
          observer.observe(shadowRoot, {
            childList: true,
            subtree: true,
            attributes: true
          });
          
          // Atacar elementos específicos do shadowRoot que podem ser cursores
          try {
            // Buscar elementos SVG no shadow DOM que podem ser cursores
            shadowRoot.querySelectorAll('svg, canvas, div').forEach(el => {
              const className = (el.getAttribute('class') || '').toLowerCase();
              if (className.includes('cursor') || className.includes('hint')) {
                el.remove();
              }
            });
          } catch (e) {
            console.log('Erro ao manipular shadow DOM:', e);
          }
        }
      });
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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Container para o Spline Viewer */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-0"
        id="spline-container"
        style={{ pointerEvents: 'auto', cursor: 'auto' }}
      ></div>
      
      {/* Conteúdo da página */}
      <div className="min-h-screen relative z-10">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 