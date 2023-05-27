let hash = ''

const getBoletos = async () => {
  const slackId = document.getElementById("slackAccount").value;
  const centerId = document.getElementById("id-centroDeCustos").value;
  const minBalance = document.getElementById("minBalance").value;

  const payload = {
    slackId,
    centerId,
    minBalance,
  };

  axios
    .post("http://localhost:3000/api/v1/postDailyMessage", payload)
    .then((response) => {
      alert(
        "Sua conta SLACK foi vinculado ao centro de custos com SUCESSO"
      );
    })
    .catch(function (error) {
      console.error(error);
    });
    if (minBalance) {
      axios
        .post("http://localhost:3000/api/v1/alertBelowBalance", payload)
        .then((response) => {
          document.getElementById("slackAccount").value = "";
          document.getElementById("id-centroDeCustos").value = "";
          document.getElementById("minBalance").value = "";
          codeDiv = document.getElementById("pop-up-login").style.display = "none";
          alert(
            "O saldo mínimo da sua conta STARK foi definido!"
          );
        })
        .catch(function (error) {
          console.error(error);
        });
    }
};

function generateCode() {
  
  slackId = document.getElementById("slackAccount").value;

  axios
  .post("http://localhost:3000/api/v1/sendVerificationCode", { slackId })
    .then((response) => {
      codeDiv = document.getElementById("pop-up-codeConfirmation").style.display = "block";
      codeDiv = document.getElementById("pop-up-codeConfirmation").style.display = "flex";
      hash = response.data.hash
    })
    .catch(function (error) {
      console.error(error);
    });
}

function verifyCode(){
  inputCode = document.getElementById("confirmationCode").value;

  axios
  .post("http://localhost:3000/api/v1/validateVerificationCode", { inputCode: inputCode.toString(), code: hash })
    .then((response) => {
      alert("Sua conta SLACK foi verificada!")
      document.getElementById("pop-up-codeConfirmation").style.display = "none";
      document.getElementById("pop-up-login").style.display = "block";
      document.getElementById("pop-up-login").style.display = "flex";
    })
    .catch(function (error) {
      console.error(error);
    });

}
