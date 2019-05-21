/**
 *
 * @link https://medium.com/@davydkin.igor/storybook-case-study-automate-image-snapshots-with-different-devices-ad543ba65ffe
 *
 * */
import path from 'path';
import pupDevices from 'puppeteer/DeviceDescriptors';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

/** Path to build static story */
const storybookUrl = path.resolve('storybook-static');

/** Path to story */
const supportedDevices = new Set(['iPad', 'iPhone 5', 'iPhone 6', 'iPhone 7 Plus']);

/** Create  */
const createCustomizePage = pupDevice => page => page.emulate(pupDevice);

for (let supportedDevice of supportedDevices) {
  /** device config */
  const pupDevice = pupDevices[supportedDevice];

  if (!pupDevice) {
    continue;
  }

  const customizePage = createCustomizePage(pupDevice);

  initStoryshots({
    framework: 'react',
    suite: `Image storyshots: ${pupDevice.name}`,
    test: imageSnapshot({
      storybookUrl,
      customizePage,
    }),
  });
}
