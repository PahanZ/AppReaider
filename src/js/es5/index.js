'use strict';

var tabsHead = document.getElementById('tabsHead');
var wrapFoContent = document.getElementById('wrapper');

if (document.documentElement.clientWidth > 768) {
	tabsHead.addEventListener('click', changeTab);
	document.getElementById('tabsHeadContent').addEventListener('click', changeTab);
} else {
	tabsHead.addEventListener('click', accordeon);
}

//--- функция отвечающая за табы в мобильной верстке ---
function accordeon(event) {
	var attr = event.target.closest('.action').getAttribute('data-tab');
	var arrow = document.getElementsByClassName('arrow');
	var mobileTabs = document.getElementsByClassName('tabs_content_head');
	Array.prototype.forEach.call(mobileTabs, function (el, i) {
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

var changeDirectionArrow = function changeDirectionArrow(arrow) {
	var atr = arrow.getAttribute('alt');
	if (atr === 'arrowDown') {
		arrow.setAttribute('src', '../../img/arrowUp.png');
		arrow.setAttribute('alt', 'arrowUp');
	} else {
		arrow.setAttribute('src', '../../img/arrowDown.png');
		arrow.setAttribute('alt', 'arrowDown');
	}
};

//--- функция меняющая высоту jumbotron в мобильной верстке ---
var changeJumbHeight = function changeJumbHeight(mobileTabs) {
	var jumbotron = document.getElementsByClassName('jumbotron')[0];
	var contain = Array.prototype.some.call(mobileTabs, function (el) {
		return el.classList.contains('open');
	});
	contain ? jumbotron.classList.add('correct_heigth') : jumbotron.classList.remove('correct_heigth');
};

//--- функция смены фона и скролла к табам ---
function changeTab() {
	bacgroundTabChange();
	scrolling();
}

var bacgroundTabChange = function bacgroundTabChange() {
	wrapFoContent.classList.remove('active');
	wrapFoContent.style.display = "flex";
	setTimeout(function () {
		wrapFoContent.classList.add('active');
	}, 500);
};

//--- функция скролла ---
var scrolling = function scrolling() {
	var tabContent = document.getElementsByClassName('tabs_content');
	var attr = event.target.closest('.action').getAttribute('data-tab');
	var tab = document.getElementsByClassName('tab');
	var position = window.pageYOffset;
	var getCoords = function getCoords(elem) {
		return elem.getBoundingClientRect().top + pageYOffset;
	};
	Array.prototype.forEach.call(tabContent, function (el, i) {
		tab[i].classList.add('tab_active');
		changeClassTab(el, 'block');
		if (i === Number(attr)) {
			var interval = setInterval(function () {
				if (position < getCoords(wrapFoContent)) {
					position += 10;
					window.scrollTo(0, position);
				} else {
					clearInterval(interval);
				}
			}, 5);
		} else {
			tab[i].classList.remove('tab_active');
			changeClassTab(el, 'none');
		}
	});
};

var changeClassTab = function changeClassTab(el, styleDisplay) {
	el.style.display = styleDisplay;
};