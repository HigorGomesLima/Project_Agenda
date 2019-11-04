var id = '';
var listaAgenda;
var opcao = 'Inserir';
var atual;
var carregado = false;
var autorizado = false;

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
    /*getListaEntrevista().then(function (lista){
        (function setPromise(){
            listaAgenda = lista;
            if(listaAgenda.length != undefined){
                gerarTebela();
            }else{
                setTimeout(setPromise,500);
            }
        })();
    });*/
    $(".nav-link").bind('click',trocarTab);
    $("#btn-editar").bind('click',editarCandidato);
    $(".btn-cadastrar").bind('click',cadastroCandidato);
})();

function carregarListaDocumentos(){
    if(listaAgenda == undefined){
        console.log("Banco de dados consultado");
        listaAgenda = {};
        let db = firebase.firestore();
        db.collection('candidato')
            .onSnapshot(function (snapshot){
            snapshot.docChanges().forEach(function (change){
                let candidato = {
                    id: change.doc.id,
                    nome: change.doc.data().nome,
                    convenio: change.doc.data().convenio,
                    serie: change.doc.data().serie,
                    contatos: change.doc.data().contatos,
                    data: change.doc.data().data,
                    escola: change.doc.data().escola,
                    motivo: change.doc.data().motivo,
                    boletim: change.doc.data().boletim,
                    disciplinas: change.doc.data().disciplinas,
                    talento: change.doc.data().talento,
                    observacao: change.doc.data().observacao,
                    situacao: change.doc.data().situacao
                }
                listaAgenda[candidato.id] = candidato;
                if(carregado){
                    gerarTebela(true);
                }
            })
        });
        (function time(){
            if(Object.entries(listaAgenda).length > 0){
                gerarTebela(true);
                carregado = true;
            }else{
                setTimeout(time,500);
            }
        })();
    }
}

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

function trocarTab(){
    if($(this).html() != opcao){
        opcao = $(this).html();
        $(".nav-item .active").removeClass("active");
        $(this).addClass("active");
        $("#consultar").fadeToggle('fast');
        $("#inserir").fadeToggle('fast');
        if(opcao == 'Consultar'){
            carregarListaDocumentos();
        }
    }
}

$("#bnt-fechar").click(function (){
    $("#informacao").fadeOut('slow');
    $(".fundo").fadeOut("fast");
})

$(".fundo").click(function () {
    if(carregado){
        $("#informacao").fadeOut('slow');
        $(".fundo").fadeOut("fast");
        $("#novo-cadastro").fadeOut('fast');
    }
})

function cadastroCandidato(){
    $(".fundo").fadeIn('fast');
    $(".spinner-border").fadeIn('fast');
    let nome = $(".ipt-nome input").val().toUpperCase();
    let convenio = $(".ipt-convenio select").val();
    let serie = $(".ipt-serie select").val();
    let contatos = [];
    $(".detalhe-contato").each(function (){
        if($(this).find(".ipt-contato").val() != ''){
            let aux = {
                telefone: $(this).find(".ipt-telefone").val(),
                contato: $(this).find(".ipt-contato").val()
            }
            contatos.push(aux);
        }
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
    if(id == ''){
        setCandidato(candidato);
    }else{
        if(autorizado){
            autorizado = false;
            setCandidato(candidato);
        }else{
            $(".fundo").fadeIn('fast');
            $(".spinner-border").fadeOut('fast');
            $("#confirmar-edicao a span:nth-child(1)").text(id);
            $("#confirmar-edicao a span:nth-child(2)").text(candidato.nome);
            $("#confirmar-edicao").fadeIn('fast');
        }
    }
}

$(".btn-limpar").click(function (){
    $(".fundo").fadeIn('fast');
    $("#confirmar-limpeza").fadeIn('fast');
})

$("#novo-cadastro .btn-novo").click(function (){
    novaFicha();
    id = '';
    $(".fundo").fadeOut("fast");
    $("#novo-cadastro").fadeOut('fast');
});

$("#novo-cadastro .btn-editar").click(function (){
    $(".fundo").fadeOut("fast");
    $("#novo-cadastro").fadeOut('fast');
});

$("#confirmar-edicao .btn-sim").click(function (){
    $("#confirmar-edicao").fadeOut('fast');
    autorizado = true;
    cadastroCandidato();
})

$("#confirmar-edicao .btn-nao").click(function (){
    $("#confirmar-edicao").fadeOut('fast');
    $(".fundo").fadeOut("fast");
})

$("#confirmar-limpeza .btn-sim").click(function (){
    novaFicha();
    id = '';
    $("#confirmar-limpeza").fadeOut('fast');
    $(".fundo").fadeOut("fast");
})

$("#confirmar-limpeza .btn-nao").click(function(){
    $("#confirmar-limpeza").fadeOut('fast');
    $(".fundo").fadeOut("fast");
})

function setCandidato(dados){
    let db = firebase.firestore();
    if(id == ''){
        db.collection('candidato').add(dados)
            .then(function (doc) {
            id = doc.id;
            $(".spinner-border").fadeOut('fast');
            $("#novo-cadastro a span").text(id);
            $("#novo-cadastro").fadeIn('fast');
        })
            .catch(function (erro){
            console.log(erro);
        });
    }else{
        db.collection('candidato').doc(id).set(dados)
            .then(function (doc) {
            $(".fundo").fadeOut('fast');
            $(".spinner-border").fadeOut('fast');
            $("#novo-cadastro a span").text(id);
            $("#novo-cadastro").fadeIn('fast');
        })
            .catch(function (erro){
            console.log(erro);
        });
    }
}

function getListaEntrevista(){
    let db = firebase.firestore();
    return db.collection('candidato').get()
        .then(function (snap){
        let listacandidato = [];
        snap.forEach(function (doc){
            let candidato = {
                id: doc.id,
                nome: doc.data().nome,
                convenio: doc.data().convenio,
                serie: doc.data().serie,
                contatos: doc.data().contatos,
                data: doc.data().data,
                escola: doc.data().escola,
                motivo: doc.data().motivo,
                boletim: doc.data().boletim,
                disciplinas: doc.data().disciplinas,
                talento: doc.data().talento,
                observacao: doc.data().observacao,
                situacao: doc.data().situacao
            }
            listacandidato[doc.id] = candidato;
        });
        return listacandidato;
    })
        .catch(function (erro){
        console.log("Erro "+erro);
    })
}

function gerarTebela(limpar){
    let tabela = $('#tabela-agenda tbody');
    if(limpar){
        $('#tabela-agenda tbody').empty();
    }
    if(Object.entries(listaAgenda).length != undefined){
        Object.entries(listaAgenda).forEach((stl) => {
            tabela.append("<tr class='linha' value='"+stl[0]+"'><td>"+stl[1].nome+"</td><td>"+stl[1].serie+"</td><td>"+stl[1].data+"</td><td>"+stl[1].convenio+"</td><td>"+stl[1].escola+"</td><td>"+stl[1].situacao+"</td></tr>");
            $("#tabela-agenda tbody .linha").bind('click',showCandidato);
        });
    }
}

function editarCandidato(){
    let candidato = atual;
    let ida = atual.id;
    $(".ipt-nome input").val(candidato.nome);
    $(".ipt-data input").val(candidato.data);
    $(".ipt-escola input").val(candidato.escola);
    $(".ipt-motivo textarea").val(candidato.motivo);
    $(".ipt-boletim select").val(candidato.boletim);
    $(".ipt-serie select").val(candidato.serie);
    $(".ipt-convenio select").val(candidato.convenio);
    $("#callbacks").multiSelect('deselect_all');
    $("#callbacks").multiSelect("select",candidato.disciplinas);
    $(".ipt-talento textarea").val(candidato.talento);
    $(".ipt-observacao textarea").val(candidato.observacao);
    $(".ipt-situacao select").val(candidato.situacao);
    for(let i = 0;i < candidato.contatos.length ; i++){
        if(i > 0){
            $(".btn-add").click();
        }
        $(".detalhe-contato .detalhe-contato:nth-child("+(i+1)+") .ipt-telefone").val(candidato.contatos[i].telefone);
        $(".detalhe-contato .detalhe-contato:nth-child("+(i+1)+") .ipt-contato").val(candidato.contatos[i].contato);
    }
    id = ida;
    opcao = 'Inserir';
    $(".nav-item:nth-child(2) .nav-link").removeClass("active");
    $(".nav-item:nth-child(1) .nav-link").addClass("active");
    $("#informacao").fadeOut('slow');
    $(".fundo").fadeOut("fast");
    $("#consultar").fadeToggle('fast');
    $("#inserir").fadeToggle('fast');
}

function showCandidato(){
    let ida = $(this).attr('value');
    let valores = listaAgenda[ida];
    $("#informacao label a[name='nome']").text('');
    $("#informacao label a[name='serie']").text('');
    $("#informacao label a[name='data']").text('');
    $("#informacao label a[name='escola']").text('Não possui');
    $("#informacao label a[name='motivo']").text('Não possui');
    $("#informacao label a[name='boletim']").text('');
    $("#informacao label a[name='talento']").text('Não possui');
    $("#informacao label a[name='situacao']").text('');
    $("#informacao label a[name='convenio']").text('');

    $("#informacao label a[name='nome']").text(valores.nome);
    $("#informacao label a[name='serie']").text(valores.serie);
    $("#informacao label a[name='convenio']").text(valores.convenio);
    $("#informacao label a[name='data']").text(valores.data);
    $("#informacao label a[name='escola']").text(valores.escola);
    $("#informacao label a[name='motivo']").text(valores.motivo);
    $("#informacao label a[name='boletim']").text(valores.boletim);
    $("#informacao label a[name='talento']").text(valores.talento);
    $("#informacao label a[name='situacao']").text(valores.situacao);
    $("#informacao label a[name='observacao']").text(valores.observacao);
    $("#informacao label ul[name='contato']").empty();
    $("#informacao label ul[name='disciplina']").empty();
    if(valores.contatos.length == 0){
        $("#informacao label ul[name='contato']").append("<li>Não possui</li>");
    }
    valores.contatos.forEach((stl) => {
        $("#informacao label ul[name='contato']").append("<li>"+stl.telefone+"  -  "+stl.contato+"</li>");
    });
    if(valores.disciplinas.length == 0){
        $("#informacao label ul[name='disciplina']").append("<li>Não possui</li>");
    }
    valores.disciplinas.forEach((stl) => {
        $("#informacao label ul[name='disciplina']").append("<li>"+stl+"</li>");
    })
    $(".fundo").fadeIn("fast")
    $("#informacao").fadeIn('slow');
    atual = valores;
}