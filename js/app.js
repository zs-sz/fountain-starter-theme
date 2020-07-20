// https://github.com/vue-foundation/vue-foundation

// import jQuery from 'jquery';
import { Foundation } from "./_vendor/foundation.core";
import { rtl, transitionend } from "./_vendor/foundation.util.core";
import { Box } from "./_vendor/foundation.util.box";
import { onImagesLoaded } from "./_vendor/foundation.util.imageLoader";
import { Keyboard } from "./_vendor/foundation.util.keyboard";
import { MediaQuery } from "./_vendor/foundation.util.mediaQuery";
import { Motion, Move } from "./_vendor/foundation.util.motion";
import { Nest } from "./_vendor/foundation.util.nest";
import { Timer } from "./_vendor/foundation.util.timer";
import { Touch } from "./_vendor/foundation.util.touch";
import { Triggers } from "./_vendor/foundation.util.triggers";

// import { Abide } from "./_vendor/foundation.abide";
// import { Accordion } from "./_vendor/foundation.accordion";
// import { AccordionMenu } from "./_vendor/foundation.accordionMenu";
// import { Drilldown } from "./_vendor/foundation.drilldown";
// import { Dropdown } from "./_vendor/foundation.dropdown";
// import { DropdownMenu } from "./_vendor/foundation.dropdownMenu";
// import { Equalizer } from "./_vendor/foundation.equalizer";
// import { Interchange } from "./_vendor/foundation.interchange";
// import { Magellan } from "./_vendor/foundation.magellan";
import { OffCanvas } from "./_vendor/foundation.offcanvas";
// import { Orbit } from "./_vendor/foundation.orbit";
// import { ResponsiveMenu } from "./_vendor/foundation.responsiveMenu";
// import { ResponsiveToggle } from "./_vendor/foundation.responsiveToggle";
// import { Reveal } from "./_vendor/foundation.reveal";
// import { Slider } from "./_vendor/foundation.slider";
// import { SmoothScroll } from "./_vendor/foundation.smoothScroll";
// import { Sticky } from "./_vendor/foundation.sticky";
// import { Tabs } from "./_vendor/foundation.tabs";
// import { Toggler } from "./_vendor/foundation.toggler";
// import { Tooltip } from "./_vendor/foundation.tooltip";
// import { ResponsiveAccordionTabs } from "./_vendor/foundation.responsiveAccordionTabs";
//
import "../scss/app.scss";

// Add jQuery to the window object
// import './owl';
window.$ = jQuery;
window.jQuery = jQuery;
// Require non-modular scripts
require("motion-ui");
require("what-input");
// require("./csi/App.js");

Foundation.addToJquery(jQuery);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.
Foundation.rtl = rtl;
// Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;
Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so nzf// need to add it to Foundation, just init them.
Touch.init(jQuery);
Triggers.init(jQuery, Foundation);
// Foundation.plugin(Abide, "Abide");
// Foundation.plugin(Accordion, "Accordion");
// Foundation.plugin(AccordionMenu, "AccordionMenu");
// Foundation.plugin(Drilldown, "Drilldown");
// Foundation.plugin(Dropdown, "Dropdown");
// Foundation.plugin(DropdownMenu, "DropdownMenu");
// Foundation.plugin(Equalizer, "Equalizer");
// Foundation.plugin(Interchange, "Interchange");
// Foundation.plugin(Magellan, "Magellan");
Foundation.plugin(OffCanvas, "OffCanvas");
// Foundation.plugin(Orbit, "Orbit");
// Foundation.plugin(ResponsiveMenu, "ResponsiveMenu");
// Foundation.plugin(ResponsiveToggle, "ResponsiveToggle");
// Foundation.plugin(Reveal, "Reveal");
// Foundation.plugin(Slider, "Slider");
// Foundation.plugin(SmoothScroll, "SmoothScroll");
// Foundation.plugin(Sticky, "Sticky");
// Foundation.plugin(Tabs, "Tabs");
// Foundation.plugin(Toggler, "Toggler");
// Foundation.plugin(Tooltip, "Tooltip");
// Foundation.plugin(ResponsiveAccordionTabs, "ResponsiveAccordionTabs");

jQuery(window).on("changed.zf.mediaquery", function(event, newSize, oldSize) {
  // FOUNDAION MEDIAQUERIES
  console.log(newSize);
});

jQuery(document).ready(() => {
  // ENTRY
  jQuery(document).foundation();
});