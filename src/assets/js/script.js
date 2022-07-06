
    function toggle(ID) {      var element = document.getElementById(ID);
      if (element.style.display === "none") {
        element.style.display = "table-row";
      } else {
        element.style.display = "none";
      }
    }

    const rotate = document.getElementsByClassName('cus-toggle');

    for (i = 0; i < rotate.length; i++) {
      rotate[i].addEventListener('click', function () {
        this.classList.toggle('active')
      })
    }


