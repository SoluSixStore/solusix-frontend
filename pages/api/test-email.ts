import type { NextApiRequest, NextApiResponse } from 'next';
import { testEmailConfig, validateEmailConfig } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apenas permitir em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing email configuration...');
    
    // Primeiro validar se as variáveis estão configuradas
    const configValidation = validateEmailConfig();
    
    if (!configValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Configuração incompleta',
        missing: configValidation.missing,
        message: 'Configure as variáveis de ambiente necessárias'
      });
    }

    // Testar envio de e-mail
    const result = await testEmailConfig();
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'E-mail de teste enviado com sucesso!',
        messageId: result.messageId
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error,
        details: result.details
      });
    }

  } catch (err) {
    console.error('❌ Test email error:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro ao testar configuração',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 