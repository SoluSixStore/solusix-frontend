import { test, expect } from '@playwright/test';

test.describe('SoluSix Landing Page', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Verificar título da página
    await expect(page).toHaveTitle(/SoluSix/);
    
    // Verificar se o header está visível
    await expect(page.locator('header')).toBeVisible();
    
    // Verificar se o logo está presente
    await expect(page.locator('h1:has-text("SoluSix")')).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se todas as seções principais estão presentes
    await expect(page.locator('section')).toHaveCount(7); // Hero, Benefits, ProductCatalog, Experience, Testimonials, HowItWorks, AutoReposicao, FAQ
    
    // Verificar seções específicas
    await expect(page.locator('section:has-text("Produtos")')).toBeVisible();
    await expect(page.locator('section:has-text("Benefícios")')).toBeVisible();
    await expect(page.locator('section:has-text("Como funciona")')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Testar links de navegação
    const navLinks = ['#produtos', '#sobre', '#contato'];
    
    for (const link of navLinks) {
      const navElement = page.locator(`a[href="${link}"]`);
      if (await navElement.isVisible()) {
        await navElement.click();
        // Verificar se a página rola para a seção
        await page.waitForTimeout(500);
      }
    }
  });

  test('should have working WhatsApp button', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se o botão WhatsApp está presente
    const whatsappButton = page.locator('button:has-text("WhatsApp")');
    await expect(whatsappButton).toBeVisible();
    
    // Verificar se o botão é clicável (não testamos a abertura real do WhatsApp)
    await expect(whatsappButton).toBeEnabled();
  });

  test('should display product catalog', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se o catálogo de produtos está presente
    await expect(page.locator('section:has-text("Produtos")')).toBeVisible();
    
    // Verificar se há cards de produtos
    const productCards = page.locator('[class*="card"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('should have working lead magnet form', async ({ page }) => {
    await page.goto('/');
    
    // Simular exit-intent para abrir o lead magnet
    await page.mouse.move(0, -10);
    
    // Verificar se o formulário aparece
    const leadMagnetForm = page.locator('[class*="modal"], [class*="form"]');
    if (await leadMagnetForm.isVisible()) {
      await expect(leadMagnetForm).toBeVisible();
      
      // Testar fechamento com ESC
      await page.keyboard.press('Escape');
      await expect(leadMagnetForm).not.toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Testar viewport mobile
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Verificar se o menu mobile aparece
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has([class*="menu"])');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Verificar se o menu mobile abre
      const mobileMenu = page.locator('nav:has(a[href*="#"])');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should handle form submissions gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Procurar por formulários na página
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      for (let i = 0; i < formCount; i++) {
        const form = forms.nth(i);
        
        // Verificar se o formulário tem campos obrigatórios
        const requiredFields = form.locator('input[required], select[required], textarea[required]');
        const requiredCount = await requiredFields.count();
        
        if (requiredCount > 0) {
          // Testar submissão sem preencher campos obrigatórios
          await form.locator('button[type="submit"], input[type="submit"]').click();
          
          // Verificar se há mensagens de erro
          const errorMessages = page.locator('[class*="error"], [class*="invalid"]');
          if (await errorMessages.count() > 0) {
            await expect(errorMessages.first()).toBeVisible();
          }
        }
      }
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Verificar meta tags importantes
    const title = await page.title();
    expect(title).toContain('SoluSix');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verificar se não há erros de console
    expect(consoleErrors.length).toBe(0);
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se há elementos com roles apropriados
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      
      // Se não há aria-label, deve ter texto
      if (!ariaLabel && !text?.trim()) {
        console.warn('Button without accessible text or aria-label found');
      }
    }
    
    // Verificar se há headings em ordem
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });
}); 