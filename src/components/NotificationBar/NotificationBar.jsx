import React from 'react';
import Container from '../Container/Container';
import testLocalStorage from '../../utilities/test-local-storage';

const version = '1';
const localStorageIsEnabled = testLocalStorage() !== false;

export default class NotificationBar extends React.Component {
  render() {
    let dismissedMod = this._dismissed ? 'notification-bar--dismissed' : '';

    return (
      <div className={ `notification-bar ${dismissedMod}` }>
        <Container className="notification-bar__inner">
          <p>
            Webpack을 후원하시고, 의류를 구매해주세요! 웹팩 <a href="https://webpack.threadless.com">공식 샵</a>을 방문해주세요!&nbsp; 모든 수익금은 webpack의 <a href="https://opencollective.com/webpack">Open Collective</a> 페이지에서 확인하실 수 있습니다!
          </p>
          <p>
            <a href="http://www.unixstickers.com/tag/webpack">Unixstickers</a> 에서 새로운 브랜드의 웹팩 스티커를 구매하세요!
            {localStorageIsEnabled ?
              <button
                className="notification-bar__close icon-cross"
                onClick={ this._close.bind(this) } /> :
              null
            }
          </p>
        </Container>
      </div>
    );
  }

  /**
   * Update the notification-dismissed state
   *
   * @param {object} e - Click event
   */
  _close(e) {
    if (localStorageIsEnabled) {
      localStorage.setItem('notification-dismissed', version);
    }
    this.forceUpdate();
  }

  /**
   * Determine whether or not the current message was dismissed
   *
   * @return {boolean} - Whether or not the current message was dismissed
   */
  get _dismissed() {
    if (localStorageIsEnabled) {
      return localStorage.getItem('notification-dismissed') === version;

    } else return false;
  }
}
