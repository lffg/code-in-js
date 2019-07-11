// https://pt.stackoverflow.com/a/396588/69296

function getResponse({ getter, validator, onError, onSuccess }) {
  let resp = getter();
  let isValid = validator(resp);

  while (!isValid) {
    onError(resp);

    // "Rodar" novamente:
    resp = getter();
    isValid = validator(resp);
  }

  onSuccess(resp);
}

getResponse({
  getter: () => prompt('Digite um número menor ou igual a 5.'),
  validator: (resp) => parseInt(resp) <= 5,
  onError: (resp) => alert(`O valor "${resp}" não é válido.`),
  onSuccess: (resp) => alert(`Acertou! O número ${resp} é válido!`)
});
