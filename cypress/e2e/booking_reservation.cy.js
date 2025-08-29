import '../support/e2e.js'


// Função auxiliar para formatar datas, coloque-a fora do 'describe' ou no topo do arquivo
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

describe('Fluxos de Reserva de Quarto', () => {


  // Caso de teste CT05
  it('Realizar reserva via request', () => {

    // Criação das datas dinâmicas para a reserva
    const today = new Date(); // data atual
    const checkinDate = formatDate(today);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const checkoutDate = formatDate(dayAfterTomorrow);

    cy.log(`Preparando o estado: criando uma reserva via API de ${checkinDate} a ${checkoutDate}`);

    // Realizando reserva via request
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        firstname: 'Abel',
        lastname: 'Galvão',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: checkinDate,
            checkout: checkoutDate
        },
        additionalneeds: 'Café da manhã',
        email: 'abel.ramalho18@gmail.com',
        phone: '75992148111'
      }
      }).then((response) => {
        // Garante que a reserva foi criada com sucesso
        expect(response.status).to.eq(200);
    });

    // Conclusão do teste
    cy.log('Verificação concluída: Reserva efetuada via request.');

  });  

  // Caso de teste CT06
  it('Realizar reserva via formulário', () => {

    // Criação das datas dinâmicas para a reserva
    const today = new Date(); // data atual
    const checkinDate = formatDate(today);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const checkoutDate = formatDate(dayAfterTomorrow);


    cy.log(`Preparando o estado: criando uma reserva via formulário de ${checkinDate} a ${checkoutDate}`);

    // Realizando reserva via formulário
    cy.visit('https://automationintesting.online/');
    cy.viewport(1280, 720);

    // Clicando no botão de reservar
    cy.get(':nth-child(3) > .card > .card-footer > .btn').click({ force: true });

    cy.get('#doReservation').click({ force: true });

    // Preenchendo o formulário
    cy.get('[placeholder="Firstname"]').scrollIntoView().type('Abel', {force: true});
    cy.get('[placeholder="Lastname"]').type('Ramalho', {force: true});
    cy.get('[placeholder="Email"]').type('abel.ramalho@gmail.com', {force: true});
    cy.get('[placeholder="Phone"]').type('75992148111', {force: true});
    // Finalizando a reserva
    cy.contains('button', 'Reserve Now').should('be.visible').should('not.be.disabled').click({ force: true });

    // Conclusão do teste
    cy.log('Verificação concluída: Reserva efetuada via formulário.');

  });

});