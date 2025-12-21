export function render(container, controller) {
  const state = controller.getState();
  const month = controller.getViewMonth();
  const selected = controller.getSelectedDate();

  container.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'dtp';

  // Header
  const header = document.createElement('div');
  header.className = 'dtp-header';
  header.innerHTML = `
    <button data-action="prev">&lt;</button>
    <span>${month.year} / ${month.month}</span>
    <button data-action="next">&gt;</button>
  `;
  root.appendChild(header);

  // Weekdays
  const weekdays = document.createElement('div');
  weekdays.className = 'dtp-grid';
  ['Mo','Tu','We','Th','Fr','Sa','Su'].forEach(w => {
    const el = document.createElement('div');
    el.className = 'dtp-weekday';
    el.textContent = w;
    weekdays.appendChild(el);
  });
  root.appendChild(weekdays);

  // Days grid
  const grid = document.createElement('div');
  grid.className = 'dtp-grid';

  for (let i = 1; i < month.firstWeekday; i++) {
    grid.appendChild(document.createElement('div'));
  }

  for (let d = 1; d <= month.days; d++) {
    const day = document.createElement('div');
    day.className = 'dtp-day';
    day.textContent = d;
    day.dataset.day = d;

    if (
      selected.year === month.year &&
      selected.month === month.month &&
      selected.day === d
    ) {
      day.classList.add('selected');
    }

    grid.appendChild(day);
  }

  root.appendChild(grid);

  // Footer (time)
  const footer = document.createElement('div');
  footer.className = 'dtp-footer';
  footer.innerHTML = `
    <input type="number" min="0" max="23" value="${state.time.hour}" data-time="hour">
    :
    <input type="number" min="0" max="59" value="${state.time.minute}" data-time="minute">
  `;
  root.appendChild(footer);

  container.appendChild(root);
}
