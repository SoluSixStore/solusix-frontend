import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Debug email configuration...');
    
    // Verificar se a API key está configurada
    const apiKey = process.env.RESEND_API_KEY;
    console.log('📋 API Key configured:', !!apiKey);
    console.log('📋 API Key starts with:', apiKey?.substring(0, 10) + '...');
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'RESEND_API_KEY não configurada',
        details: 'A variável de ambiente RESEND_API_KEY não foi encontrada'
      });
    }

    // Testar conexão com Resend
    const resend = new Resend(apiKey);
    
    console.log('🔍 Testing Resend connection...');
    
    // Tentar enviar um e-mail de teste
    const { data, error } = await resend.emails.send({
      from: 'SoluSix <contato@solusix.com.br>',
      to: ['contato@solusix.com.br'],
      subject: 'Teste de configuração - SoluSix',
      text: 'Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.',
      html: '<p>Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.</p>'
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(500).json({ 
        error: 'Erro no Resend',
        details: error.message
      });
    }

    console.log('✅ Email sent successfully:', { id: data?.id });
    
    return res.status(200).json({ 
      success: true,
      messageId: data?.id,
      message: 'E-mail de teste enviado com sucesso'
    });

  } catch (err) {
    console.error('❌ Debug error:', err);
    
    let errorMessage = 'Erro interno do servidor';
    let details = '';
    
    if (err instanceof Error) {
      details = err.message;
      
      if (err.message.includes('authentication')) {
        errorMessage = 'Erro de autenticação com Resend';
      } else if (err.message.includes('invalid')) {
        errorMessage = 'API Key inválida';
      } else if (err.message.includes('quota')) {
        errorMessage = 'Limite de e-mails excedido';
      } else if (err.message.includes('domain')) {
        errorMessage = 'Domínio não verificado';
      }
    }

    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? details : undefined
    });
  }
} 