document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      var span = document.getElementById('st');
      if (span && span.textContent.trim() === '' && !sessionStorage.getItem('refreshed')) {
          sessionStorage.setItem('refreshed', 'true');
          location.reload();
      }
  }, 2000);
});

// clear the timeout after 2 seconds to prevent potential memory leaks

