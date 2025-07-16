import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { validateEmailConfig } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Testing email configuration...');
    
    const results = {
      resend: {
        configured: false,
        valid: false,
        error: null as string | null
      },
      smtp: {
        configured: false,
        valid: false,
        error: null as string | null
      }
    };

    // Test Resend configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    results.resend.configured = !!resendApiKey;
    
    if (resendApiKey) {
      try {
        console.log('🔍 Testing Resend connection...');
        const resend = new Resend(resendApiKey);
        
        // Test sending a simple email
        const { data, error } = await resend.emails.send({
          from: 'SoluSix <contato@solusix.com.br>',
          to: ['contato@solusix.com.br'],
          subject: 'Teste de configuração - SoluSix',
          text: 'Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.',
          html: '<p>Este é um e-mail de teste para verificar se a configuração do Resend está funcionando.</p>'
        });

        if (error) {
          results.resend.error = error.message;
        } else {
          results.resend.valid = true;
          console.log('✅ Resend test successful:', { id: data?.id });
        }
      } catch (error) {
        results.resend.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Resend test failed:', error);
      }
    }

    // Test SMTP configuration
    const smtpValidation = validateEmailConfig();
    results.smtp.configured = smtpValidation.valid;
    results.smtp.valid = smtpValidation.valid;
    
    if (!smtpValidation.valid) {
      results.smtp.error = `Missing: ${smtpValidation.missing.join(', ')}`;
    }

    console.log('📋 Configuration test results:', results);
    
    return res.status(200).json({
      success: true,
      results,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('❌ Configuration test failed:', err);
    
    return res.status(500).json({
      success: false,
      error: 'Erro ao testar configuração',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 