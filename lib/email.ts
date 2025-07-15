import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure?: boolean;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: string;
}

/**
 * Configura o transporter SMTP com as variáveis de ambiente
 */
function createTransporter(): any {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    secure: Number(process.env.SMTP_PORT) === 465
  };

  return nodemailer.createTransporter({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Valida se as configurações SMTP estão presentes
 */
export function validateEmailConfig(): { valid: boolean; missing: string[] } {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Envia e-mail de contato
 */
export async function sendContactEmail(data: EmailData): Promise<EmailResult> {
  try {
    console.log('📧 Starting email send process...');
    
    // Validar configuração
    const configValidation = validateEmailConfig();
    if (!configValidation.valid) {
      console.error('❌ Email configuration missing:', configValidation.missing);
      return {
        success: false,
        error: 'Configuração de e-mail não encontrada',
        details: `Missing: ${configValidation.missing.join(', ')}`
      };
    }

    // Validar dados
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return {
        success: false,
        error: 'Dados incompletos'
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Formato de e-mail inválido'
      };
    }

    const transporter = createTransporter();
    
    // Verificar conexão
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Preparar e-mail
    const mailOptions = {
      from: `"SoluSix - Formulário de Contato" <${process.env.SMTP_USER}>`,
      to: 'contato@solusix.com.br',
      subject: `Novo contato de ${data.name}`,
      replyTo: data.email,
      text: `
Nome: ${data.name}
E-mail: ${data.email}
Mensagem:
${data.message}

---
Enviado via formulário de contato do site SoluSix
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #84cc16; padding-bottom: 10px;">
            Novo contato via formulário
          </h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>E-mail:</strong> ${data.email}</p>
            <p><strong>Mensagem:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #84cc16;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            <em>Enviado via formulário de contato do site SoluSix</em>
          </p>
        </div>
      `
    };

    // Enviar e-mail
    console.log('📤 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', { messageId: info.messageId });
    
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    let errorMessage = 'Erro interno do servidor';
    let details = '';
    
    if (error instanceof Error) {
      details = error.message;
      
      if (error.message.includes('authentication')) {
        errorMessage = 'Erro de autenticação do servidor de e-mail';
      } else if (error.message.includes('connection')) {
        errorMessage = 'Erro de conexão com o servidor de e-mail';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Timeout na conexão com o servidor de e-mail';
      } else if (error.message.includes('invalid')) {
        errorMessage = 'Configuração de e-mail inválida';
      } else if (error.message.includes('quota')) {
        errorMessage = 'Limite de e-mails excedido';
      }
    }

    return {
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? details : undefined
    };
  }
}

/**
 * Testa a configuração de e-mail
 */
export async function testEmailConfig(): Promise<EmailResult> {
  try {
    const testData: EmailData = {
      name: 'Teste',
      email: 'teste@exemplo.com',
      message: 'Este é um e-mail de teste para verificar a configuração SMTP.'
    };
    
    return await sendContactEmail(testData);
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao testar configuração',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 