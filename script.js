//btn-start
document.querySelector('#btn-start').addEventListener('click', function(){
    //remove the former player player nickname and score
    localStorage.removeItem('nick');
    localStorage.removeItem('total-pts');
 
    //save the player nickname and set it to the players' nicknames history
    var nickname = document.getElementById('nickname').value;
    localStorage.setItem('nick', nickname);
    var apelidos = JSON.parse(localStorage.getItem('apelidos')) || [];
    apelidos.push(nickname);
    localStorage.setItem('apelidos', JSON.stringify(apelidos));
    
    //check if the nickname is empty and start the game
    if (nickname == ''){
        alert('Insira seu NickName para continuar');
    }else{
        window.location.href='./main.html';
        document.getElementById('nickname').value = '';
    }
});

