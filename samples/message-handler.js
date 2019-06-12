//
// /!\ BROWSER
//
// Este código deve rodar no browser.
//

// Crio um escopo privado para declarar as variáveis, assim não poluo o escopo
// global do navegador (window), que é facilmente poluível.
const onMessage = (function() {
  // Esse array é privado a este escopo:
  const actionHandlers = [
    {
      message: 'Luiz',
      handler: () => 'Você disse LUIZ!'
    },
    {
      message: 'Goufix',
      handler: () => 'Você disse GOUFIX!'
    }
  ];

  // Essa é, de fato, a função "window.onMessage":
  function onMessageHandler(message) {
    console.log(`Iniciando a procura do handler para a mensagem ${message}...`);

    // Procuramos, dentro do array "actionHandlers", o objeto que contém a
    // mensagem enviada:
    const obj = actionHandlers.find((o) => {
      // Nota: Não estou usando arrow function para explicar.
      // Só iremos achar o objeto caso a mensagem enviada seja EXATAMENTE igual
      // à mensagem que foi especificada em um dos handlers.
      return o.message === message;
    });

    // Agora, verificamos se um objeto foi encontrado:
    if (obj) {
      // Chamamos o handler do objeto encontrado:
      const result = obj.handler();
      console.log(result);
    } else {
      // Como nenhum objeto foi encontrado para a mensagem enviada:
      console.log(
        `Você enviou ${message}. No entanto, não foram encontradas actions para esta mensagem.`
      );
    }

    // Separador (pode ignorar):
    console.log('-'.repeat(10));
  }

  // Retornamos essa função, que será aplicada no escopo global, diferentemente
  // do array "actionHandlers", que permanecerão dentro do escopo deste wrap.
  return onMessageHandler;
})();

// Esse loop é só para você poder enviar várias mensagens sem ficar chamando a
// função manualmente. Pode ignorá-lo, focando somente na função onMessage.
// eslint-disable-next-line no-restricted-globals
while (confirm('Você deseja digitar mais uma mensagem?')) {
  onMessage(window.prompt('Sua mensagem...'));
}
