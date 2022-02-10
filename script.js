const cores=['amarelo','vermelho','azul','verde','laranja','roxo']

let escolha1='';
let escolha2='';
let escolha3='';
let escolha4='';
let resposta=[]
let tentativa=[]
let tentativaPrintada=null;
let preto=0
let branco=0
let qtdTentativas=0;
let cloneResposta=[];
criarResposta()


function abrirOpcoes(casa){
    const casaSelecionada=document.querySelector(casa+' .opcoes');
    casaSelecionada.classList.toggle('escondido');
}

function escolherCor(cor,casa){
    const escolha=document.querySelector(casa+' .escolha')
    escolha.innerHTML='<div class="bola '+cor+'"></div>';
    if(casa=='.c1'){escolha1=cor}
    if(casa=='.c2'){escolha2=cor}
    if(casa=='.c3'){escolha3=cor}
    if(casa=='.c4'){escolha4=cor}
}

function criarResposta(){
    for(let i=0;i<4;i++){
        const x=getRandomIntInclusive(0,5);
        const y=cores[x];
        resposta.push(y);
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function preTentar(){
    if(escolha1!='' && escolha2!='' && escolha3!='' && escolha4!=''){tentar()}
    else{alert('Escolha as cores da tentativa, basta clicar na casa que uma barra de seleção aparecerá.')}
}

function tentar(){
    tentativa=[escolha1,escolha2,escolha3,escolha4]
    tentativaPrintada='<li class="tentativaPrintada"><div class="casa"><div class="bola '+escolha1+'"></div></div><div class="casa"><div class="bola '+escolha2+'"></div></div><div class="casa"><div class="bola '+escolha3+'"></div></div><div class="casa"><div class="bola '+escolha4+'"></div></div></li>'
    qtdTentativas++
    adicionarTentativa();
    conferir();
    if(qtdTentativas==4){esconderAjuda()};
}

function adicionarTentativa(){
    let listaTentativas=document.querySelector('.lista-tentativas');
    listaTentativas.innerHTML+=tentativaPrintada;
    const scroll=document.querySelector('.container');
    scroll.scrollBy(0,200)
}

function conferir(){
    for(let k=0;k<4;k++){
        cloneResposta.push(resposta[k])
    }
    for(let i=0;i<4;i++){
        if(tentativa[i]==cloneResposta[i]){
            preto++;
            cloneResposta[i]=null;
            tentativa[i]='fechou'
        }
    }    
    for(let j=0;j<4;j++){
        if(cloneResposta.includes(tentativa[j])){
            branco++;
            const aExcluir=cloneResposta.indexOf(tentativa[j]);
            cloneResposta[aExcluir]=null;
        }
    }
    adicionarVerificacoes(preto,branco,qtdTentativas);
    preto=0
    branco=0
    cloneResposta=[]
}

function adicionarVerificacoes(qtdPretos,qtdBrancos,numero){
    let listaVerificacoes=document.querySelector('.lista-verificacoes');
    listaVerificacoes.innerHTML+='<li class="caixinha l'+numero+'"></li>'
    let caixa=document.querySelector('.l'+numero)
    for(let k=0;k<qtdPretos;k++){
    caixa.innerHTML+='<div class="bolinha-preta"></div>';
    }
    for(let k=0;k<qtdBrancos;k++){
    caixa.innerHTML+='<div class="bolinha-branca"></div>'; 
    }
    if(branco==0 && preto==0){
        caixa.innerHTML+='<div class="bolinha-inexistente"></div>';
    }
    if(preto==4){setTimeout(terminarJogo,500)}
}

function terminarJogo(){
    alert('BOOOA! Você conseguiu em '+qtdTentativas+' tentativas.')
    const botaoRecomeco=document.querySelector('.botaoRecomeco')
    botaoRecomeco.classList.remove('esconde')
    const scroll=document.querySelector('.container');
    scroll.scrollBy(0,200)
}

function recomecarJogo(){
    window.location.reload(true);
}

function abrirRegra(){
    const regras=document.querySelector('.regras');
    regras.classList.toggle('esconde')
    const ajuda=document.querySelector('.comoJogar')
    ajuda.classList.toggle('esconde')
    const cortina=document.querySelector('.cortina')
    cortina.classList.toggle('esconde')
}

function esconderAjuda(){
    const ajuda=document.querySelector('.comoJogar');
    ajuda.classList.toggle('esconde')
}