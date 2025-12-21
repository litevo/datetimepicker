export function bindEvents(container, controller, rerender) {

  container.addEventListener('click', e => {
    const action = e.target.dataset.action;
    if (action === 'prev') {
      controller.prevMonth();
      rerender();
    }
    if (action === 'next') {
      controller.nextMonth();
      rerender();
    }

    const day = e.target.dataset.day;
    if (day) {
      controller.selectDay(Number(day));
      rerender();
    }
  });

  container.addEventListener('change', e => {
    const type = e.target.dataset.time;
    if (!type) return;

    const hour =
      type === 'hour'
        ? Number(e.target.value)
        : controller.getState().time.hour;

    const minute =
      type === 'minute'
        ? Number(e.target.value)
        : controller.getState().time.minute;

    controller.setTime(hour, minute);
    rerender();
  });
}
