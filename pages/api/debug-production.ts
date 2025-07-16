import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { validateEmailConfig } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Debug production email configuration...');
    
    const debugInfo = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      resend: {
        configured: false,
        apiKeyPresent: false,
        apiKeyLength: 0,
        apiKeyStart: '',
        error: null as string | null
      },
      smtp: {
        configured: false,
        validation: null as any
      },
      testResult: null as any
    };

    // Debug Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    debugInfo.resend.apiKeyPresent = !!resendApiKey;
    debugInfo.resend.apiKeyLength = resendApiKey?.length || 0;
    debugInfo.resend.apiKeyStart = resendApiKey?.substring(0, 10) + '...' || 'N/A';
    
    if (resendApiKey) {
      debugInfo.resend.configured = true;
      
      try {
        console.log('🔍 Testing Resend with production key...');
        const resend = new Resend(resendApiKey);
        
        // Test sending a simple email
        const { data, error } = await resend.emails.send({
          from: 'SoluSix <contato@solusix.com.br>',
          to: ['contato@solusix.com.br'],
          subject: 'Debug Test - SoluSix Production',
          text: 'Este é um teste de debug para verificar a configuração em produção.',
          html: '<p>Este é um teste de debug para verificar a configuração em produção.</p>'
        });

        if (error) {
          debugInfo.resend.error = error.message;
          console.error('❌ Resend production test failed:', error);
        } else {
          debugInfo.testResult = {
            success: true,
            method: 'resend',
            messageId: data?.id
          };
          console.log('✅ Resend production test successful:', { id: data?.id });
        }
      } catch (error) {
        debugInfo.resend.error = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Resend production test failed:', error);
      }
    }

    // Debug SMTP
    const smtpValidation = validateEmailConfig();
    debugInfo.smtp.validation = smtpValidation;
    debugInfo.smtp.configured = smtpValidation.valid;

    // Se Resend falhou, testar SMTP
    if (!debugInfo.testResult?.success && smtpValidation.valid) {
      try {
        console.log('🔄 Testing SMTP fallback in production...');
        const { sendContactEmail } = await import('@/lib/email');
        
        const smtpResult = await sendContactEmail({
          name: 'Debug Test',
          email: 'debug@test.com',
          message: 'Teste de debug em produção via SMTP'
        });

        if (smtpResult.success) {
          debugInfo.testResult = {
            success: true,
            method: 'smtp',
            messageId: smtpResult.messageId
          };
          console.log('✅ SMTP production test successful:', { messageId: smtpResult.messageId });
        } else {
          debugInfo.testResult = {
            success: false,
            method: 'smtp',
            error: smtpResult.error
          };
        }
      } catch (error) {
        debugInfo.testResult = {
          success: false,
          method: 'smtp',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    console.log('📋 Production debug results:', debugInfo);
    
    return res.status(200).json({
      success: true,
      debug: debugInfo
    });

  } catch (err) {
    console.error('❌ Production debug failed:', err);
    
    return res.status(500).json({
      success: false,
      error: 'Erro ao debugar configuração',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 