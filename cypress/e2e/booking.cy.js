describe('Fluxo de Envio de Contato', () => {

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://automationintesting.online/');
  });


  // Caso de teste CT01
  it('Deve enviar uma mensagem de contato com sucesso ao preencher todos os dados', () => {

    // Preenchimento do formulário
    cy.get('[data-testid="ContactName"]').scrollIntoView().type('Abel Ramalho Galvão', { force: true });
    cy.get('[data-testid="ContactEmail"]').type('abel.ramalho18@gmail.com', { force: true });
    cy.get('[data-testid="ContactPhone"]').type('75992148111', { force: true });
    cy.get('[data-testid="ContactSubject"]').type('Dúvida sobre reserva para o próximo mês (setembro)', { force: true });
    cy.get('[data-testid="ContactDescription"]').type('Gostaria de saber a disponibilidade, os preços e possíveis promoções para efetuar uma reserva no próximo mês, incluindo opções de pagamento e condições de cancelamento.', { force: true });

    // Verificar se os dados informados estão nos campos
    cy.log('Verificando se os valores foram inseridos corretamente antes do submit...');
    cy.get('[data-testid="ContactName"]').should('have.value', 'Abel Ramalho Galvão');
    cy.get('[data-testid="ContactEmail"]').should('have.value', 'abel.ramalho18@gmail.com');
    cy.get('[data-testid="ContactPhone"]').should('have.value', '75992148111');
    cy.get('[data-testid="ContactSubject"]').should('have.value', 'Dúvida sobre reserva para o próximo mês (setembro)');

    // Simulando clicar fora (blur) para acionar qualquer validação pendente
    cy.get('[data-testid="ContactDescription"]')
      .should('have.value', 'Gostaria de saber a disponibilidade, os preços e possíveis promoções para efetuar uma reserva no próximo mês, incluindo opções de pagamento e condições de cancelamento.')
      .blur();

    // Clicando no botão para submissão do formulário
    cy.contains('button', 'Submit').click();

    // Verificar mensagem de sucesso
    cy.get('h3.h4.mb-4').should('contain.text', 'Thanks for getting in touch Abel Ramalho Galvão!');
  });

  // Caso de teste CT02
  it('Não deve enviar a mensagem quando o campo obrigatório "Name" está vazio', () => {

    cy.intercept('POST', 'api/message').as('postMessage');

    // Preenchemos todos os campos, exceto o nome
    cy.get('[data-testid="ContactName"]').scrollIntoView(); // Apenas rola para a visão, sem digitar.
    cy.get('[data-testid="ContactEmail"]').type('abel.ramalho18@gmail.com', { force: true });
    cy.get('[data-testid="ContactPhone"]').type('75992148111', { force: true });
    cy.get('[data-testid="ContactSubject"]').type('Dúvida sobre reserva para o próximo mês (setembro)', { force: true });
    cy.get('[data-testid="ContactDescription"]').type('Esta é uma tentativa de envio sem o preenchimento do nome.');
    
    // Clicando no botão de submit
    cy.contains('button', 'Submit').click();

    // Verificando que a chamada para a API não foi realizada
    cy.wait('@postMessage').its('response.statusCode').should('eq', 400);

    // Verificando que não houve a mensagem de sucesso
    cy.get('.alert').should('not.contain', 'Thanks for getting in touch');

    // Conclusão do teste
    cy.log('Verificação concluída: A chamada para a API não foi realizada, como esperado.');
  });

  // Caso de teste CT03
  it('Não deve enviar a mensagem com campo "Subject" abaixo do tamanho mínimo', () => {

    cy.intercept('POST', 'api/message').as('postMessage');

    // Preenchemos todos os campos do formulário
    cy.get('[data-testid="ContactName"]').scrollIntoView().type('Abel Ramalho Galvão', { force: true });
    cy.get('[data-testid="ContactEmail"]').type('abel.ramalho18@gmail.com', { force: true });
    cy.get('[data-testid="ContactPhone"]').type('75992148111', { force: true });

    // Usando um assunto com 4 caracteres, que é inválido (mínimo é 5)
    cy.get('[data-testid="ContactSubject"]').type('1234', { force: true }); 
    
    cy.get('[data-testid="ContactDescription"]').type('Esta mensagem testa a validação de tamanho mínimo do campo de assunto');
    
    cy.contains('button', 'Submit').click();

    // Verificando que a chamada para a API não foi realizada
    cy.wait('@postMessage').its('response.statusCode').should('eq', 400);

    // Verificando que não houve a mensagem de sucesso
    cy.get('.alert').should('not.contain', 'Thanks for getting in touch');

    // Conclusão do teste
    cy.log('Verificação concluída: O campo não aceita menos de 5 caracteres.');
  });

  // Caso de teste CT04
  it('CT04 - Não deve enviar a mensagem com um formato de e-mail inválido', () => {
    // --- PREPARAÇÃO ---
    cy.intercept('POST', 'api/message').as('postMessage');

    // --- AÇÕES DO USUÁRIO ---
    cy.get('[data-testid="ContactName"]').scrollIntoView().type('Abel Ramalho Galvão', { force: true });

    // Usando um e-mail sem '@', que é um formato inválido
    cy.get('[data-testid="ContactEmail"]').type('email-invalido.com', { force: true });
    cy.get('[data-testid="ContactPhone"]').type('75992148111', { force: true });
    cy.get('[data-testid="ContactSubject"]').type('Teste de formato de e-mail', { force: true });
    cy.get('[data-testid="ContactDescription"]').type('Esta mensagem testa a validação de formato do campo de e-mail.');
    
    cy.contains('button', 'Submit').click();

    // Verificando que a chamada para a API não foi realizada
    cy.wait('@postMessage').its('response.statusCode').should('eq', 400);

    // Verificando que não houve a mensagem de sucesso
    cy.get('.alert').should('not.contain', 'Thanks for getting in touch');

    // Conclusão do teste
    cy.log('Verificação concluída: O campo de e-mail não está no formato correto.');
  });
  

});
