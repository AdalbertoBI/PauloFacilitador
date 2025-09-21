# Instrucoes para Hospedagem no GitHub Pages

Este documento contém as instruções para hospedar o site "PauloFacilitador" no GitHub Pages.

## 🚀 Passos para Configuração

### 1. Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com)
2. Clique em "New repository" (Novo repositório)
3. Nome do repositório: `PauloFacilitador` ou `paulofacilitador.github.io`
4. Marque como **Público**
5. NÃO inicialize com README (já temos um)
6. Clique em "Create repository"

### 2. Fazer Upload dos Arquivos

Você pode usar uma das opções abaixo:

#### Opção A: Interface Web do GitHub (Mais Fácil)
1. No repositório criado, clique em "uploading an existing file"
2. Arraste todos os arquivos da pasta para o GitHub:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - `package.json`
   - `.gitignore`
3. Adicione uma mensagem de commit: "Initial commit - Paulo Facilitador website"
4. Clique em "Commit changes"

#### Opção B: Linha de Comando (Git)
```bash
# No terminal, dentro da pasta do projeto
git init
git add .
git commit -m "Initial commit - Paulo Facilitador website"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/PauloFacilitador.git
git push -u origin main
```

### 3. Configurar GitHub Pages

1. No repositório, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Em "Branch", selecione **main** e pasta **/ (root)**
5. Clique em **Save**

### 4. Acessar o Site

Após alguns minutos, seu site estará disponível em:
- `https://SEU_USUARIO.github.io/PauloFacilitador`
- Ou `https://paulofacilitador.github.io` (se o repositório se chamar assim)

## 🔗 URLs Importantes

- **WhatsApp**: +55 12 99142-5017
- **Número já configurado no código**: https://wa.me/5512991425017

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Todos os arquivos enviados
- [ ] GitHub Pages ativado
- [ ] Site funcionando (testar formulário)
- [ ] Botão WhatsApp funcionando
- [ ] Site responsivo (testar no celular)

## 🛠️ Atualizações Futuras

Para atualizar o site:

1. Edite os arquivos localmente
2. Suba as mudanças para o GitHub
3. O GitHub Pages atualizará automaticamente em alguns minutos

## 📱 Testando o Site

Antes de divulgar, teste:

1. **Desktop**: Abra em diferentes navegadores
2. **Mobile**: Teste no celular (Chrome, Safari)
3. **Formulário**: Preencha e teste o envio para WhatsApp
4. **Botões**: Todos os botões WhatsApp devem funcionar
5. **SEO**: Verifique se o título aparece corretamente ao compartilhar

## 🎨 Personalização

Você pode personalizar:

- **Cores**: Edite as variáveis CSS em `style.css` (linha 10-20)
- **Textos**: Modifique o conteúdo em `index.html`
- **Foto**: Substitua o ícone por uma foto real (se desejar)
- **Depoimentos**: Atualize com depoimentos reais dos clientes

---

**Site desenvolvido especialmente para Paulo Facilitador** 🏠✨