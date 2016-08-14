// Loading dependencies.
import AppView from './views/AppView/';

/**
 * Starts the application by instantiating the overall application view.
 */
function onDOMContentLoaded() {
    new AppView().render();
}

// Whenever the document is loaded and parsed, trigger onDOMContentLoaded logic.
if (document.readyState === 'complete'
    || document.readyState === 'loaded'
    || document.readyState === 'interactive') {
    onDOMContentLoaded();
} else {
    window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}
