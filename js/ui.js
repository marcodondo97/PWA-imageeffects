// Bootstrap 5 tooltips
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Action bar buttons
  var inputPhoto = document.getElementById('inputphoto');
  var btnUpload = document.getElementById('actionUpload');
  var btnEffects = document.getElementById('actionEffects');
  var btnDownload = document.getElementById('actionDownload');
  var empty = document.getElementById('emptyState');
  if (btnUpload && inputPhoto) {
    btnUpload.addEventListener('click', function(){ inputPhoto.click(); });
  }

  // Wire reset buttons to clear active effects and blur focus
  ['btnResetDesktop', 'btnResetMobile'].forEach(function(id){
    var btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', function(){
        clearActiveEffects();
      });
    }
  });

  // Wire reset overlay
  var resetOverlay = document.getElementById('btnResetOverlay');
  if (resetOverlay) {
    resetOverlay.addEventListener('click', function(){ clearActiveEffects(); });
  }
});

// Active state for effect buttons
document.addEventListener('click', function (e) {
  var button = e.target.closest('.btn-effect');
  if (!button) return;
  document.querySelectorAll('.btn-effect').forEach(function (el) {
    el.classList.remove('active');
  });
  button.classList.add('active');
  enableDownloadButtons(true);
});

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Initial UI state on load
window.addEventListener('load', function () {
  // Disable download until an image is loaded/modified
  enableDownloadButtons(false);
  // Disable effects until image loaded
  setImageLoadedState(false);
  // Query needed elements in this scope
  var btnEffects = document.getElementById('actionEffects');
  if (btnEffects) btnEffects.disabled = true;
  var empty = document.getElementById('emptyState');
  if (empty) empty.classList.remove('hidden');
});

// Enable/disable download buttons
function enableDownloadButtons(enabled) {
  var ids = ['actionDownload', 'btnDownloadDesktop', 'btnDownloadMobile', 'fabDownload'];
  ids.forEach(function(id){
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = !enabled;
    btn.classList.toggle('disabled', !enabled);
  });
}

// Enable/disable reset and effects based on image presence
function setImageLoadedState(loaded) {
  // Reset buttons
  ['btnResetDesktop', 'btnResetMobile'].forEach(function(id){
    var btn = document.getElementById(id);
    if (btn) { btn.disabled = !loaded; btn.classList.toggle('disabled', !loaded); }
  });
  // Effect buttons
  document.querySelectorAll('.btn-effect').forEach(function(btn){
    btn.disabled = !loaded;
    btn.classList.toggle('disabled', !loaded);
  });
}

// Clear active state and focus from effect buttons
function clearActiveEffects() {
  document.querySelectorAll('.btn-effect.active').forEach(function(btn){
    btn.classList.remove('active');
  });
  document.querySelectorAll('.btn-effect').forEach(function(btn){
    if (typeof btn.blur === 'function') btn.blur();
  });
}

// Expose utilities if needed by other scripts
window.clearActiveEffects = clearActiveEffects;
window.setImageLoadedState = setImageLoadedState;
window.enableDownloadButtons = enableDownloadButtons;


