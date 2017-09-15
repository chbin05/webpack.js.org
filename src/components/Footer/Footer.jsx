import React from 'react';
import Link from '../Link/Link';
import Container from '../Container/Container';
import Icon from '../../assets/icon-square-small.svg';
import CC from '../../assets/cc.svg';
import BY from '../../assets/by.svg';
import './Footer.scss';

export default (props) => {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <section className="footer__left">
          <Link className="footer__link" to="/guides/getting-started">시작하기</Link>
          <Link className="footer__link" to="/organization">조직</Link>
          <Link className="footer__link" to="/support">지원</Link>
          <Link className="footer__link" to="/comparison">비교</Link>
        </section>

        <section className="footer__middle">
          <Link to="/" className="footer__icon">
            <img src={ Icon } alt="webpack icon"/>
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="/glossary">어휘</Link>
          <Link className="footer__link" to="/branding">브랜드</Link>
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Gitter</Link>
          <Link className="footer__link" to="https://github.com/webpack/webpack/releases">변경 로그</Link>
          <Link className="footer__link footer__license" to="/license">
            <img
              alt="Creative Commons License"
              src={ CC } />
            <img
              alt="Creative Commons License"
              src={ BY } />
          </Link>
        </section>
      </Container>
    </footer>
  );
};
