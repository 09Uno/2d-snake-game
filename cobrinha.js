//Função para load da página
window.onload = function () {

    //função que fica esperando a tecla ser pressionada para começar
    document.addEventListener("keydown", keyPush);
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");


    //principais variáveis
    const vel = 1;

    //velocidade
    var vx = 0;
    var vy = 0;

    //posição
    var px = 10;
    var py = 15;

    //tamanho pixel
    var tp = 15;
    //quantidade de pixels
    var qp = 30;
    var macax = macay = 15;
    var macaOurox = macaOuroy = -15;
    var macaDiamanteX = macaDiamantey = -15

    var ptns = 0;
    var record = 0;
    var macaOuroComida;
    var contador = 0;
    var contador2 = 0;

    var vida = 0;

    var rastro = [];
    calda = 5;


    //velocidade de atualização da página
    setInterval(game, 110);



    function game() {

        //condição que faz a movimentação
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }


        //Criação dá área principal do jogo

        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, stage.width, stage.height);

        //criação das maçãs
        const img = new Image(50, 50);
        img.src = "./imagens/apple1.png"
        ctx.drawImage(img, macax * tp, macay * tp, tp + 5, tp + 5);


        //criação das maçãs douradas
        const img2 = new Image(50, 50);
        img2.src = "./imagens/gold.png"
        ctx.drawImage(img2, macaOurox * tp, macaOuroy * tp, tp + 5, tp + 5);


        //criação das maçãs de diamante

        const img3 = new Image(50, 50);
        img3.src = "./imagens/diamante.png"
        ctx.drawImage(img3, macaDiamanteX * tp, macaDiamantey * tp, tp + 5, tp + 5);


        //criação da cobra
        ctx.fillStyle = "black";
        for (var i = 0; i < rastro.length; i++) {
            ctx.fillRect(rastro[i].x * tp, rastro[i].y * tp, tp - 1, tp - 1);
            if (rastro[i].x == px && rastro[i].y == py) {


                //condição para dar gameover caso a vida seja igual a 0
                if (vida < 0) {
                    vida = 0;
                }
                if (vida >= 1) {
                    vida--;
                } else if (vida <= 1) {
                    vx = 0;
                    vy = 0;
                    calda = 5;
                    macasComidas = 0;
                    ptns = 0;
                    macasOuro = 0
                    macaOuroComida = 0;
                    contador = 0
                    contador2 = 0

                }

            }

        }

        //função para fazer a movimentação da cobra, mantendo o tamanho
        rastro.push({ x: px, y: py });
        while (rastro.length > calda) {
            rastro.shift();
        }

        //condição para verificar se a maçã foi comida
        if (macax == px && macay == py) {
            calda++;
            macax = Math.floor(Math.random() * qp);
            macay = Math.floor(Math.random() * qp);
            macasComidas++;
            ptns += 2;
            contador++;
            contador2++;

            if (contador >= 5) {

                macaOurox = Math.floor(Math.random() * qp);
                macaOuroy = Math.floor(Math.random() * qp);

            } if (contador > 5) {
                contador = 0;
            }
            if (contador == 0) {
                macaOurox = -15;
                macaOuroy = -15;
            }
            if (contador2 >= 3) {
                macaDiamanteX = Math.floor(Math.random() * qp);
                macaDiamantey = Math.floor(Math.random() * qp);
            }
            if (contador2 > 15) {
                contador2 = 0;
            }
            if (contador2 == 0) {
                macaDiamanteX = -15
                macaDiamantey = -15

            }

        }

        //mesma condição para maçãs douradas
        if (macaOurox == px && macaOuroy == py) {
            var bonus = Math.trunc(Math.random() * 10);
            ptns += bonus;
            calda += bonus;
            contador = 0;
            macaOurox = -15;
            macaOuroy = -15;
            macasComidas++;
            macaOuroComida++
        }

        //mesma condição para maçãs de diamante
        if (macaDiamanteX == px && macaDiamantey == py) {

            macaDiamanteX = -15;
            macaDiamantey = -15;
            var reduz = Math.trunc(Math.random() * calda)
            calda = calda - reduz
            if (calda < 5) {
                calda = 5
            }

        }


        //Contador de Record
        if (ptns >= record) {
            
            record = ptns;
        }

        //condição para adicionar vidas extras
        if (macaOuroComida == 1) {
            vida++;
            macaOuroComida = 0;
        }



        //Funções que fazem a impressão das informações no painel
        document.getElementById('showPontos').innerHTML = ptns;
        document.getElementById('bonus').innerHTML = macaOuroComida;
        document.getElementById('vida').innerHTML = vida;
        document.getElementById('record').innerHTML = record;
        document.getElementById('tamanho').innerHTML = calda;


    }

   
    //Função que controla o  movimento do jogo    
    function keyPush(event) {
        switch (event.keyCode) {

            //Esquerda
            case 37:
                /*essa condição verifica se a cobrinha está indo na posição oposta, nesse caso, direita
                caso sim, para a evitar uma inversão no sentido, os comandos da tecla são ignorados*/
                if (!(vx == vel && vy == 0)) {

                    vx = - vel;
                    vy = 0;

                }
                break;

            //Cima
            case 38:
                if (!(vx == 0 && vy == vel)) {
                    vx = 0;
                    vy = -vel;
                }
                break;


            //Direita
            case 39:
                if (!(vx == -vel && vy == 0)) {
                    vx = vel;
                    vy = 0;
                }
                break;

            //Baixo
            case 40:
                if (!(vx == 0 && vy == -vel)) {
                    vx = 0;
                    vy = vel;
                }
                break;
            default:
                break;
        }


    }
    
    

}  
