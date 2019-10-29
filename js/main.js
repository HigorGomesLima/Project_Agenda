(function init(){
    $(".ipt-data input").val(moment().format('DD/MM/YYYY'));
})();

$(".btn-cadastrar").click(function (){
    let nome = $(".ipt-nome input").val();
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
    
    console.log(candidato);
})