$(document).ready(function(){
    $('.ipt-telefone').mask('(00) 0000-0000');
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$(".btn-cadastrar").click(function (){
    let nome = $(".ipt-nome input").val();
    let convenio = $(".ipt-convenio select").val();
    let serie = $(".ipt-serie select").val();
    let contatos = [];
    /*$(".multiple-form-group").forEach((contact) => {
        console.log(contact);
    })*/
    console.log($(".multiple-form-group")[1]);
})