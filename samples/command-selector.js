const commands = [
  {
    name: 'kick',
    description: 'Kicka um usuário do quarto.'
  },
  {
    name: 'kickall',
    description: 'Kicka todos os usuários do quarto.'
  },
  {
    name: 'pickall',
    description: 'Recolhe todos os mobis do quarto.'
  },
  {
    name: 'jump',
    description: 'Faz o personagem pular.'
  },
  {
    name: 'iddqd',
    description: 'Espelha-girando a tela em 180 graus.'
  }
];

console.log(
  commands
    .map(({ name, description }) => `:${name} --> ${description}`)
    .join('\n')
);
