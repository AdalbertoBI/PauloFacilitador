# 🌐 Configuração do Domínio Personalizado paulofacilitador.com.br

Este documento contém todas as instruções para configurar o domínio personalizado `paulofacilitador.com.br` para funcionar com o GitHub Pages.

## 📋 Resumo da Configuração

**Domínio:** paulofacilitador.com.br  
**Tipo:** Domínio Apex (raiz)  
**Registrador:** Registro.br  
**Destino:** GitHub Pages (AdalbertoBI/PauloFacilitador)

---

## 🔧 Parte 1: Configuração no GitHub (✅ JÁ FEITO)

### 1.1 Arquivo CNAME Criado
- ✅ Arquivo `CNAME` criado no repositório
- ✅ Conteúdo: `paulofacilitador.com.br`
- ✅ URLs no HTML atualizadas para o novo domínio

### 1.2 Próximo Passo no GitHub
Após configurar o DNS (Parte 2), você precisará:

1. Ir para: https://github.com/AdalbertoBI/PauloFacilitador/settings/pages
2. Na seção "Custom domain", inserir: `paulofacilitador.com.br`
3. Clicar em "Save"
4. Aguardar a verificação automática do GitHub
5. Habilitar "Enforce HTTPS" (aparece após 24h)

---

## 🌐 Parte 2: Configuração DNS no Registro.br

### 2.1 Acessar o Painel do Registro.br
1. Acesse: https://registro.br/
2. Faça login na sua conta
3. Vá em "Meus Domínios" → `paulofacilitador.com.br`
4. Clique em "Editar Zona DNS" ou "DNS"

### 2.2 Configurar Registros DNS

#### ⚠️ IMPORTANTE: Remover Registros Existentes
Primeiro, **REMOVA** todos os registros A e AAAA existentes para o domínio raiz (@).

#### ✅ Adicionar Novos Registros A (IPv4)
Adicione os seguintes 4 registros A:

| Tipo | Nome/Host | Valor/Destino | TTL |
|------|-----------|---------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

#### ✅ Adicionar Registros AAAA (IPv6) - OPCIONAL MAS RECOMENDADO
Adicione os seguintes 4 registros AAAA:

| Tipo | Nome/Host | Valor/Destino | TTL |
|------|-----------|---------------|-----|
| AAAA | @ | 2606:50c0:8000::153 | 3600 |
| AAAA | @ | 2606:50c0:8001::153 | 3600 |
| AAAA | @ | 2606:50c0:8002::153 | 3600 |
| AAAA | @ | 2606:50c0:8003::153 | 3600 |

#### ✅ Adicionar Registro CNAME para WWW (RECOMENDADO)
Para redirecionar www.paulofacilitador.com.br:

| Tipo | Nome/Host | Valor/Destino | TTL |
|------|-----------|---------------|-----|
| CNAME | www | adalbertobi.github.io | 3600 |

### 2.3 Exemplo de Configuração Final
Sua zona DNS deve ficar assim:
```
paulofacilitador.com.br.    IN  A     185.199.108.153
paulofacilitador.com.br.    IN  A     185.199.109.153  
paulofacilitador.com.br.    IN  A     185.199.110.153
paulofacilitador.com.br.    IN  A     185.199.111.153
paulofacilitador.com.br.    IN  AAAA  2606:50c0:8000::153
paulofacilitador.com.br.    IN  AAAA  2606:50c0:8001::153
paulofacilitador.com.br.    IN  AAAA  2606:50c0:8002::153
paulofacilitador.com.br.    IN  AAAA  2606:50c0:8003::153
www.paulofacilitador.com.br. IN  CNAME adalbertobi.github.io.
```

---

## ⏰ Parte 3: Aguardar Propagação DNS

### 3.1 Tempo de Propagação
- **Tempo normal:** 1-4 horas
- **Tempo máximo:** até 48 horas  
- **Registro.br:** Publicações DNS a cada 5 minutos
- **Propagação Registro.br:** geralmente 15-30 minutos

**Importante:** Segundo a documentação oficial do Registro.br, alterações passam por um período de transição de 24 horas.

### 3.2 Verificar Propagação
Use estas ferramentas online:
- **Registro.br (Oficial):** https://registro.br/tecnologia/ferramentas/verificacao-de-dns/
- https://dnschecker.org/
- https://whatsmydns.net/
- https://dns.google/ (consultar paulofacilitador.com.br)

### 3.3 Verificar via Terminal (Windows PowerShell)
```powershell
# Verificar registros A
Resolve-DnsName paulofacilitador.com.br -Type A

# Verificar registros AAAA  
Resolve-DnsName paulofacilitador.com.br -Type AAAA

# Verificar CNAME do www
Resolve-DnsName www.paulofacilitador.com.br -Type CNAME
```

**Resultado esperado dos registros A:**
```
Name                    Type TTL  Section IPAddress
----                    ---- ---  ------- ---------
paulofacilitador.com.br A    3600 Answer  185.199.108.153
paulofacilitador.com.br A    3600 Answer  185.199.109.153
paulofacilitador.com.br A    3600 Answer  185.199.110.153
paulofacilitador.com.br A    3600 Answer  185.199.111.153
```

---

## ✅ Parte 4: Verificação Final

### 4.1 Checklist de Configuração
- [ ] Registros A adicionados no Registro.br
- [ ] Registros AAAA adicionados (opcional)
- [ ] Registro CNAME para www adicionado  
- [ ] DNS propagado (verificado online)
- [ ] Domínio configurado no GitHub Pages
- [ ] Site acessível via https://paulofacilitador.com.br
- [ ] HTTPS habilitado no GitHub (após 24h)

### 4.2 URLs de Teste
Após a configuração completa, teste:
- ✅ https://paulofacilitador.com.br
- ✅ https://www.paulofacilitador.com.br (deve redirecionar)
- ✅ http://paulofacilitador.com.br (deve redirecionar para HTTPS)

---

## 🚨 Troubleshooting

### Problema: Site não carrega
**Possíveis causas:**
1. DNS ainda não propagou (aguarde mais tempo)
2. Registros DNS incorretos (verifique IPs)
3. Domínio não configurado no GitHub

### Problema: Certificado SSL não funcionando
**Solução:**
1. Aguarde até 24h após configuração
2. Vá em GitHub Settings → Pages
3. Desmarque e remarque "Enforce HTTPS"

### Problema: www não redireciona
**Solução:**
1. Verifique o registro CNAME para www
2. Deve apontar para: adalbertobi.github.io

---

## 📞 Suporte

Se precisar de ajuda:
1. **GitHub Support:** https://support.github.com/
2. **Registro.br:** https://registro.br/ajuda/
3. **Documentação GitHub:** https://docs.github.com/pt/pages

---

## 🎉 Resultado Final

Após a configuração completa, o site Paulo Facilitador estará disponível em:
- **URL Principal:** https://paulofacilitador.com.br
- **URL Alternativa:** https://www.paulofacilitador.com.br
- **Com HTTPS:** ✅ Certificado SSL automático
- **Performance:** ✅ CDN global do GitHub

**Data de Criação:** 21 de setembro de 2025  
**Status:** Configuração iniciada - Aguardando DNS