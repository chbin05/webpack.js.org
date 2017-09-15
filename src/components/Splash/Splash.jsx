import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../Container/Container';
import SplashViz from '../SplashViz/SplashViz';
import Support from '../Support/Support';
import './Splash.scss';
import '../SplashViz/SplashViz.scss';
import '../Cube/Cube.scss';
import '../TextRotater/TextRotater.scss';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <Interactive
        id="src/components/SplashViz/SplashViz.jsx"
        component={ SplashViz } />

      <div className="splash__section splash__section--dark">
        <Container>
          <div dangerouslySetInnerHTML={{
            __html: page.content
          }} />
        </Container>
      </div>

      <div className="splash__section">
        <Container>
          <h1>지원 팀</h1>

          <p>당신의 기여, 기부 및 후원을 통해 웹팩이 번창 할 수 있습니다. 당신의 기부금은 근무 시간, 지속적인 개선, 가장 중요한 것은 훌륭한 문서와 학습 자료를 제공하는 것입니다!</p>

          <h2>Platinum Sponsors</h2>
          <Support type="sponsors" rank="platinum" />

          <h2>Gold Sponsors</h2>
          <Support type="sponsors" rank="gold" />

          <h2>Silver Sponsors</h2>
          <Support type="sponsors" rank="silver" />

          <h2>Bronze Sponsors</h2>
          <Support type="sponsors" rank="bronze" />

          <h2>Backers</h2>
          <Support type="backers" />

        </Container>
      </div>
    </div>
  );
};
