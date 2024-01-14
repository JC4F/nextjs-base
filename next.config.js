// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  output: 'standalone',
});
