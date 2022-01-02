const firebaseConfig = {
    apiKey: "AIzaSyDQkwEM9kR4hmGuCDjI1TYGhfZXvDh5eHg",
    authDomain: "covid-web-1640f.firebaseapp.com",
    databaseURL: "https://covid-web-1640f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "covid-web-1640f",
    storageBucket: "covid-web-1640f.appspot.com",
    messagingSenderId: "545307979341",
    appId: "1:545307979341:web:9915a0ae0d8a89a6c03604"
  }; 
firebase.initializeApp(firebaseConfig) 

  var UserInputsRef=firebase.database().ref('UserInputs');
  document.getElementById('testForm').addEventListener('submit',submitForm);

  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var emailstatus=validateEmail();
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;

    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}
function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
    })
}

function getInputVal(id){
    return document.getElementById(id).value;
}

UserInputsRef.push();
    newuserInputsRef.set({
      Name:name,
      Mobile:mobile,
      Email:email,
      Profession:profession,
      Dateofbirth:dateofbirth,
      SelectedOption:selectedOption,
      State:state, 
      SymptomsList:symptomsList
  });   // JSON - JS object notation 
    alert("Thank you, find the list of centers nearby!  ");


function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
    var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
        name:name,
        mobile:mobile,
        email:email,
        profession:profession,
        dateofbirth:dateofbirth,
        selectedOption:selectedOption,
        state:state, 
        symptomsList:symptomsList
    })
    alert("Thank you, find the list of centers nearby!  ");
}


function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}