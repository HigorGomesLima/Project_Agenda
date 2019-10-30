(function init(){
    novaFicha();
    const firebaseConfig = {
        apiKey: "AIzaSyCK5MuI-tYD7mqRXvKbqpcVlSWeaQplZu4",
        authDomain: "projetoagenda-d03a1.firebaseapp.com",
        databaseURL: "https://projetoagenda-d03a1.firebaseio.com",
        projectId: "projetoagenda-d03a1",
        storageBucket: "projetoagenda-d03a1.appspot.com",
        messagingSenderId: "533980409569",
        appId: "1:533980409569:web:1a23f6630637405a91d1a0",
        measurementId: "G-9RG9CXD48X"
    };
    firebase.initializeApp(firebaseConfig);
})();

function novaFicha(){
    $(".ipt-nome input").val('');
    $(".ipt-convenio select").val('Selecione');
    $(".ipt-serie select").val('Selecione');
    $(".ipt-data input").val('');
    $(".ipt-data input").val(moment().format('DD/MM/YYYY'));
    $(".ipt-escola input").val('');
    $(".ipt-motivo textarea").val('');
    $(".ipt-boletim select").val('Selecione');
    $(".ipt-talento textarea").val('');
    $(".ipt-observacao textarea").val('');
    $(".ipt-situacao select").val('N/A');
    $("#callbacks").multiSelect('deselect_all');
    $(".detalhe-contato").load(location.href + " .detalhe-contato");
}

$(".btn-cadastrar").click(function (){
    let nome = $(".ipt-nome input").val()toUpperCase();
    let convenio = $(".ipt-convenio select").val();
    let serie = $(".ipt-serie select").val();
    let contatos = [];
    $(".detalhe-contato").each(function (){
        let aux = {
            telefone: $(this).find(".ipt-telefone").val(),
            contato: $(this).find(".ipt-contato").val()
        }
        contatos.push(aux);
    });
    contatos.shift();
    let data = $(".ipt-data input").val();
    let escola = $(".ipt-escola input").val();
    let motivo = $(".ipt-motivo textarea").val();
    let boletim = $(".ipt-boletim select").val();
    let disciplinas = [];
    $(".ms-selection .ms-list .ms-selected span").each(function (){
        disciplinas.push(this.innerText);
    });
    let talento = $(".ipt-talento textarea").val();
    let observacao = $(".ipt-observacao textarea").val();
    let situacao = $(".ipt-situacao select").val();

    let candidato = {
        nome: nome,
        convenio: convenio,
        serie: serie,
        contatos: contatos,
        data: data,
        escola: escola,
        motivo: motivo,
        boletim: boletim,
        disciplinas: disciplinas,
        talento: talento,
        observacao: observacao,
        situacao: situacao
    }
    //setCandidato(candidato);
    console.log(candidato);
});

function setCandidato(dados){
    let db = firebase.firestore();
    db.collection('candidato').add(dados)
    .then(function (doc) {
        console.log(doc.id);
    })
    .catch(function (erro){
        console.log(erro);
    })
}