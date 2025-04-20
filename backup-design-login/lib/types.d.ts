// Definição de tipos para o Spline
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url?: string;
      'loading-anim'?: string;
      hint?: string;
      loading?: string;
      'events-target'?: string;
      'show-controls'?: string;
      'hide-ui'?: string;
      'mouse-controls'?: string;
    };
  }
}

// Interface adicional para estender a tipagem do Window
interface CustomWindow extends Window {
  // Qualquer propriedade adicional para o objeto Window
} 