import dayjs from 'dayjs-ext'
import dayjsPluginUTC from 'dayjs-plugin-utc'

import timeZonePlugin from 'dayjs-ext/plugin/timeZone';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';
import localizableFormat from 'dayjs-ext/plugin/localizableFormat';
import relativeTime from 'dayjs-ext/plugin/relativeTime';
import 'dayjs-ext/locale/ru';

dayjs.extend(dayjsPluginUTC)
dayjs.extend(timeZonePlugin)
  .extend(customParseFormat)
  .extend(localizableFormat)
  .extend(relativeTime)
  .locale('ru');

export default dayjs
