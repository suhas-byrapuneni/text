// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
var EventVariables = [];
    var departmentvalue1;
    var departmentvalue2;
    var name = document.getElementById('naming');
    var phno = document.getElementById('phonenumber');
    var email = document.getElementById('mail');
    var button = document.getElementById('.button');
    button.addEventListener("click", onSubmit);
    var department1 = document.getElementById('dept1');
    var department2 = document.getElementById('dept2');
(function() {
  var initialize = function() {
    /*
      1. Add all your event bindings here. Please avoid binding events inline and add your event listeners here.

      onSubmit callback
      disableDuplicateSecondaryDepartment callback,...
    */

      department1.addEventListener("change", disableDuplicateSecondaryDepartment);
    departmentvalue1 = disableDuplicateSecondaryDepartment();

    department2.addEventListener("change", setdepartment2);
    function setdepartment2() {
      return department2.value;
    }
    departmentvalue2 = setdepartment2();
    EventVariables = [name, phno, email, department1, department2];
    var EventVariablesValues = EventVariables.map(event => event.value);
    return EventVariablesValues;
  };
//department disabling function
  var disableDuplicateSecondaryDepartment = function(event) {
    // 2. in department2, Should disable the option selected in department1
     for (let i = 0; i < 4; i++) {
      if (department2.children[i].innerText == department1.value) {
        department2.children[i].disabled = true;
        if (i < 3) {
          department2.children[i + 1].selected = true;
        } else {
          department2.children[2].selected = true;
        }
      } else {
        department2.children[i].disabled = false;
      }
    }

    return department1.value;
  };


  var constructData = function() {
    var data = {};

    // 3. Convar FinalValues = initialize();
    console.log(FinalValues);
    data.name = FinalValues[0];
    data.phno = FinalValues[1];
    data.emailaddress = FinalValues[2];
    data.department1 = FinalValues[3];
    data.department2 = FinalValues[4];

    console.log(data.name.length);struct data from the form here. Please ensure that the keys are the names of input elements

    return data;
  };
//validating the things
  var validateResults = function(data) {
    var isValid = true;

    // 4. Check if the data passes all the validations here
    const emailExpression = /^([a-zA-Z0-9\.])+@college+(\.edu)*$/;
    if (
      data.phno.length == 0 ||
      data.phno.length > 10 ||
      (data.name.trim() === "" || data.name.length > 101) ||
      !emailExpression.test(data.emailaddress)
    ) {
      isValid = false;
    } else {
      isValid = true;
    }

    return isValid;
  };

  var onSubmit = function(event) {
    // 5. Figure out how to avoid the redirection on form submit
    event.preventDefault();
    console.log("ok");

    var data = constructData();
     console.log(data);

    if (validateResults(data)) {
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      resultsDiv.classList.add("hide");
    }
  };

  var printResults = function(data) {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      debugger
      return innerHtml + constructElement(keyValuePair);
    }, '');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  /*
    Initialize the javascript functions only after the html DOM content has loaded.
    This is to ensure that the elements are present in the DOM before binding any event listeners to them.
  */
  document.addEventListener('DOMContentLoaded', initialize);
})();
