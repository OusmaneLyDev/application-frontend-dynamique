// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons

// Add icons to the library
library.add(fas);

export default FontAwesomeIcon;
