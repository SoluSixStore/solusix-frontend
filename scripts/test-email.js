#!/usr/bin/env node

/**
 * Script para testar configuração de e-mail
 * Uso: node scripts/test-email.js
 */

const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

async function testEmailConfig() {
  console.log('🔍 Testando configuração de e-mail...\n');

  // Verificar variáveis de ambiente
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log('📋 Variáveis de ambiente:');
  console.log(`  RESEND_API_KEY: ${resendApiKey ? '✅ Configurada' : '❌ Não configurada'}`);
  console.log(`  SMTP_HOST: ${smtpHost ? '✅ Configurado' : '❌ Não configurado'}`);
  console.log(`  SMTP_USER: ${smtpUser ? '✅ Configurado' : '❌ Não configurado'}`);
  console.log(`  SMTP_PASS: ${smtpPass ? '✅ Configurado' : '❌ Não configurado'}\n`);

  // Testar Resend
  if (resendApiKey) {
    console.log('🔄 Testando Resend...');
    try {
      const resend = new Resend(resendApiKey);
      
      const { data, error } = await resend.emails.send({
        from: 'SoluSix <contato@solusix.com.br>',
        to: ['contato@solusix.com.br'],
        subject: 'Teste de configuração - SoluSix',
        text: 'Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.',
        html: '<p>Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.</p>'
      });

      if (error) {
        console.log(`❌ Erro no Resend: ${error.message}`);
      } else {
        console.log(`✅ Resend funcionando! ID: ${data?.id}`);
      }
    } catch (error) {
      console.log(`❌ Erro no Resend: ${error.message}`);
    }
  } else {
    console.log('⚠️  Resend não configurado');
  }

  console.log('\n📝 Próximos passos:');
  console.log('1. Configure RESEND_API_KEY no arquivo .env.local');
  console.log('2. Configure as variáveis SMTP como backup');
  console.log('3. Execute este script novamente para testar');
  console.log('4. Em produção, configure as variáveis no Vercel');
}

testEmailConfig().catch(console.error); 