(function() {
  
    var states = document.getElementsByClassName("estado")    

     for(var i = 0; i < states.length; i++) {
      states[i].onclick = function() {
          getInfos(this.getAttribute('name'))          
      }
    }
    
})();


function getInfos(estado) {
    $.getJSON( "candidatos.json", function( data ) {
        var divList = document.getElementById('divList');
        document.getElementById('divList').innerHTML = "";
        var modalTitle = document.getElementById('estadosModalLabel');
        $.each( data, function( key, val ) {        
            if (estado == val["estado"]) {  
                if(!elementExist(val["cidade"])){ 
                    modalTitle.innerHTML = "Cidades de "+estado;            
                    var item = document.createElement('a');
                    item.innerHTML = val["cidade"];                
                    item.href="#";
                    item.setAttribute("data-dismiss", "modal");                    
                    item.setAttribute("data-toggle", "modal");
                    item.setAttribute("data-target", "#candidatosModal");
                    item.setAttribute("onclick", "getCandidatos(\""+val["cidade"]+"\");");
                    item.className = "list-group-item list-group-item-action "+val["cidade"];
                    
                    divList.appendChild(item);
                }                  
            }          
        });
    });
}

function getCandidatos(cidade){
    $.getJSON( "candidatos.json", function( data ) {
        var tabelaCandidatos = document.getElementById('candidatosTable');
        var modalTitle = document.getElementById('candidatosModalLabel');
//        document.getElementById('rowDiv').innerHTML = "";
        modalTitle.innerHTML = "Lista de Candidatos";    
        $.each( data, function( key, val ) {      
            if (cidade == val["cidade"]) {        
                console.log("dentro do if");
                var rowTr = document.createElement('tr');
                var rowCount = document.createElement('th');
                var colEstado = document.createElement('td');
                var colCidade = document.createElement('td');
                var colCandidato = document.createElement('td');
                var colVaga = document.createElement('td');
                var colRedeSocial = document.createElement('td');
                var linkRedeSocial = document.createElement('a');
                var colNumPartido = document.createElement('td');

                rowCount.setAttribute("scope", "row");

                rowCount.innerHTML = key
                colEstado.innerHTML = val["estado"];
                colCidade.innerHTML = val["cidade"];
                colCandidato.innerHTML = val["candidato"];
                colVaga.innerHTML = val["vaga"];
                linkRedeSocial.innerHTML = "link";
                colNumPartido.innerHTML = val["numpartido"];
                linkRedeSocial.href = val["redesocial"];
            
                rowTr.appendChild(rowCount);
                rowTr.appendChild(colEstado);
                rowTr.appendChild(colCidade);
                rowTr.appendChild(colCandidato);
                rowTr.appendChild(colVaga);
                colRedeSocial.appendChild(linkRedeSocial);
                rowTr.appendChild(colRedeSocial);                
                rowTr.appendChild(colNumPartido);
                tabelaCandidatos.appendChild(rowTr);
            }          
        });
    });
}

function elementExist(nomeElemento){
    var elemento = document.getElementsByClassName(nomeElemento)

    if( elemento.length>0) {
      return true;
    }

    return false;
}