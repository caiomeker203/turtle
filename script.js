var listaCarrinho = [];

document.querySelectorAll('.addToCart').forEach(function (botao) {
    botao.addEventListener('click', function () {
        const product = document.querySelector('.product')

        var nome = this.getAttribute('data-nome');
        var preco = parseFloat(this.getAttribute('data-preco'));
        var sabor = this.parentNode.querySelector('select').value;
        var quantidade = this.parentNode.querySelector('#quant').value


        console.log(quantidade)


        adicionarAoCarrinho(nome, preco, sabor, quantidade);
    });
});

function adicionarAoCarrinho(nome, preco, sabor, quantidade) {
    let itemExiste = false
    listaCarrinho.forEach(function (el){
        if(el.nome === nome && el.sabor === sabor){
            el.quantidade = parseInt(el.quantidade) + parseInt(quantidade)
          
            itemExiste = true

            var listaCarrinhoString = JSON.stringify(listaCarrinho);
            localStorage.setItem('listaCarrinho', listaCarrinhoString);
        
            atualizarCarrinho(listaCarrinhoString);
        }
    })

    if(itemExiste === false){
        var novoItem = {
            nome: nome,
            preco: preco,
            sabor: sabor,
            quantidade: quantidade
    
        };
        listaCarrinho.push(novoItem);
    
    
        var listaCarrinhoString = JSON.stringify(listaCarrinho);
        localStorage.setItem('listaCarrinho', listaCarrinhoString);
    
        atualizarCarrinho(listaCarrinhoString);
    }


}



function atualizarCarrinho(listaCarrinhoString) {
    var listaCarrinhoElement = document.getElementById('lista-carrinho');
    var totalCarrinhoElement = document.getElementById('total-carrinho');

    listaCarrinhoElement.innerHTML = '';
    var total = 0;


    listaCarrinho.forEach(function (item, index) {
        var novoItemElement = document.createElement('li');
        
        console.log(item)

        if (item.quantidade > 0) {
            novoItemElement.innerHTML =  item.quantidade + 'x' + ' ' +  item.nome + ' - ' + item.sabor  +  ' - R$ ' + item.preco.toFixed(2) * item.quantidade +` <span class="remover" id="${item.nome + ' ' + item.sabor}">Remover</span>`;
            listaCarrinhoElement.appendChild(novoItemElement);
            total += item.preco * item.quantidade;
        } else {
            novoItemElement.innerHTML = item.nome + ' - R$ ' + item.preco.toFixed(2)   + '-Sabor:' + item.sabor + '-Quantidade' + item.quantidade + ' <span class="remover">Remover</span>';
            listaCarrinhoElement.appendChild(novoItemElement);
            total += item.preco;
        }





        novoItemElement.querySelector('.remover').addEventListener('click', function () {
           
            removerDoCarrinho(index, listaCarrinhoString);
        });
    });

    totalCarrinhoElement.textContent = total.toFixed(2);
}


document.querySelectorAll('.quantidade').forEach(function (button) {
    button.addEventListener('click', function () {
        var input = this.parentElement.querySelector('#quant');
        var currentValue = parseInt(input.value);
        var maxValue = parseInt(input.getAttribute('max'));
        var minValue = parseInt(input.getAttribute('min'));

        if (this.classList.contains('mais')) {
            if (currentValue < maxValue) {
                input.value = currentValue + 1;
            }
        } else if (this.classList.contains('menos')) {
            if (currentValue > minValue) {
                input.value = currentValue - 1;
            }
        }
    });
});



$('.cart-icon').on('click', function () {
    $('#cartModal').show();
});

$('#checkoutBtn').on('click', function () {
    window.location = 'checkout.html'

})

function removerDoCarrinho(index , listaCarrinhoString) {

    listaCarrinho.splice(index, 1);

    console.log(listaCarrinho)

    localStorage.setItem('listaCarrinho', JSON.stringify(listaCarrinho));
    console.log(listaCarrinho)


    atualizarCarrinho(JSON.stringify(listaCarrinho));
}



$('#cartModal .close').on('click', function () {
    $('#cartModal').hide();
});




