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
            <a href="https://webpack.threadless.com">웹팩 공식 샵</a> 을 방문하여 의류 구매로 웹팩을 후원해주세요! &nbsp; 모든 후원의 진행사항은 웹팩의 <a href="https://opencollective.com/webpack">오픈 챌린지 페이지</a> 애서 확인하실 수 있습니다.
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
