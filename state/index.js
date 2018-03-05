import { types, onSnapshot, onPatch } from 'mobx-state-tree';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isSameDay from 'date-fns/is_same_day';

import dummy_data from '../dummy-data';

const NavigationStoreModel = types
  .model('NavigationStore', {
    drawer_button_shows: types.boolean,
    title: 'Aragats',
    // Hack because ReactNative tag wants at least something, change to '' to see red box.
    subtitle: ' ',
  })
  .actions(self => ({
    toggle_drawer_button() {
      self.drawer_button_shows = !self.drawer_button_shows;
    },
  }));

const Offering = types.model('Offering', {
  id: types.identifier(),
  kind: types.enumeration('offering-kind', ['Electronics', 'Clothes', 'Construction']),
  item_name: types.string,
  item_image_uri: types.string,
  title: types.string,
  creation_time: types.Date,
  cost: types.string,
});

const OfferingsEachDay = types.model('OfferingEachDay', {
  scheduled_date: types.Date,
  offerings: types.array(Offering),
});

const AragatsOfferings = types
  .model('AragatsOfferings', {
    offerings_date: types.Date,
    aragats_offerings: types.array(OfferingsEachDay),
  })
  .views(self => ({
    get todays_offerings() {
      for (const d of self.aragats_offerings) {
        if (isSameDay(self.offerings_date, d.scheduled_date)) return d.offerings;
      }
      return [];
    },
  }))
  .actions(self => ({
    set_offerings_date(new_date) {
      // Make sure its a date?
      self.offerings_date = new_date;
    },
    refresh_offerings() {
      // some async server action
    },
  }));

export const nav_store = NavigationStoreModel.create({
  drawer_button_shows: true,
});

const TODAY = new Date();

export const offerings_store = AragatsOfferings.create({
  offerings_date: TODAY,
  aragats_offerings: [dummy_data.card_day_a, dummy_data.card_day_b, dummy_data.card_day_c],
});

onSnapshot(nav_store, snapshot => {
  console.log({ snapshot });
});
