# Eletromecânica JR — Site oficial

Site institucional da Eletromecânica JR, Campo Verde–MT.

- Domínio principal: https://eletromecanicajr.art.br/
- WhatsApp: (66) 99640-6718
- Publicação: GitHub Pages via GitHub Actions (workflow `.github/workflows/publicar-site.yml`).
- Página principal: `index.html` (imagens e estilos incorporados).

## Ativação

Em **Settings → Pages**, selecione **Source: GitHub Actions**.
Em **Custom domain**, informe `eletromecanicajr.art.br` e salve. Habilite HTTPS quando possível.

Na zona DNS do domínio, configure os quatro registros A para o apex:

| Tipo | Host | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Para `www`, adicione `CNAME www → eletromecanicajr.github.io` se quiser usar essa alternativa. Evite registros A/AAAA conflitantes.

**Segurança:** não publique credenciais, tokens, dados pessoais ou arquivos internos no repositório público.
