// Teste de emojis na mensagem do WhatsApp
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function generateWhatsAppMessage(product, quantity) {
  const totalSemDesconto = quantity * product.price;
  const desconto = totalSemDesconto * 0.0499;
  const totalComDesconto = totalSemDesconto - desconto;
  const economia = totalSemDesconto - totalComDesconto;
  
  const nomeCompleto = product.specs?.volume 
    ? `${product.name} ${product.specs.volume}`
    : product.name;
  
  // Construir mensagem com todos os valores
  let message = `Olá! Quero fazer um pedido pela SoluSix

Produto: ${nomeCompleto}
Quantidade: ${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}
Valor unitário: ${formatCurrency(product.price)}
Total sem desconto: ${formatCurrency(totalSemDesconto)}
Total com 4,99% de desconto por pedir via WhatsApp: ${formatCurrency(totalComDesconto)}`;

  // Adicionar linha de economia apenas se for maior que R$ 0,00
  if (economia > 0) {
    message += `\nEconomia: ${formatCurrency(economia)}`;
  }

  message += `

Já vou te enviar o meu endereço completo, só um momento.

Aguardo o link de pagamento. Obrigado!`;

  return message;
}

const testProduct = {
  name: "Detergente para Máquina de Lavar Louças - Maq-wash",
  price: 63.90,
  specs: { volume: "5L" }
};

console.log("=== TESTE DE EMOJIS ===");
const message = generateWhatsAppMessage(testProduct, 1);
console.log("Mensagem original:");
console.log(message);

console.log("\n=== VERIFICAR EMOJIS ===");
console.log("👋 presente:", message.includes("👋"));
console.log("📦 presente:", message.includes("📦"));
console.log("🔢 presente:", message.includes("🔢"));
console.log("💰 presente:", message.includes("💰"));
console.log("📉 presente:", message.includes("📉"));
console.log("😊 presente:", message.includes("😊"));

console.log("\n=== URL CODIFICADA ===");
const encodedMessage = encodeURIComponent(message);
console.log("URL para WhatsApp:");
console.log(`https://wa.me/+5511957937762?text=${encodedMessage}`);

console.log("\n=== DECODIFICAR PARA VERIFICAR ===");
const decodedMessage = decodeURIComponent(encodedMessage);
console.log("Mensagem decodificada:");
console.log(decodedMessage); 