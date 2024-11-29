import { FormattedMessage, useIntl } from 'react-intl';

import en_US from './en-US'
// import zh_CN from './zh_CN'

export const localeConfig = {
//   zh_CN: zh_CN,
  en_US: en_US,
};

const LocaleFormatter = ({ id, ...props }) => {
  const notChildProps = { ...props, children: undefined };

  return <FormattedMessage {...notChildProps} id={id} />;
};

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  
  return {
    ...rest,
    formatMessage: _formatMessage,
  };
};

export default LocaleFormatter;
