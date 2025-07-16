# Configuração do Resend para SoluSix

## ⚠️ IMPORTANTE: Chave API do Resend

**Chave que funciona localmente:**
```
re_Yp9p6UVV_91V4YNF5QoY75hHhx4rWUppU
```

## Configuração em Produção (Vercel)

1. Acesse o dashboard do Vercel: https://vercel.com/dashboard
2. Vá para o projeto `solusix-frontend`
3. Clique em "Settings" → "Environment Variables"
4. Adicione a variável:

```
Name: RESEND_API_KEY
Value: re_Yp9p6UVV_91V4YNF5QoY75hHhx4rWUppU
Environment: Production, Preview, Development
```

5. Clique em "Save"
6. Faça redeploy do projeto

## Verificação

Para verificar se a configuração está correta:

1. Acesse: https://www.solusix.com.br/api/debug-production
2. Use o método POST com qualquer body
3. Verifique se a resposta mostra:
   - `resend.configured: true`
   - `resend.apiKeyStart: "re_Yp9p6UVV..."`
   - `testResult.success: true`

## Troubleshooting

### Se a chave não funcionar:
1. Verifique se o domínio `contato@solusix.com.br` está verificado no painel do Resend
2. Confirme se a chave não expirou
3. Verifique os logs do Vercel para detalhes do erro

### Fallback SMTP:
Se o Resend falhar, configure também as variáveis SMTP no Vercel:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contato@solusix.com.br
SMTP_PASS=sua-senha-de-app-do-gmail
```

## Logs de Debug

O sistema agora inclui logs detalhados. Verifique os logs do Vercel para:
- Se a API key está sendo lida corretamente
- Se o Resend está funcionando
- Se o fallback SMTP está configurado 