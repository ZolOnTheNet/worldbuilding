// not to be include 
//               0 1  2  3 4 5 6 7 8 9 10
let SuccessTab=[-1,0,-1,-1,1,1,2,2,3,3,4]
// -1, Rien, 0 : Menace, 1 : Prix,  2 : une réussite, 3 : 2 Réussites, 4: 2 réussite et une carte

function CalculResultat(val1=0, val2=3) {
// calcul la réussite avec des dés 6 et des dés 10 : le min est les D10, le max est le D6 
let D10 =  Math.min(val1,val2); // le minimum est le nombre de D10
let D6 = Math.max(val1,val2);
D6 = D6 - D10; // le reste est en D6
let R = new Roll(D10 + "D10+"+ D6+"D6");
R.evaluate({async :false });
// Forme de terms (array(3)) contient trois membre chacun avecs D10 et D6 resultat
console.log("Resultat",R);
let D6r = R.terms[2].results; // le tableau de résultat D6
let D10r = R.terms[0].results; // le trableau de résultat D10
let Rr = []; // tableau des résultats
for(let i = 0; i < D10; i++) {
    Rr.push(D10r[i].result);
}
for(let i = 0; i < D6; i++) {
    Rr.push(D6r[i].result);
}
console.log("Resultat Eval :",Rr);
//--- 
let Success = 0; let Menace = 0; let Prix = 0; let t = -1; let cardT = 0;
for(let i = 0; i < (D6+D10); i++) {
    t = SuccessTab[Rr[i]];
    switch(t) {
        case 0: Menace++;
            break;
        case 1: Prix++;
            break;
        case 4 :
            cardT++;
            t--; // pas de break
        default:
            Success += (t-1);
            break;
    }
}
let monTexte = "Resultat, Success :" + Success + "("+ cardT+ " Cartes), Prix :" + Prix +", Menace :"+ Menace+"<br>";
//let speak = obj._uid?game.actors.get(obj._uid).name: ChatMessage.getSpeaker();
  let chatData = {
      user: game.user._id,
//      speaker: speak,
      flavor: monTexte,
      rollMode: game.settings.get("core", "rollMode"),
//      roll: R
  };
 R.toMessage(chatData);
}

//CalculResultat(2,3);
CalculResultat(_token.actor.system.attributes.FOR.value,_token.actor.system.attributes.CMP.Combattant.value);