const generateBoleto = async () => {
  const payload = {
    amount: parseInt(document.getElementById("amount").value),
    name: document.getElementById("name").value,
    taxId: document.getElementById("CNPJ").value,
    streetLine1: document.getElementById("street").value,
    streetLine2: document.getElementById("complement").value,
    district: document.getElementById("district").value,
    city: document.getElementById("city").value,
    stateCode: document.getElementById("state").value,
    zipCode: document.getElementById("zipCode").value,
    due: document.getElementById("due").value,
  };
  axios
    .post("http://localhost:3000/api/v1/boleto", {
      data: payload,
    })
    .then(function (response) {
      console.log(response.data.boleto[0].id);
      const boletoId = response.data.boleto[0].id;
      getBoletoPDF(boletoId);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const getBoletoPDF = (boletoId) => {
  axios
    .get("http://localhost:3000/api/v1/getBoletoPDF/" + boletoId)
    .then(function (response) {
      const params = {
        id: boletoId,
        email: document.getElementById("email").value
      }
      console.log('PDF de boleto gerado')
      sendBoletoEmail(params);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const sendBoletoEmail = (params) => {
  axios
    .get("http://localhost:3000/api/v1/sendMailBoleto/" + params.email + '/' + params.id)
    .then(function (response) {
      console.log(response);
      console.log(response.data);
      parseInt(document.getElementById("amount").value),
      document.getElementById("name").value = ""
      document.getElementById("CNPJ").value = ""
      document.getElementById("street").value = ""
      document.getElementById("email").value = ""
      document.getElementById("complement").value = ""
      document.getElementById("amount").value = ""
      document.getElementById("district").value = ""
      document.getElementById("city").value = ""
      document.getElementById("state").value = ""
      document.getElementById("zipCode").value = ""
      document.getElementById("due").value = ""
      alert("O boleto de id: " + params.id + " foi criado com SUCESSO para o cliente de email " + params.email)
    })
    .catch(function (error) {
      console.error(error);
    });
};

function formatCNPJ(input) {
  // Remove qualquer caractere que não seja número
  var cnpj = input.value.replace(/\D/g, "");

  // Aplica a formatação
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");

  // Atualiza o valor do input
  input.value = cnpj;
}

function formatCEP(input) {
  // Remove qualquer caractere que não seja número
  var cep = input.value.replace(/\D/g, '');

  // Aplica a formatação
  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');

  // Atualiza o valor do input
  input.value = cep;
}

function validarMaiusculas(input) {
  input.value = input.value.toUpperCase();
}

function formatDate(input) {
  // Remove qualquer caractere que não seja número
  var date = input.value.replace(/\D/g, '');

  // Verifica o tamanho da data
  if (date.length > 8) {
    date = date.slice(0, 8);
  }

  // Aplica a formatação
  date = date.replace(/^(\d{4})(\d)/, '$1-$2');
  date = date.replace(/^(\d{4})-(\d{2})(\d)/, '$1-$2-$3');

  // Atualiza o valor do input
  input.value = date;
}
