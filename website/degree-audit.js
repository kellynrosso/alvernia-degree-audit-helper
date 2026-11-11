(() => {
  'use strict';

  const menuToggle = document.getElementById('audit-menu-toggle');
  const navigation = document.getElementById('audit-nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  for (const link of navigation.querySelectorAll('a')) {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  }

  const checkboxes = [...document.querySelectorAll('input[name="sample-requirement"]')];
  const progress = document.getElementById('audit-progress');
  const percentage = document.getElementById('audit-percentage');
  const status = document.getElementById('audit-progress-status');
  const resetButton = document.getElementById('audit-reset');

  function updateProgress() {
    const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
    const total = checkboxes.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    progress.max = total;
    progress.value = completed;
    progress.textContent = `${percent}%`;
    percentage.textContent = `${percent}%`;
    status.textContent = `${completed} of ${total} fictional sample areas marked complete. Demonstration only.`;
  }

  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', updateProgress);
  }

  resetButton.addEventListener('click', () => {
    for (const checkbox of checkboxes) checkbox.checked = false;
    updateProgress();
  });

  updateProgress();
})();
