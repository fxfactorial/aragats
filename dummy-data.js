import addDays from 'date-fns/add_days';

const TODAY = new Date();
const tomorrow = addDays(TODAY, 1);
const tomorrow_n_1 = addDays(TODAY, 2);

export default {
  card_day_a: {
    scheduled_date: TODAY,
    offerings: [
      {
        id: '0',
        kind: 'Electronics',
        item_name: 'cell phone',
        item_image_uri: '',
        title: 'some cell phone',
        creation_time: TODAY,
        cost: '149',
      },
    ],
  },
  card_day_b: { scheduled_date: tomorrow, offerings: [] },
  card_day_c: { scheduled_date: tomorrow_n_1, offerings: [] },
};
