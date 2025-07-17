console.log("=== TESTE SIMPLES DE EMOJIS ===");
console.log("👋");
console.log("📦");
console.log("🔢");
console.log("💰");
console.log("📉");
console.log("😊");

console.log("\n=== TESTE DE MENSAGEM COMPLETA ===");
const message = `Olá! Quero fazer um pedido pela SoluSix 👋

📦 Produto: Detergente para Máquina de Lavar Louças - Maq-wash 5L
🔢 Quantidade: 1 unidade
💰 Valor unitário: R$ 63,90
💰 Total sem desconto: R$ 63,90
📉 Total com 4,99% de desconto por pedir via WhatsApp: R$ 60,71

Já vou te enviar o meu endereço completo, só um momento. 😊

Aguardo o link de pagamento. Obrigado!`;

console.log(message);

console.log("\n=== TESTE DE ENCODE/DECODE ===");
const encoded = encodeURIComponent(message);
console.log("Encoded:", encoded.substring(0, 100) + "...");
const decoded = decodeURIComponent(encoded);
console.log("Decoded matches original:", decoded === message); 