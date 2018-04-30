const tabsHead = document.getElementById('tabsHead');
const wrapFoContent = document.getElementById('wrapper');

if (document.documentElement.clientWidth > 768) {
	tabsHead.addEventListener('click', changeTab);
	document.getElementById('tabsHeadContent').addEventListener('click', changeTab);
} 
else {
	tabsHead.addEventListener('click', accordeon);
}

//--- функция отвечающая за табы в мобильной верстке ---
function accordeon(event) {
	const attr = event.target.closest('.action').getAttribute('data-tab');
	const arrow = document.getElementsByClassName('arrow');
	const mobileTabs = document.getElementsByClassName('tabs_content_head');	
	Array.prototype.forEach.call(mobileTabs, function(el, i) {
		if (i === Number(attr)) {
			changeDirectionArrow(arrow[i]);
			el.classList.toggle('open');
		} else {
			arrow[i].setAttribute('src', '../../img/arrowDown.png');
			arrow[i].setAttribute('alt', 'arrowDown');
			el.classList.remove('open');
		} 	
	});
	changeJumbHeight(mobileTabs);
}

const changeDirectionArrow = (arrow) => {
	const atr = arrow.getAttribute('alt');
	if (atr === 'arrowDown') {
		arrow.setAttribute('src', '../../img/arrowUp.png');
		arrow.setAttribute('alt', 'arrowUp');
	} else {
		arrow.setAttribute('src', '../../img/arrowDown.png');
		arrow.setAttribute('alt', 'arrowDown');
	}
}

//--- функция меняющая высоту jumbotron в мобильной верстке ---
const changeJumbHeight = (mobileTabs) => {
	const jumbotron = document.getElementsByClassName('jumbotron')[0];
	const contain = Array.prototype.some.call(mobileTabs, el => {
		return el.classList.contains('open');
	});	
	contain ? jumbotron.classList.add('correct_heigth') : jumbotron.classList.remove('correct_heigth');
}

//--- функция смены фона и скролла к табам ---
function changeTab() {
	bacgroundTabChange();
	scrolling();
 }

 const bacgroundTabChange = () => {
	wrapFoContent.classList.remove('active');
	wrapFoContent.style.display = "flex";
	setTimeout(() => {
		wrapFoContent.classList.add('active');
	}, 500);
 }

//--- функция скролла и задания стилей активным табам ---
 const scrolling = () => {
 	const tabContent = document.getElementsByClassName('tabs_content');
	const attr = event.target.closest('.action').getAttribute('data-tab');
	const action = document.getElementsByClassName('action_main');
	const tab = document.getElementsByClassName('tab');
	let position = window.pageYOffset;
	const getCoords = elem => elem.getBoundingClientRect().top + pageYOffset;
	Array.prototype.forEach.call(tabContent, (el, i) => {
		action[i].classList.add('action_active');
		tab[i].classList.add('tab_active');
		changeClassTab(el, 'block');
		if (i === Number(attr)) {
			let interval = setInterval(() => {	
				if (position < getCoords(wrapFoContent)) {
					position += 10;
					window.scrollTo(0, position);
				} else {
					clearInterval(interval);
				}
			}, 5);		
		} 
		else {
			action[i].classList.remove('action_active');
			tab[i].classList.remove('tab_active');
			changeClassTab(el, 'none');
		}
	})
 }

const changeClassTab = (el, styleDisplay) => {
	el.style.display = styleDisplay;
};