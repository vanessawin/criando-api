function salvar() {    // função  para o botão salvar
    const titulo = $('#titulo').val() // pegando o valor do campo titulo com jquery
    const descricao = $('#descricao').val() // pegando o valor do campo descrição com jquery

    //Validação 
    if (!titulo) return alert("Preencha o campo Título")
    if (!descricao) return alert("Preencha o campo Descrição")

    // enviando o metodo post/criar para o backend
    $.ajax({
        type: 'post',
        url: '/notes', // rota que criamos no backend 
        data: JSON.stringify({ title: titulo, description: descricao }), //é o json que vou enviar para o backend
        contentType: "application/json; charset=utf-8",

        //retorno de sucesso ou errro vinda do backend
        success: function (data) {
            alert(data.menssage) // esse retorno de msgem é vinda do backend
            $('#titulo').val("") // string vazia, depois do alert limpe o campo titulo
            $('#descricao').val("")//string vazia, siginfica que depois do alert limpe o campo
            listar() // função toda vez que limpar os campos esse listar vai vostrar todos os itens
        },
        error: function (res) {
            alert(res.responseJSON.mensage) // esse retorno de msgem é vinda do backend
        }
    })

}
function excluir(id) {    // função  para o botão salvar
    
    $.ajax({
        type: 'delete',
        url: '/notes', // rota que criamos no backend 
        data: JSON.stringify({ id: id }), //é o json que vou enviar para o backend
        contentType: "application/json; charset=utf-8",

        //retorno de sucesso ou errro vinda do backend
        success: function (data) {
            alert(data.menssage) // esse retorno de msgem é vinda do backend
            listar() // função toda vez que limpar os campos, esse listar vai mostrar todos os itens
        },
        error: function (res) {
            alert(res.responseJSON.mensage) // esse retorno de msgem é vinda do backend
        }
    })

}

// metodo get/listar
function listar() {
    $(".list").html("") // antes de inserir algo na lista, limpe a listagem do html 
    // para nâo duplicar, para receber a listagem que vem da api
    $.ajax({
        type: 'get',
        url: '/notes', // rota que criamos no backend 

        contentType: "application/json; charset=utf-8",

        //retorno de sucesso ou errro vinda do backend
        success: function (data) {
            console.log(data)
            // cada item executado no html vai listar 
            for (const note of data) { 
                // cada item executado no html vai listar 
                $(".list").append(`  
                
                <div class="item">
                    <h2>${note.title}</h2>
                    <p>${note.description}</p>
                    <button onclick="excluir('${note.id}')">Excluir</button>
                    
                </div>
                
                `)
            }
        },
        error: function (res) {
            alert(res.responseJSON.mensage) // esse retorno de msgem é vinda do backend
        }
    })
}

listar() //se dar f5  vai aparecer tudo que ja estava na api, por isso que chamei a função fora


// metodo delete/excluir




















