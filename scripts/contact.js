document.getElementById("contact-form").addEventListener("submit", function(e){

    e.preventDefault();

    alert("✅ Message Sent Successfully!");

    this.reset();

});