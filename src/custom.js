window.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox, index) {
      checkbox.addEventListener('change', function () {
        // Enable next step's checkbox and summary
        if (index + 1 < checkboxes.length) {
          checkboxes[index + 1].removeAttribute('disabled');
          checkboxes[index + 1].nextElementSibling.removeAttribute('disabled');
        }
      });
      // Disable checkboxes and summaries of steps after the current incomplete step
      if (!checkbox.checked) {
        for (let i = index + 1; i < checkboxes.length; i++) {
          checkboxes[i].setAttribute('disabled', 'disabled');
          checkboxes[i].nextElementSibling.setAttribute('disabled', 'disabled');
        }
      }
    });
  });
  