class HeaderComponent extends HTMLElement {
	
	constructor() {
		super();
	}
  
	connectedCallback() {
		console.log("Custom element added to page.");
		
		this._findAndClickKDG();
	}
  
	_getElement(source, nodeName, className) {
		var children = Array.from(source);

		var foundValue = children.find(cNode =>
		  cNode.nodeName.toLowerCase() === nodeName.toLowerCase() &&
		  (!className || cNode.classList.contains(className))
		);

		return foundValue;
	}
	
	_findAndClickKDG() {
		
	  try {
		var hElement;
		var sRoot = null;

		var outer = document.getElementsByTagName('agentx-app');

		if (outer.length === 0) {
		  console.error('no agentx-app found');

		  return;
		}

		sRoot = outer[0].shadowRoot;

		if (!sRoot) {
		  console.error('no sRoot found', 1);

		  return;
		}

		var mdTheme = this._getElement(sRoot.childNodes, 'md-theme');

		if (!mdTheme) {
		  console.error('no mdTheme found');

		  return;
		}

		hElement = mdTheme;

		if (!hElement) {
		  console.error('no hElement found', 1);
		  
		  return;
		}

		var containingDiv = this._getElement(hElement.childNodes, 'div', 'app');

		if (!containingDiv) {
		  console.error('no containing div');

		  return;
		}

		var routerView = this._getElement(containingDiv.childNodes, 'router-view');

		if (!routerView) {
		  console.error('no routerView found');

		  return;
		}

		hElement = routerView;

		if (!hElement) {
		  console.error('no hElement found', 2);

		  return;
		}

		sRoot = hElement.shadowRoot;

		if (!sRoot) {
		  console.error('no sRoot found', 2);

		  return;
		}

		const agentxNav = this._getElement(sRoot.childNodes, 'agentx-wc-navigation');

		if (!agentxNav) {
		  console.error('no agentxNav found');

		  return;
		}

		hElement = agentxNav;

		if (!hElement) {
		  console.error('no hElement found', 3)
		  
		  return;
		}

		sRoot = hElement.shadowRoot;

		if (!sRoot) {
		  console.error('no sRoot found', 3);

		  return;
		}

		var nav = this._getElement(sRoot.childNodes, 'nav');

		if (!nav) {
		  console.error('no nav found');

		  return;
		}

		var hidableContainer = this._getElement(nav.childNodes, 'div', 'hidable-container');

		if (!hidableContainer) {
		  console.error('no hidable container found');

		  return;
		}

		var columnContainer = this._getElement(hidableContainer.childNodes, 'div', 'column');

		if (!columnContainer) {
		  console.error('no columnContainer found');

		  return;
		}

		var primaryNav = sRoot.getElementById('primaryNav');

		if (!primaryNav) {
		  console.error('no primaryNav found');

		  return;
		}

		var liNodes = Array.from(primaryNav.getElementsByTagName('li'));

		for (var i = 0; i < liNodes.length; i++) {
			
		  var li = liNodes[i];
		  
		  console.error('checking li element', li);

		  var mdTooltip = Array.from(li.childNodes).find(cNode =>
			  cNode.nodeName.toLowerCase() === 'md-tooltip' && cNode.attributes.getNamedItem('message') &&
			  cNode.attributes.getNamedItem('message').value === 'LIWEST KDG',
		  )

		  if (mdTooltip) {
			  
			var agentNav = this._getElement(mdTooltip.childNodes, 'agentx-wc-navigation-item');

			sRoot = agentNav.shadowRoot;

			if (sRoot) {
				
			  var finallyFound = this._getElement(sRoot.childNodes, 'md-button');

			  if (!finallyFound) {
				  
				console.error('unable to locate button at last step');

				return;
			  }

			  try {
				hElement = finallyFound;

				hElement.click();
				
				return;
				
			  } catch (ex) {
				  
				console.error('error during click', ex);
			  }
			}
		  }
		}
		
		console.error('Unable to find KDG!');
		
	  } catch (ex) {
		console.error('error while attempting to activate KDG', ex);
	  }
	}
}

window.customElements.define("kdg-header", HeaderComponent);
