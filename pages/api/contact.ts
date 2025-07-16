import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { sendContactEmail } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('📧 Contact API called:', { method: req.method, body: req.body });

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  
  // Validação básica dos campos
  if (!name || !email || !message) {
    console.log('❌ Missing fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Invalid email format:', email);
    return res.status(400).json({ error: 'Formato de e-mail inválido' });
  }

  try {
    console.log('📤 Attempting to send email...');
    
    // Verificar se temos a API key do Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Configuração de e-mail não encontrada',
        details: 'RESEND_API_KEY não configurada no ambiente de produção'
      });
    }

    console.log('🔍 Using API key:', resendApiKey.substring(0, 10) + '...');
    
    // Tentar enviar via Resend
    try {
      console.log('🔄 Trying Resend...');
      const resend = new Resend(resendApiKey);
      
      const { data, error } = await resend.emails.send({
        from: 'SoluSix <contato@solusix.com.br>',
        to: ['contato@solusix.com.br'],
        subject: `Novo contato de ${name}`,
        replyTo: email,
        text: `
Nome: ${name}
E-mail: ${email}
Mensagem:
${message}

---
Enviado via formulário de contato do site SoluSix
        `.trim(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937; border-bottom: 2px solid #84cc16; padding-bottom: 10px;">
              Novo contato via formulário
            </h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>Mensagem:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #84cc16;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              <em>Enviado via formulário de contato do site SoluSix</em>
            </p>
          </div>
        `
      });

      if (error) {
        console.error('❌ Resend error:', error);
        throw new Error(`Resend error: ${error.message}`);
      }

      console.log('✅ Email sent successfully via Resend:', { id: data?.id });
      
      return res.status(200).json({ 
        ok: true, 
        messageId: data?.id,
        method: 'resend'
      });

    } catch (resendError) {
      console.error('❌ Resend failed:', resendError);
      
      // Se Resend falhar, tentar SMTP como fallback
      console.log('🔄 Trying SMTP fallback...');
      
      try {
        const smtpResult = await sendContactEmail({ name, email, message });
        
        if (smtpResult.success) {
          console.log('✅ Email sent successfully via SMTP:', { messageId: smtpResult.messageId });
          return res.status(200).json({ 
            ok: true, 
            messageId: smtpResult.messageId,
            method: 'smtp'
          });
        } else {
          throw new Error(smtpResult.error || 'SMTP fallback failed');
        }
        
      } catch (smtpError) {
        console.error('❌ SMTP fallback also failed:', smtpError);
        
        return res.status(500).json({ 
          error: 'Erro ao enviar e-mail',
          details: process.env.NODE_ENV === 'development' 
            ? `Resend: ${resendError instanceof Error ? resendError.message : 'Unknown error'}, SMTP: ${smtpError instanceof Error ? smtpError.message : 'Unknown error'}`
            : 'Tente novamente em alguns instantes.'
        });
      }
    }

  } catch (err) {
    console.error('❌ Email sending failed:', err);
    
    let errorMessage = 'Erro interno do servidor';
    
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err instanceof Error ? err.message : 'Unknown error' : undefined
    });
  }
} 