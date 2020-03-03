// Switchboard.js by Josh Simmons
// https://github.com/jcpsimmons/switchboard

class Switchboard {
  constructor(verbose = false) {
    this.verbose = verbose;

    this.consoleLog = data => {
      if (verbose) {
        console.log(data);
      }
    };

    // Get a list of all document-level event listeners
    // Limited browser capability
    try {
      this.documentEventList = Object.keys(getEventListeners(document));
    } catch (e) {
      this.documentEventList = [];
    }
  }

  //   Create/fire event hooks when waiting for page elements
  listenEvent(eventName, variableName) {
    if (
      variableName.search("window.") == 0 ||
      this.documentEventList.indexOf(eventName) > -1
    ) {
      console.error(
        "Variable Name should be the name after window scope. Variable should not start with window."
      );
      return null;
    }

    let evnt = new Event(eventName);

    let anotherInterval = setInterval(() => {
      if (typeof window[variableName] !== "undefined") {
        clearInterval(anotherInterval);
        this.consoleLog(`${variableName} present, firing Event.`);
        document.dispatchEvent(evnt);
      }
    }, 50);
  }

  //   Observe DOM changes on a target element
  monitorDomChange(targetSelector = "body", subtree = true) {
    const targetNode = document.querySelector(targetSelector);
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: subtree
    };

    var evnt = new Event("DOMMutation");

    var observer = new MutationObserver(() => {
      document.dispatchEvent(evnt);
      this.consoleLog(`DOM Mutation detected on ${targetSelector}`);
    });

    observer.observe(targetNode, observerOptions);
  }
}
