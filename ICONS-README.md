# Ícones do Site - Paulo Facilitador

Este diretório contém os ícones personalizados criados para o site do Paulo Facilitador - FlowCredi.

## Ícones Criados

### favicon.svg (32x32)
- Ícone principal do site
- Formato SVG para máxima qualidade
- Cores da FlowCredi (#003366, #0066cc)
- Simboliza casa + símbolo de dólar (crédito imobiliário)

### favicon-16.svg (16x16)
- Versão otimizada para tamanho pequeno
- Simplificada para melhor legibilidade em 16px

### apple-touch-icon.svg (180x180)
- Ícone para dispositivos iOS
- Cantos arredondados conforme padrão Apple
- Inclui elementos visuais adicionais (chaminé, detalhes)

## Conceito do Design

O ícone representa:
- 🏠 **Casa**: Símbolo universal de imóveis
- 💲 **Dólar**: Representa serviços financeiros/crédito
- 🎨 **Cores FlowCredi**: Gradiente azul (#003366 → #0066cc)
- ⚡ **Modernidade**: Design clean e profissional

## Implementação

Os ícones estão referenciados no HTML através de:
```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.svg">
<meta name="theme-color" content="#003366">
```

## PWA Support

O arquivo `manifest.json` inclui suporte para Progressive Web App com os ícones apropriados.