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

  });  

});