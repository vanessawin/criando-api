function salvar() {    // função  para o botão salvar
    const titulo = $('#titulo').val() // pegando o valor do campo titulo com jquery
    const descricao = $('#descricao').val() // pegando o valor do campo descrição com jquery

    //Validação 
    if (!titulo) return alert("Preencha o campo Título")
    if (!descricao) return alert("Preencha o campo Descrição")

     // enviando o metodo post para o backend
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
        },
        error: function (res) {
            alert(res.responseJSON.mensage) // esse retorno de msgem é vinda do backend
        }
    })

}
