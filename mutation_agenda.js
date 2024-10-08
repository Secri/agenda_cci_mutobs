class StringToMoment { //Analyse une chaîne de caractères et renvoie une date
	constructor(string) {
		
		this.string = string;
					
	}
	
	seekDate(){
		
		const dateRegex = /^[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.]([0-9]{2}|[0-9]{4})$/;
		const monthRegex = /^(janv|f[eé]vr)ier|mars|avril|mai|jui(n|llet)|ao[uû]t|((sept|nov|d[eé]c)em|octo)bre$/;
		
		let strDate = new Date();
		let shortYear = strDate.getFullYear(); 
		let twoDigitYear = shortYear.toString().substr(-2);
		let stringToArray = this.string.split(' ');
		let annee;
		let mois;
		let jour;
		
		for (let i=0; i < stringToArray.length; i++) {
			
			if (stringToArray[i].match(dateRegex)) {
							
			let dateArray = stringToArray[i].split(/\D/); // \D est un métacaractère pour rechercher les caractères non numériques
							
			if (parseInt(dateArray[2], 10) < 100 && parseInt(dateArray[2], 10) > parseInt(twoDigitYear, 10)) {
				
				annee = 1900 + parseInt(dateArray[2], 10);
								
			} else if(parseInt(dateArray[2], 10) < 100) {
				
				annee = 2000 + parseInt(dateArray[2], 10);
								
			} else { 
			
				annee = parseInt(dateArray[2], 10);
				
			}
							
			mois = parseInt(dateArray[1], 10) - 1;
							
			if (parseInt (dateArray[0], 10) > 0) {
				
				jour = parseInt (dateArray[0], 10);
				
				} else { 
				
					jour = 1;
					
				}
							
			} else if (stringToArray[i].toLowerCase().match(monthRegex)) {
				
				switch (stringToArray[i].toLowerCase()) {
					
					case 'janvier':
						mois = 0;
						break;
						
					case 'février':
						mois = 1;
						break;
						
					case 'mars':
						mois = 2;
						break;
						
					case 'avril':
						mois = 3;
						break;
						
					case 'mai':
						mois = 4;
						break;
						
					case 'juin':
						mois = 5;
						break;
						
					case 'juillet':
						mois = 6
						break;
						
					case 'aout':
						mois = 7;
						break;
						
					case 'septembre':
						mois = 8;
						break;
						
					case 'octobre':
						mois = 9;
						break;
						
					case 'novembre':
						mois = 10;
						break;
						
					case 'decembre':
						mois = 11;
						break;
						
					default: console.log('Erreur dans le mois');
					
				}
				
				if (typeof stringToArray[i + 1] != 'undefined' && stringToArray[i + 1].length === 4 && typeof parseInt(stringToArray[i + 1] , 10) === 'number') {
					
					annee = parseInt(stringToArray[i + 1], 10);
					
				} else {
					
					let currentDate = new Date();
					
					annee = currentDate.getFullYear();
					
				}
				
				if (i > 0 && typeof parseInt(stringToArray[i - 1], 10) === 'number' && stringToArray[i - 1] > 0 && stringToArray[i - 1] < 32) {
					
					jour = parseInt(stringToArray[i - 1], 10);
					
				} else if (mois === 0 | 2 | 4 | 6 | 7 | 9 | 11) {
					
					jour = 31;
					
				} else {
					
					jour = 30;
				
				}
				
			}
			
		}
		
		return new Date(annee, mois, jour);
		
	}
	
}
												
/*Fonction de dépréciation des événements*/
function eventDeprecate () {
			
	let dateCollection = document.querySelectorAll('a span small'); //On met toutes les dates des events dans une nodelist
				
	let currentDate = new Date(); //On met la date courrante dans une variable
				
	for (const dateToCheck of dateCollection) {
				
		var eventDate = new StringToMoment(dateToCheck.textContent);
					
		if ( currentDate > eventDate.seekDate() ) {
					
			let eltToDeprecate = dateToCheck.parentNode.parentNode;
						
			eltToDeprecate.style.setProperty('filter', 'grayscale(1)');
						
			eltToDeprecate.style.setProperty('opacity', '0.6');
						
			const icon = document.createElement('i');
						
			icon.classList.add('fa', 'fa-calendar-times-o');
						
			dateToCheck.prepend(' ');
						
			dateToCheck.prepend(icon);
					
		}
				
	}
				
}

/** On lance une première fois la fonction de dépréciation au chargement du DOM **/			
document.addEventListener('DOMContentLoaded', function() {
				
	eventDeprecate();
				
});

/***********     MUTATION OBSERVER    ***********/
/* voir https://developer.mozilla.org/fr/docs/Web/API/MutationObserver */
const config = { attributes: false, childList: true, subtree: false };//Options pour le mutation observer, on s'occupe de la liste des enfant uniquement
				
const observer = new MutationObserver(mutobs_callback);// On crée une instance du mutation observer
				
function mutobs_callback(mutationList, observer) { //Fonction de callback du mutation observer
				
	for (const mutation of mutationList) {//Pour chaque mutation de la liste
					
		if (mutation.type === "childList") {//si la liste des noeuds enfant a été modifiée
						
			console.log('A mutation of the childNodes has been observed');
						
			//Appel de la fonction de dépréciation
			eventDeprecate();
						
		}
					
	}
				
}
			
//On lance la méthode d'observation du mutation observer
const agendaEventList = document.querySelector('div.liste_events'); //Noeud parent qui sera observé

observer.observe(agendaEventList, config);
